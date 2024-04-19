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
			creditsCalculate();
			setBet(0);
		}
	}, [gameStatus]);

	const randomCardGenerate = () => {
		const randomId = Math.floor(Math.random() * 51);
		const randomCard = cards.find((card) => card.id === randomId);
		if (!randomCard) {
			return randomCardGenerate();
		}
		return randomCard;
	};

	const addCard = () => {
		const newCard = randomCardGenerate();
		setCards((prevCards) => {
			const newCards = prevCards.filter((card) => card.id !== newCard.id);
			return newCards;
		});
		return newCard;
	};

	const handleStay = () => {
		let sum = dealersSum;
		const dealerDraw = () => {
			if (sum < 17) {
				setTimeout(() => {
					const newCard = addCard();
					setDealerCards([...dealerCards, newCard]);
					sum += newCard.points;
					setDealersSum(sum);
					if (sum < 17) {
						dealerDraw();
					}
				}, 600);
			}
		};
		dealerDraw();
	};

	const resetGame = () => {
		setCards(playingCards);
		setDealerCards([]);
		setPlayerCards([]);
		setPlayersSum(0);
		setDealersSum(0);
		setGameStatus("");
		setWin(0);
	};

	const startGame = () => {
		resetGame();
		setCredit((prev) => prev - bet);

		let dealerCard, playerCard1, playerCard2;

		dealerCard = randomCardGenerate();

		do {
			playerCard1 = randomCardGenerate();
			playerCard2 = randomCardGenerate();
		} while (
			dealerCard.id === playerCard1.id ||
			dealerCard.id === playerCard2.id ||
			playerCard1.id === playerCard2.id
		);

		setCards((prevCards) => {
			const newCards = prevCards.filter(
				(card) =>
					card.id !== dealerCard.id &&
					card.id !== playerCard1.id &&
					card.id !== playerCard2.id
			);
			return newCards;
		});

		setDealerCards([dealerCard]);
		setPlayerCards([playerCard1, playerCard2]);
	};

	const creditsCalculate = () => {
		let message = gameStatus;

		/*
		switch (gameStatus) {
			case "PLAYER_BLACKJACK":
				winCredits = 2.5 * bet;
				break;
			case "DEALER_BLACKJACK":
			case "DEALER_WIN":
			case "PLAYER_BUST":
				winCredits = 0;
				break;
			case "PLAYER_WIN":
			case "DEALER_BUST":
				winCredits = 2 * bet;
				break;
			case "PUSH":
				winCredits = bet;
				break;
		}
		*/

		let newCredits = 0;
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
		setWin(newCredits);
		setCredit((prev) => prev + newCredits);
	};

	const handleDouble = () => {
		setCredit((prev) => prev - bet * 2);
		setBet(bet * 2);
		const newCard = addCard();
		setPlayerCards([...playerCards, newCard]);
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
					onClick={() => {
						const newCard = addCard();
						setPlayerCards([...playerCards, newCard]);
					}}
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
