import "./Menu.scss";

type Props = {
	score: number;
	setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ score, setShowHint }: Props) => {
	return (
		<nav className="menu">
			<div className="menu__buttons">
				<button
					type="button"
					className="menu__item menu__item--button"
					onClick={() => setShowHint(true)}
				>
					Hint
				</button>
			</div>
			<output className="menu__item menu__item--score">
				Score: <span className="menu__score-value">{score}</span>
			</output>
		</nav>
	);
};

export default Menu;
