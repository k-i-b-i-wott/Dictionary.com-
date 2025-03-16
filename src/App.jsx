import React from 'react'
 import './App.css'
import{ useState} from 'react'
const App = () => {

  const [word, setWord] = useState('');  
  const [definition, setDefinition] = useState(null);

  async function dictionaryApi() {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data= await response.json();      
      console.log(data);
      setDefinition(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dictionaryApi();

  };
  return (
    <div >
      <Details
      word={word}
      setWord={setWord}
      definition={setDefinition}
      handleSubmit={handleSubmit}

      />
      <div className="output">
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
      <form action="">
        <input type="text" value={word} onChange={(e) => setWord(e.target.value)}  />
        <button type="submit" onClick={handleSubmit}>Search</button>
      </form>
      
    </div>
  )
}