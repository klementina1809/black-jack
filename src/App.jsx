import { useState, useEffect } from "react";
import playingCards from "./helpers/CardsTry";
import checkGameStatus from "./helpers/CheckGameStatus";

import Chips from "./components/Chips";
import Cards from "./components/Cards";
import InfoBox from "./components/InfoBox";
import OptionsBox from "./components/OptionsBox";

import "./App.css";

function App() {
	const [cards, setCards] = useState(playingCards);

	const [dealerCards, setDealerCards] = useState([]);
	const [playerCards, setPlayerCards] = useState([]);
	const [playerSum, setPlayerSum] = useState(0);
	const [dealerSum, setDealerSum] = useState(0);
	const [gameStatus, setGameStatus] = useState("");
	const [bet, setBet] = useState(0);
	const [credits, setCredits] = useState(1000);
	const [lastWinCredits, setLastWinCredits] = useState(0);
	const [btnsDisabled, setBtnsDisabled] = useState(true);

	useEffect(() => {
		if (playerCards.length > 0) {
			const {
				playerSum: pSum,
				dealerSum: dSum,
				gameStatus: gStatus,
			} = checkGameStatus(playerCards, dealerCards);
			setPlayerSum(pSum);
			setDealerSum(dSum);
			setGameStatus(gStatus);
		}
		//console.log("cards", cards);
	}, [playerCards, dealerCards]);

	useEffect(() => {
		if (gameStatus !== "") {
			creditsCalculate();
			setBtnsDisabled(true);
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

	const removeCard = (newCard) => {
		setCards((prevCards) => {
			const newCards = prevCards.filter((card) => card.id !== newCard.id);
			return newCards;
		});
	};

	const addCard = (someone) => {
		const newCard = randomCardGenerate();
		removeCard(newCard);
		if (someone === "player") {
			setPlayerCards([...playerCards, newCard]);
		} else if (someone === "dealer") {
			setDealerCards((prevDealerCards) => [...prevDealerCards, newCard]);
		}

		return newCard;
	};

	const handleStay = () => {
		setBtnsDisabled(true);
		let sum = dealerSum;
		let dealerCardsArray = [dealerCards[0].points];
		const dealerDraw = () => {
			if (sum < 17) {
				setTimeout(() => {
					const newCard = addCard("dealer");

					if (newCard.rank === "A" && sum >= 11) {
						dealerCardsArray.push(1);
					} else {
						dealerCardsArray.push(newCard.points);
					}

					sum += dealerCardsArray[dealerCardsArray.length - 1];

					const aceIndex = dealerCardsArray.findIndex((el) => el === 11);

					if (sum > 21 && aceIndex !== -1) {
						dealerCardsArray[aceIndex] = 1;
						sum -= 10;
					}

					if (sum < 17) dealerDraw();

					/*
					if (newCard.rank === "A" && sum >= 11) sum += 1;
					else sum += newCard.points;

					console.log("suuuum", sum);

					// setDealerSum(sum);
					if (sum < 17) dealerDraw();
					*/
				}, 600);
			}
		};
		dealerDraw();
	};

	const resetGame = () => {
		setCards(playingCards);
		setDealerCards([]);
		setPlayerCards([]);
		setPlayerSum(0);
		setDealerSum(0);
		setGameStatus("");
		setLastWinCredits(0);
		setBtnsDisabled(false);
	};

	const startGame = () => {
		resetGame();
		setCredits((prev) => prev - bet);

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

		let winCredits = 0;
		if (
			message === "Dealer win" ||
			message === "player bust, player lost" ||
			message === "dealer black jack, player lost"
		) {
			winCredits = 0;
		} else if (
			message === "Player win" ||
			message === "dealer bust, player win" ||
			message === "Player win and have black jack"
		) {
			winCredits = 2 * bet;
		} else if (message === "player black jack, player win") {
			winCredits = 2.5 * bet;
		} else if (message === "push") {
			winCredits = bet;
		}
		setLastWinCredits(winCredits);
		setCredits((prev) => prev + winCredits);
	};

	const handleDouble = () => {
		setBet(bet * 2);
		setBtnsDisabled(true);
		setCredits((prev) => prev - bet * 2);
		// const newCard =
		addCard("player");
		// setPlayerCards([...playerCards, newCard]);
		handleStay();
	};

	return (
		<div className="table-container">
			<InfoBox credits={credits} lastWinCredits={lastWinCredits} bet={bet} />
			<Cards
				dealerCards={dealerCards}
				playerCards={playerCards}
				dealerSum={dealerSum}
				playerSum={playerSum}
			/>
			<h3 className="message">{gameStatus}</h3>
			<OptionsBox
				addCard={addCard}
				handleStay={handleStay}
				handleDouble={handleDouble}
				playerCards={playerCards}
				setPlayerCards={setPlayerCards}
				btnsDisabled={btnsDisabled}
			/>
			<div className="row-container">
				<button className="play" onClick={startGame} disabled={bet === 0}>
					Play
				</button>
			</div>
			<Chips credits={credits} bet={bet} setBet={setBet} />
		</div>
	);
}

export default App;
