import Card from "@/components/Card/Card";
import "./Cards.scss";

const suits = ["♣️", "♦️", "♥️", "♠️"];
const values = Array.from({ length: 9 }, (_, i) => i + 1);

const deck = [];

for (const suit of suits) {
	for (const value of values) {
		deck.push(`${value} ${suit}`);
	}
}

const shuffledDeck = deck.sort(() => Math.random() - 0.5);

const cards = Array.from({ length: 12 }, (_, i) => ({
	id: i,
	name: shuffledDeck[i],
}));

const Cards = function () {
	return (
		<div className="cards">
			{cards.map(card => (
				<Card key={card.id} name={card.name} />
			))}
		</div>
	);
};

export default Cards;
