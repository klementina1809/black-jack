import { useState, useEffect } from "react";
import playingCards from "./components/Cards";

import "./App.css";

function App() {
	const [cards, setCards] = useState(playingCards);

	const [dealerCards, setDealerCards] = useState([]);
	const [playerCards, setPlayerCards] = useState([]);

	useEffect(() => {
		console.log("cards", cards);
	}, [cards]);

	const randomCardGenerate = () => {
		const randomId = Math.floor(Math.random() * 51);
		const newRandomCard = cards.find((card) => card.id === randomId);

		if (!newRandomCard) {
			return randomCardGenerate();
		}

		return newRandomCard;
	};

	const startGame = () => {
		let cardForDealer, card1ForPlayer, card2ForPlayer;

		do {
			cardForDealer = randomCardGenerate();
			card1ForPlayer = randomCardGenerate();
			card2ForPlayer = randomCardGenerate();
		} while (
			cardForDealer.id === card1ForPlayer.id ||
			cardForDealer.id === card2ForPlayer.id ||
			card1ForPlayer.id === card2ForPlayer.id
		);

		setDealerCards([cardForDealer]);

		setCards((prevCards) => {
			const newCards = prevCards.filter(
				(card) =>
					card.id !== cardForDealer.id &&
					card.id !== card1ForPlayer.id &&
					card.id !== card2ForPlayer.id
			);
			return newCards;
		});

		setPlayerCards([card1ForPlayer, card2ForPlayer]);
	};

	return (
		<div className="table-container">
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
		</div>
	);
}

export default App;
