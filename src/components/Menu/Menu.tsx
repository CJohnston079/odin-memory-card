import { motion } from "framer-motion";
import "./Menu.scss";

type Props = {
	score: number;
	startNewGame: () => void;
};

const Menu = ({ score, startNewGame }: Props) => {
	const hasWon = score === 12;

	return (
		<motion.div
			className="overlay"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<motion.div
				className="menu"
				initial={{ scale: 1.2 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0.9 }}
				transition={{ duration: 0.5 }}
			>
				<h2>{hasWon ? "You win!" : "Game over!"}</h2>
				<p>
					You scored {score} out of 12{hasWon ? "!" : "."}
				</p>
				<button className="menu__button menu__button--new-game" onClick={startNewGame}>
					New game
				</button>
			</motion.div>
		</motion.div>
	);
};

export default Menu;
