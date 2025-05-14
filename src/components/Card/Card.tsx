import "./Card.scss";

interface Props {
	name: string;
}

const Card = function ({ name }: Props) {
	const isRed = name.includes("♦️") || name.includes("♥️");

	return (
		<div className={`card ${isRed ? "card--red" : ""}`}>
			<span className="card__text">{name}</span>
		</div>
	);
};

export default Card;
