import { useState, useEffect } from "react";
import playingCards from "./components/Cards";

import "./App.css";

function App() {
	const [cards, setCards] = useState(playingCards);

	const [dealerCards, setDealerCards] = useState([]);
	const [playerCards, setPlayerCards] = useState([]);
	const [playersSum, setPlayersSum] = useState(0);
	const [dealersSum, setDealersSum] = useState(0);
	const [gameStatus, setGameStatus] = useState("");

	useEffect(() => {
		checkGameStatus();
	}, [playerCards]);

	const addCard = () => {
		const newCard = randomCardGenerate();

		setCards((prevCards) => {
			const newCards = prevCards.filter((card) => card.id !== newCard.id);
			return newCards;
		});
		setPlayerCards([...playerCards, newCard]);
	};

	const randomCardGenerate = () => {
		const randomId = Math.floor(Math.random() * 51);
		const newRandomCard = cards.find((card) => card.id === randomId);

		if (!newRandomCard) {
			return randomCardGenerate();
		}

		return newRandomCard;
	};

	const checkGameStatus = () => {
		if (playerCards.length > 1) {
			let playersSum = 0;
			for (let card of playerCards) {
				playersSum += card.points;
			}
			setPlayersSum(playersSum);
			console.log("playersSum", playersSum);
			const dealersSum = dealerCards[0].points;
			setDealersSum(dealersSum);

			if (playerCards.length === 2 && playersSum === 21)
				setGameStatus("player black jack");
			if (playersSum > 21) setGameStatus("player bust");

			if (dealerCards.length === 2 && dealersSum === 21)
				setGameStatus("dealer black jack");
			if (dealersSum > 21) setGameStatus("dealer bust");
		}
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
				<span>{dealersSum}</span>
				{dealerCards.map((card) => (
					<img className="card" key={card.id} src={card.img} alt="" />
				))}
			</div>
			<div className="player container">
				{playerCards.map((card) => (
					<img className="card" key={card.id} src={card.img} alt="" />
				))}
				<span>{playersSum}</span>
			</div>
			<p>{gameStatus}</p>
			<button
				disabled={
					gameStatus === "dealer bust" ||
					gameStatus === "player bust" ||
					gameStatus === "player black jack" ||
					gameStatus === "dealer black jack"
				}
				onClick={addCard}
			>
				Add card
			</button>
		</div>
	);
}

export default App;
