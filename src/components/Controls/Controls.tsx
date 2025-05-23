import "./Controls.scss";

type Props = {
	score: number;
	highScore: number;
	isPlaying: boolean;
	isHintShowing: boolean;
	setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
	endGame: () => void;
};

const Controls = ({ score, highScore, isPlaying, isHintShowing, setShowHint, endGame }: Props) => {
	const block = "controls";

	return (
		<nav className={`${block}`}>
			<ul className={`${block}__list ${block}__list--buttons`}>
				<button
					type="button"
					className={`${block}__list-item ${block}__list-item--button ${
						!isPlaying ? `${block}__list-item--inactive` : ""
					}`}
					onClick={() => endGame()}
				>
					Retire
				</button>
				<button
					type="button"
					className={`${block}__list-item ${block}__list-item--button ${
						isHintShowing || !isPlaying || score === 0 ? `${block}__list-item--inactive` : ""
					}`}
					onClick={() => {
						if (!isHintShowing && score > 0) setShowHint(true);
					}}
				>
					Hint
				</button>
			</ul>
			<ul className={`${block}__list ${block}__list--score`}>
				<output className={`${block}__list-item ${block}__list-item--score`}>
					Highest score: <span className={`${block}__score-value`}>{highScore}</span>
				</output>
				<output className={`${block}__list-item ${block}__list-item--score`}>
					Score: <span className={`${block}__score-value`}>{score}</span>
				</output>
			</ul>
		</nav>
	);
};

export default Controls;
