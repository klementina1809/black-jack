import React from 'react'

function Chips({credits, bet, setBet}) {
  return (
    <div className="chips">
				{credits - bet < 0 && (
					<span>You can't play, decrease the bet amount</span>
				)}
				<div className="chip" data-value="10">
					<img src="./img/10.png" alt="" onClick={() => setBet(10)} />
				</div>
				<div className="chip" data-value="20">
					<img src="./img/20.png" alt="" onClick={() => setBet(20)} />
				</div>
				<div className="chip" data-value="50">
					<img src="./img/50.png" alt="" onClick={() => setBet(50)} />
				</div>
				<div className="chip" data-value="100">
					<img
						src="./img/100.png"
						alt=""
						onClick={() => setBet(100)}
					/>
				</div>
			</div>
  )
}

export default Chips
