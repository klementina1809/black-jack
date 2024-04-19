import { useState, useEffect } from "react";
import playingCards from "./helpers/Cards";
import checkGameStatus from "./helpers/CheckGameStatus";

import "./App.css";

function App() {
	const [cards, setCards] = useState(playingCards);

	const [dealerCards, setDealerCards] = useState([]);
	const [playerCards, setPlayerCards] = useState([]);
	const [playersSum, setPlayersSum] = useState(0);
	const [dealersSum, setDealersSum] = useState(0);
	const [gameStatus, setGameStatus] = useState("");
	const [bet, setBet] = useState(0);
	const [credit, setCredit] = useState(1000);
	const [win, setWin] = useState(0);

	useEffect(() => {
		if (playerCards.length > 0) {
			const {
				playersSum: pSum,
				dealersSum: dSum,
				gameStatus: gStatus,
			} = checkGameStatus(playerCards, dealerCards);
			setPlayersSum(pSum);
			setDealersSum(dSum);
			setGameStatus(gStatus);
		}
	}, [playerCards, dealerCards]);

	useEffect(() => {
		if (gameStatus !== "") {
			creditsCalculate(gameStatus);
			setBet(0);
		}
	}, [gameStatus]);

	const randomCardGenerate = () => {
		const randomId = Math.floor(Math.random() * 51);
		const newRandomCard = cards.find((card) => card.id === randomId);
		if (!newRandomCard) {
			return randomCardGenerate();
		}
		return newRandomCard;
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
		const dealerDraw = () => {
			if (sum < 17) {
				setTimeout(() => {
					const newCard = randomCardGenerate();
					setCards((prevCards) => {
						const newCards = prevCards.filter((card) => card.id !== newCard.id);
						return newCards;
					});
					setDealerCards((prevDealerCards) => [...prevDealerCards, newCard]);
					sum += newCard.points;
					setDealersSum(sum);
					dealerDraw(); // Рекурсивный вызов для следующей карты
				}, 600);
			}
		};
		dealerDraw(); // Начать рекурсивный процесс
	};

	const startGame = () => {
		setCards(playingCards);
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
			message === "dealer bust, player win" ||
			message === "Player win and have black jack"
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

	const handleDouble = () => {
		setBet((prev) => prev * 2);
		setCredit((prev) => prev - bet);
		addCard();
		handleStay();
	};

	return (
		<div className="table-container">
			<div className="row-container gold">
				<div className="input-container">
					<h3>Credits</h3>
					<h3>{credit}</h3>
				</div>
				<div className="input-container">
					<h3>Win</h3>
					<h3>{win}</h3>
				</div>
				<div className="input-container">
					<h3>Bet</h3>
					<h3>{bet}</h3>
				</div>
			</div>
			<div className="cards-container">
				<div className="dealer container">
					<h2>DEALER {dealersSum} </h2>
					{dealerCards.map((card, index) => (
						<img
							className={`card ${
								index === dealerCards.length - 1
									? "card-appear-animation card"
									: "card"
							}`}
							key={card.id}
							src={card.img}
							alt=""
						/>
					))}
				</div>
				<div className="player container">
					<h2>PLAYER {playersSum}</h2>
					{playerCards.map((card) => (
						<img
							className={"card-appear-animation card"}
							key={card.id}
							src={card.img}
							alt=""
						/>
					))}
				</div>
			</div>
			<h3 className="message">{gameStatus}</h3>
			<div className="options-bar">
				<button
					disabled={playersSum === 0 || gameStatus !== ""}
					onClick={addCard}
				>
					Hit
				</button>
				<button
					disabled={playersSum === 0 || gameStatus !== ""}
					onClick={handleStay}
				>
					Stay
				</button>
				<button
					disabled={playersSum === 0 || gameStatus !== ""}
					onClick={handleDouble}
				>
					Double
				</button>
			</div>
			<div className="row-container">
				<button className="play" onClick={startGame} disabled={bet === 0}>
					Play
				</button>
			</div>
			<div className="chips">
				{credit - bet < 0 && (
					<span>You can't play, decrease the bet amount</span>
				)}
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
					<img src="./img/100.png" alt="" onClick={() => setBet(100)} />
				</div>
			</div>
		</div>
	);
}

export default App;
