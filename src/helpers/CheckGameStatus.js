const checkStatus = (cards) => {
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

const checkGameStatus = (
	playerCards,
	dealerCards,
	setPlayersSum,
	setDealersSum,
	setGameStatus
) => {
	const playersSum = checkStatus(playerCards);
	setPlayersSum(playersSum);
	const dealersSum = checkStatus(dealerCards);
	setDealersSum(dealersSum);

	if (dealersSum >= 17 && dealersSum > playersSum) setGameStatus("Dealer win");
	else if (dealersSum >= 17 && playersSum === 21)
		setGameStatus("Player win and have black jack");
	else if (dealersSum >= 17 && dealersSum < playersSum)
		setGameStatus("Player win");
	else if (dealersSum >= 17 && dealersSum == playersSum) setGameStatus("push");

	if (playerCards.length === 2 && playersSum === 21)
		setGameStatus("player black jack, player win");
	if (playersSum > 21) setGameStatus("player bust, player lost");

	if (dealerCards.length === 2 && dealersSum === 21)
		setGameStatus("dealer black jack, player lost");
	if (dealersSum > 21) setGameStatus("dealer bust, player win");
};

export default checkGameStatus;
