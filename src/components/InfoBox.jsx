import React from "react";

function InfoBox({credits, lastWinCredits, bet}) {
	return (
		<div className="row-container gold">
			<div className="input-container">
				<h3>Credits</h3>
				<h3>{credits}</h3>
			</div>
			<div className="input-container">
				<h3>Win</h3>
				<h3>{lastWinCredits}</h3>
			</div>
			<div className="input-container">
				<h3>Bet</h3>
				<h3>{bet}</h3>
			</div>
		</div>
	);
}

export default InfoBox;
