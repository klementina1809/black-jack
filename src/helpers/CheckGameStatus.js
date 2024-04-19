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
	playersSum,
	dealersSum,
	playerCardsLenght,
	dealersCardLenght
) => {
	if (playerCardsLenght === 2 && playersSum === 21) {
		// se il dealer ha il numero 10 o l'A
		// allora controllare la prossima carta del dealer

		// se il dealer ha blackjack
		// allora push

		// se il dealer non ha blackjack
		// allora player win

		// se il dealer non ha il numero 10 o l'A
		// allora player win
		return "player black jack, dealer lost";
	} else if (dealersCardLenght === 2 && dealersSum === 21)
		return "dealer black jack, player lost";
	else if (playersSum > 21) return "player bust, dealer win";
	else if (dealersSum > 21) return "dealer bust, player win";
	else if (dealersSum >= 17 && dealersSum > playersSum) return "dealer win";
	else if (dealersSum >= 17 && dealersSum < playersSum) return "player win";
	else if (dealersSum >= 17 && dealersSum == playersSum) return "push";
};

const checkGameStatus = (playerCards, dealerCards) => {
	const playersSum = getCardsSum(playerCards);
	const dealersSum = getCardsSum(dealerCards);
	const gameStatus = getMessage(
		playersSum,
		dealersSum,
		playerCards.length,
		dealerCards.length
	);

	return {
		playersSum,
		dealersSum,
		gameStatus,
	};
};

export default checkGameStatus;
