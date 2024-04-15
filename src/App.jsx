import { useState, useEffect } from 'react'
import playingCards from './components/Cards'

import './App.css'

function App() {
  const [cards, setCards] = useState(playingCards);
  const [randomCard, setRandomCard] = useState({});
  const [dillerCards, setDillerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);

  const randomCardGenerate = () => {
    const randomId = Math.floor(Math.random() * 52);
    setRandomCard (cards[randomId]);
  }


  return (
    <>
     <div className='container'>
     <img src={randomCard.img} alt="" />
      
     </div>
     <button onClick={randomCardGenerate}>
      Random
     </button>
    </>
  )
}

export default App
