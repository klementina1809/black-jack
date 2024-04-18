const checkStatus = (cards) => {
	let sum = 0;
	const totalSum = cards.reduce((acc, cur) => {
		return acc + cur.points;
	}, 0);
	for (let card of cards) {
		let points;
		if (totalSum > 21 && card.rank == "A") {
			points = 1;
		} else points = card.points;
		sum += points;
	}
	return sum;
};
// const checkPlayerStatus = (playerCards) => {
// 	let playersSum = 0;
// 	const totalSum = playerCards.reduce((acc, cur) => {
// 		return acc + cur.points;
// 	}, 0);
// 	for (let card of playerCards) {
// 		let points;
// 		if (totalSum > 21 && card.rank == "A") {
// 			points = 1;
// 		} else points = card.points;
// 		playersSum += points;
// 	}
// 	return playersSum;
// };

// const checkDealerStatus = (dealerCards) => {
// 	let dealersSum = 0;
// 	const totalSum = dealerCards.reduce((acc, cur) => {
// 		return acc + cur.points;
// 	}, 0);
// 	for (let card of dealerCards) {
// 		let points;
// 		if (totalSum > 21 && card.rank == "A") {
// 			points = 1;
// 		} else points = card.points;
// 		dealersSum += points;
// 	}
// 	return dealersSum;
// };

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

	if (dealersSum >= 17 && dealersSum > playersSum)
		setGameStatus("Dealer win");
	else if (dealersSum >= 17 && playersSum === 21)
		setGameStatus("Player win and have black jack");
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

export default checkGameStatus;
