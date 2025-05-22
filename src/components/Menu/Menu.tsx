import { motion } from "framer-motion";
import "./Menu.scss";

type Props = {
	score: number;
	startNewGame: () => void;
};

const Menu = ({ score, startNewGame }: Props) => {
	const hasWon = score === 12;

	return (
		<>
			<motion.div
				className="overlay fb-col-wrapper"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { duration: 2, ease: "easeIn" } }}
				exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
			></motion.div>
			<motion.div
				className="menu"
				initial={{
					boxShadow: "none",
					backgroundColor: "hsla(140, 80%, 10%, 0)",
				}}
				animate={{
					boxShadow:
						"inset 4px 4px 8px hsl(140, 80%, 5%, 0.5), inset -4px -4px 8px hsl(140, 80%, 20%, 0.3)",
					backgroundColor: "hsla(140, 80%, 10%, 0.2)",
					transition: { duration: 0.8, ease: "easeIn" },
				}}
				exit={{
					boxShadow: "none",
					backgroundColor: "hsla(140, 80%, 10%, 0)",
					transition: { duration: 0.4, ease: "easeOut" },
				}}
			>
				<motion.header
					className="menu__header"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 1.2 } }}
					exit={{ opacity: 0, transition: { duration: 0.4 } }}
					transition={{ duration: 4 }}
				>
					<h2 className="menu__heading">{hasWon ? "You win!" : "Game over!"}</h2>
				</motion.header>
				<div className="menu__main"></div>
				<motion.footer
					className="menu__footer"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 1.2 } }}
					exit={{ opacity: 0, transition: { duration: 0.4 } }}
					transition={{ duration: 4 }}
				>
					<p className="menu__message">
						You scored {score} out of 12{hasWon ? "!" : "."}
					</p>
					<button className="menu__button menu__button--new-game" onClick={startNewGame}>
						Play again
					</button>
				</motion.footer>
			</motion.div>
		</>
	);
};

export default Menu;
