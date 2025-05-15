import "./Card.scss";

interface Props {
	name: string;
	onClick: () => void;
}

const Card = function ({ name, onClick }: Props) {
	const isRed = name.includes("♦️") || name.includes("♥️");

	return (
		<div className={`card ${isRed ? "card--red" : ""}`} onClick={onClick}>
			<span className="card__text">{name}</span>
		</div>
	);
};

export default Card;
