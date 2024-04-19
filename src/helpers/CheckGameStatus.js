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
	dealersCardLenght,
	gameStatuses
) => {
	if (
		playerCardsLenght === 2 &&
		dealersCardLenght === 2 &&
		(playerSum === 21 || dealerSum === 21)
	) {
		if (playerSum === 21 && dealerSum === 21)
			return gameStatuses.BLACKJACK_PUSH;
		else if (playerSum === 21 && dealerSum !== 21)
			return gameStatuses.PLAYER_BLACKJACK;
		else if (playerSum !== 21 && dealerSum === 21)
			return gameStatuses.DEALER_BLACKJACK;
	} else if (playerSum > 21) return gameStatuses.PLAYER_BUST;
	else if (dealerSum > 21) return gameStatuses.DEALER_BUST;
	else if (dealerSum >= 17 && dealerSum > playerSum)
		return gameStatuses.DEALER_WIN;
	else if (dealerSum >= 17 && dealerSum < playerSum)
		return gameStatuses.PLAYER_WIN;
	else if (dealerSum >= 17 && dealerSum == playerSum)
		return gameStatuses.PUSH;
	else return "";
};

const checkGameStatus = (playerCards, dealerCards, gameStatuses) => {
	const playerSum = getCardsSum(playerCards);
	const dealerSum = getCardsSum(dealerCards);
	const gameStatus = getMessage(
		playerSum,
		dealerSum,
		playerCards.length,
		dealerCards.length,
		gameStatuses
	);

	return {
		playerSum,
		dealerSum,
		gameStatus,
	};
};

export default checkGameStatus;
