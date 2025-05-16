import "./Controls.scss";

type Props = {
	score: number;
	setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
	startNewGame: () => void;
};

const Conrols = ({ score, setShowHint, startNewGame }: Props) => {
	const block = "controls";

	return (
		<nav className={`${block}`}>
			<div className={`${block}__buttons`}>
				<button
					type="button"
					className={`${block}__item ${block}__item--button`}
					onClick={() => startNewGame()}
				>
					New game
				</button>
				<button
					type="button"
					className={`${block}__item ${block}__item--button`}
					onClick={() => setShowHint(true)}
				>
					Hint
				</button>
			</div>
			<output className={`${block}__item ${block}__item--score`}>
				Score: <span className={`${block}__score-value`}>{score}</span>
			</output>
		</nav>
	);
};

export default Conrols;
