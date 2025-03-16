import React from 'react'
 import './App.css'
import{ useState, useEffect} from 'react'
const App = () => {

  const [word, setWord] = useState('');  
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState(null);



  async function dictionaryApi() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        throw new Error('There was an error finding the word');
      }
      const data= await response.json();    
       
      console.log(data);
      setDefinition(data);
      
    } catch (error) {
      setDefinition(null);
      setError(error.message);
    }
    finally {
      setLoading(false);
    }

  }
useEffect(() => {
  if (word.trim() === '') {
    setDefinition(null);
    setError(null);
    setLoading(false);
    return;
  }
  dictionaryApi();
}, [word]);

const handleSubmit = (e) => {
  e.preventDefault();

  dictionaryApi();
}

  return (
    <div >
      <Details
      word={word}
      setWord={setWord}
      definition={definition}
      handleSubmit={handleSubmit}

      />
      <div className="output">
        {loading && <div>Loading...Please wait</div>}
        {error && <div>{error}</div>}
        {definition && (
          <div>
            <h3>{definition[0].word}</h3>
            {definition[0].meanings.map((meaning,index)=>(
              <div key={index}>
                <h4>{meaning.partOfSpeech}</h4>
                <ul>
                  {
                    meaning.definitions.map((def,i)=>(
                       <li key={i}>{def.definition}</li>
                    ))
                  }
                </ul>
              </div>
            ))}
          </div> 
        )}
        </div>
    </div>
  )

}
export default App

function Details({word, setWord, definition, handleSubmit}) {
  return(
    <div className="header">
      <div>
        <h1>By <a href="https://github.com/k-i-b-i-wott" target='_blank'>Biwott</a></h1>
      </div>
      <div>
        <h1>Search For any word</h1>
      </div>
      <form >
        <input type="text" value={word} onChange={(e) => setWord(e.target.value)}  />
        <button type="submit" onClick={handleSubmit}>Search</button>
      </form>
      
    </div>
  )
}