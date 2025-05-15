import { useState } from "react";

import Cards from "@/components/Cards/Cards";
import "./Game.scss";

const Game = () => {
	const [score, setScore] = useState(0);

	return (
		<>
			<p className="score">
				Score: <span className="score__value">{score}</span>
			</p>
			<Cards score={score} setScore={setScore} />
		</>
	);
}

export default Game;
