import { useState, useEffect } from "react";
import playingCards from "./components/Cards";

import "./App.css";

function App() {
	const [cards, setCards] = useState(playingCards);
	const [randomCard, setRandomCard] = useState({});
	const [dealerCards, setDealerCards] = useState([]);
	const [playerCards, setPlayerCards] = useState([]);

	const randomCardGenerate = () => {
		const randomId = Math.floor(Math.random() * 52);
		const newRandomCard = cards.find((card) => card.id === randomId);

		if (!newRandomCard) {
			return randomCardGenerate();
		}
		setRandomCard(newRandomCard);

		const newCards = cards.filter((card) => card.id !== randomId);
		setCards(newCards);
		return newRandomCard;
	};

	const startGame = () => {
		const cardForDealer = randomCardGenerate();
		const cardForPlayer1 = randomCardGenerate();
		const cardForPlayer2 = randomCardGenerate();
		setDealerCards([cardForDealer]);
		setPlayerCards([cardForPlayer1, cardForPlayer2]);
	};

	return (
		<>
			<button onClick={startGame}>Start</button>
			<div className="dealer container">
				{dealerCards.map((card) => (
					<img className="card" key={card.id} src={card.img} alt="" />
				))}
			</div>
			<div className="player container">
				{playerCards.map((card) => (
					<img className="card" key={card.id} src={card.img} alt="" />
				))}
			</div>
		</>
	);
}

export default App;
