import { useState } from "react";

import Menu from "../Menu";
import Cards from "@/components/Cards/Cards";
import "./Game.scss";

const Game = () => {
	const [score, setScore] = useState(0);
	const [showHint, setShowHint] = useState(false);

	return (
		<>
			<Menu score={score} setShowHint={setShowHint} />
			<Cards score={score} setScore={setScore} showHint={showHint} setShowHint={setShowHint} />
		</>
	);
};

export default Game;
