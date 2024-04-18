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
	const [bet, setBet] = useState(10);
	const [credit, setCredit] = useState(1000);
	const [win, setWin] = useState(0);

	useEffect(() => {
		if (playerCards.length > 0) checkGameStatus();
	}, [playerCards, dealerCards]);

	useEffect(() => {
		if (gameStatus !== "") creditsCalculate(gameStatus);
	}, [gameStatus]);

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
			playersSum += points;
		}
		return playersSum;
	};

	const checkDealerStatus = () => {
		let dealersSum = 0;
		const totalSum = dealerCards.reduce((acc, cur) => {
			return acc + cur.points;
		}, 0);
		for (let card of dealerCards) {
			let points;
			if (totalSum > 21 && card.rank == "A") {
				points = 1;
			} else points = card.points;
			dealersSum += points;
		}
		return dealersSum;
	};

	const checkGameStatus = () => {
		const playersSum = checkPlayerStatus();
		setPlayersSum(playersSum);
		const dealersSum = checkDealerStatus();
		setDealersSum(dealersSum);

		if (dealersSum >= 17 && dealersSum > playersSum)
			setGameStatus("Dealer win");
		else if (dealersSum >= 17 && dealersSum < playersSum)
			setGameStatus("Player win");
		else if (dealersSum >= 17 && dealersSum == playersSum)
			setGameStatus("push");

		if (playerCards.length === 2 && playersSum === 21)
			setGameStatus("player black jack, player win");
		if (playersSum > 21) setGameStatus("player bust, player lost");

		if (dealerCards.length === 2 && dealersSum === 21)
			setGameStatus("dealer black jack, player lost");
		if (dealersSum > 21) setGameStatus("dealer bust, player win");
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
		setCredit((prev) => prev - bet);
		setGameStatus("");
		setWin(0);
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

	const creditsCalculate = (message) => {
		let newCredits;
		if (
			message === "Dealer win" ||
			message === "player bust, player lost" ||
			message === "dealer black jack, player lost"
		) {
			newCredits = 0;
		} else if (
			message === "Player win" ||
			message === "dealer bust, player win"
		) {
			newCredits = 2 * bet;
		} else if (message === "player black jack, player win") {
			newCredits = 2.5 * bet;
		} else if (message === "push") {
			newCredits = bet;
		}
		console.log("newCredits", newCredits);
		setWin(newCredits);
		setCredit((prev) => prev + newCredits);
	};

	return (
		<div className="table-container">
			<div className="row-container">
				<div className="input-container">
					<span>Credits</span>
					<input type="number" value={credit} readOnly />
				</div>
				<div className="input-container">
					<span>Win</span>
					<input type="number" value={win} readOnly />
				</div>
			</div>
			<div className="cards-container">
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
			</div>
			<p>{gameStatus}</p>
			<div className="options-bar">
				<button
					disabled={
						playersSum === 0 ||
						gameStatus !== "" 
					}
					onClick={addCard}
				>
					Hit
				</button>
				<button
					disabled={
						playersSum === 0 ||
						gameStatus !== "" 
					}
					onClick={handleStay}
				>
					Stay
				</button>
			</div>
			<div className="row-container">
				<div className="input-container">
					<span>Bet</span>
					{credit - bet < 0 && (
						<span>You can't play, decrease the bet amount</span>
					)}
					<input type="number" value={bet} readOnly />
				</div>
				<button onClick={startGame}>Start</button>
			</div>
			<div className="chips">
				<div className="chip" data-value="10">
					<img src="./img/10.png" alt="" onClick={() => setBet(10)} />
				</div>
				<div className="chip" data-value="20">
					<img src="./img/20.png" alt="" onClick={() => setBet(20)} />
				</div>
				<div className="chip" data-value="50">
					<img src="./img/50.png" alt="" onClick={() => setBet(50)} />
				</div>
				<div className="chip" data-value="100">
					<img
						src="./img/100.png"
						alt=""
						onClick={() => setBet(100)}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
