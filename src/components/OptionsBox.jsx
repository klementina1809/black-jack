import React from "react";

function OptionsBox({
	addCard,
	playerSum,
	gameStatus,
	handleStay,
	handleDouble,
	playerCards,
	setPlayerCards,
}) {
	return (
		<div className="options-bar">
			<button
				disabled={playerSum === 0 || gameStatus !== ""}
				onClick={() => {
					const newCard = addCard();
					setPlayerCards([...playerCards, newCard]);
				}}
			>
				Hit
			</button>
			<button
				disabled={playerSum === 0 || gameStatus !== ""}
				onClick={handleStay}
			>
				Stay
			</button>
			<button
				disabled={playerSum === 0 || gameStatus !== ""}
				onClick={handleDouble}
			>
				Double
			</button>
		</div>
	);
}

export default OptionsBox;
