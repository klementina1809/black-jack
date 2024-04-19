import React from "react";

function OptionsBox({
	addCard,
	handleStay,
	handleDouble,
	playerCards,
	setPlayerCards,
  btnsDisabled
}) {
	return (
		<div className="options-bar">
			<button
				disabled={btnsDisabled}
				onClick={() => {
					const newCard = addCard('player');
					// setPlayerCards([...playerCards, newCard]);
				}}
			>
				Hit
			</button>
			<button
				disabled={btnsDisabled}
				onClick={handleStay}
			>
				Stay
			</button>
			<button
				disabled={btnsDisabled}
				onClick={handleDouble}
			>
				Double
			</button>
		</div>
	);
}

export default OptionsBox;
