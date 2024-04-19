import React from 'react'

function Cards({dealerCards, playerCards, dealerSum, playerSum}) {
  return (
    <div className="cards-container">
				<div className="dealer container">
					<h2>DEALER {dealerSum} </h2>
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
					<h2>PLAYER {playerSum}</h2>
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
  )
}

export default Cards
