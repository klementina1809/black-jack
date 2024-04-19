const getCardsSum = (cards) => {
	let totalSum = cards.reduce((acc, cur) => {
		return acc + cur.points;
	}, 0);

	cards.forEach((card) => {
		if (totalSum > 21 && card.rank == "A") {
			totalSum -= 10;
		}
	});

	return totalSum;
};

const getMessage = (
	playerSum,
	dealerSum,
	playerCardsLenght,
	dealersCardLenght
) => {
	if (playerCardsLenght === 2 && dealersCardLenght === 2 && (playerSum === 21 || dealerSum === 21)) {
		if (playerSum === 21 && dealerSum === 21) return "black jack push";
		else if (playerSum === 21 && dealerSum !== 21)
			return "player black jack, dealer lost";
		else if (playerSum !== 21 && dealerSum === 21)
			return "dealer black jack, player lost";

		// se il dealer ha il numero 10 o l'A
		// allora controllare la prossima carta del dealer

		// se il dealer ha blackjack
		// allora push

		// se il dealer non ha blackjack
		// allora player win

		// se il dealer non ha il numero 10 o l'A
		// allora player win

		// return gameStatues.PLAYER_BLACKJACK;
	} else if (playerSum > 21) return "player bust, dealer win";
	else if (dealerSum > 21) return "dealer bust, player win";
	else if (dealerSum >= 17 && dealerSum > playerSum) return "dealer win";
	else if (dealerSum >= 17 && dealerSum < playerSum) return "player win";
	else if (dealerSum >= 17 && dealerSum == playerSum) return "push";
	else return "";
};

const checkGameStatus = (playerCards, dealerCards) => {
	const playerSum = getCardsSum(playerCards);
	const dealerSum = getCardsSum(dealerCards);
	const gameStatus = getMessage(
		playerSum,
		dealerSum,
		playerCards.length,
		dealerCards.length
	);

	return {
		playerSum,
		dealerSum,
		gameStatus,
	};
};

export default checkGameStatus;

const gameStatues = {
	PLAYER_BLACKJACK: "PLAYER_BLACKJACK",
	DEALER_BLACKJACK: "DEALER_BLACKJACK",
	PLAYER_BUST: "PLAYER_BUST",
	DEALER_BUST: "DEALER_BUST",
	DEALER_WIN: "DEALER_WIN",
	PLAYER_WIN: "PLAYER_WIN",
	PUSH: "PUSH",
};
