import { useState, useEffect } from "react";
import playingCards from "./components/CardsTry";

import "./App.css";

function App() {
	const [cards, setCards] = useState(playingCards);

	const [dealerCards, setDealerCards] = useState([]);
	const [playerCards, setPlayerCards] = useState([]);
	const [playersSum, setPlayersSum] = useState(0);
	const [dealersSum, setDealersSum] = useState(0);
	const [gameStatus, setGameStatus] = useState("");

	useEffect(() => {
		if (playerCards.length > 0) checkGameStatus();
	}, [playerCards, dealerCards]);

	const randomCardGenerate = () => {
		const randomId = Math.floor(Math.random() * 51);
		const newRandomCard = cards.find((card) => card.id === randomId);

		if (!newRandomCard) {
			return randomCardGenerate();
		}

		return newRandomCard;
	};

	const checkPlayerStatus = () => {
		let playersSum = 0;
		const totalSum = playerCards.reduce((acc, cur) => {
			return acc + cur.points;
		}, 0);
		for (let card of playerCards) {
			let points;
			if (totalSum > 21 && card.rank == "A") {
				points = 1;
			} else points = card.points;
			console.log('points',points);
			playersSum += points;
		}
		return playersSum;
	};

	// const checkPlayerStatus = () => {
	// 	let playersSum = 0;
	// 	const totalSum = playerCards.reduce((acc, cur) => {
	// 		return acc + cur.points;
	// 	}, 0);
	// 	if (playerCards.some((card) => card.rank === "A") && totalSum > 21) {
	// 		for (let card of playerCards) {
	// 			let points = aceControl(card, playersSum, totalSum, 1);
	// 			playersSum += points;
	// 		}
	// 	} else {
	// 		for (let card of playerCards) {
	// 			let points = aceControl(card, playersSum, totalSum, 11);
	// 			playersSum += points;
	// 		}
	// 	}
	// 	console.log('playersSum',playersSum);
	// 	return playersSum;
	// };

	const checkDealerStatus = () => {
		let dealersSum = 0;
		const totalSum = dealerCards.reduce((acc, cur) => {
			return acc + cur.points;
		}, 0);

		if (dealerCards.some((card) => card.rank === "A") && totalSum > 21) {
			for (let card of dealerCards) {
				let points = aceControl(card, dealersSum, totalSum, 1);
				dealersSum += points;
			}
		} else {
			for (let card of dealerCards) {
				let points = aceControl(card, dealersSum, totalSum, 11);
				dealersSum += points;
			}
		}

		return dealersSum;
	};

	const checkGameStatus = () => {
		const playersSum = checkPlayerStatus();
		setPlayersSum(playersSum);
		const dealersSum = checkDealerStatus();
		setDealersSum(dealersSum);

		if (dealersSum >= 17 && dealersSum > playersSum)
			setGameStatus("dealer win");
		else if (dealersSum >= 17 && dealersSum < playersSum)
			setGameStatus("player win");
		else if (dealersSum >= 17 && dealersSum == playersSum)
			setGameStatus("push");

		if (playerCards.length === 2 && playersSum === 21)
			setGameStatus("player black jack, player win");
		if (playersSum > 21) setGameStatus("player bust, player lost");

		if (dealerCards.length === 2 && dealersSum === 21)
			setGameStatus("dealer black jack, player lost");
		if (dealersSum > 21) setGameStatus("dealer bust, player win");
	};

	const aceControl = (card, currentSum, totalSum, ace) => {
		if (card.rank === "A") {
			if (currentSum + 11 <= 21) {
				return ace;
			} else {
				console.log("currentSum", currentSum);
				return 1;
			}
			// return sum + 11 <= 21 ? card.points[1] : card.points[0];
		} else {
			return card.points;
		}
	};

	const addCard = () => {
		const newCard = randomCardGenerate();

		setCards((prevCards) => {
			const newCards = prevCards.filter((card) => card.id !== newCard.id);
			return newCards;
		});
		setPlayerCards([...playerCards, newCard]);
	};

	const handleStay = () => {
		let sum = dealersSum;
		while (sum < 17) {
			const newCard = randomCardGenerate();
			setCards((prevCards) => {
				const newCards = prevCards.filter(
					(card) => card.id !== newCard.id
				);
				return newCards;
			});
			setDealerCards((prevDealerCards) => [...prevDealerCards, newCard]);
			sum += newCard.points;
			setDealersSum(sum);
		}
	};

	const startGame = () => {
		setGameStatus("");
		setDealersSum(0);
		setDealersSum(0);
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
				<span>{playersSum}</span>
				{playerCards.map((card) => (
					<img className="card" key={card.id} src={card.img} alt="" />
				))}
			</div>
			<p>{gameStatus}</p>
			<div className="options-bar">
				<button
					disabled={
						playersSum === 0 ||
						gameStatus === "dealer bust" ||
						gameStatus === "player bust" ||
						gameStatus === "player black jack" ||
						gameStatus === "dealer black jack"
					}
					onClick={addCard}
				>
					Hit
				</button>
				<button
					disabled={
						playersSum === 0 ||
						gameStatus === "dealer bust" ||
						gameStatus === "player bust" ||
						gameStatus === "player black jack" ||
						gameStatus === "dealer black jack"
					}
					onClick={handleStay}
				>
					Stay
				</button>
			</div>
		</div>
	);
}

export default App;
