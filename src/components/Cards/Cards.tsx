import { useState } from "react";
import Card from "@/components/Card/Card";
import "./Cards.scss";

type CardData = {
	id: number;
	name: string;
};

type Props = {
	score: number;
	setScore: React.Dispatch<React.SetStateAction<number>>;
};

const shuffle = function <T>(cards: T[]): T[] {
	return [...cards].sort(() => Math.random() - 0.5);
};

const generateCards = function () {
	const suits = ["♣️", "♦️", "♠️", "♥️"];
	const values = Array.from({ length: 10 }, (_, i) => i + 1);

	const deck: string[] = [];

	for (const suit of suits) {
		for (const value of values) {
			deck.push(`${value} ${suit}`);
		}
	}

	const shuffledDeck = shuffle(deck);

	const cards = Array.from({ length: 12 }, (_, i) => ({
		id: i,
		name: shuffledDeck[i],
	}));

	return cards;
};

const Cards = function ({ score, setScore }: Props) {
	const [cards, setCards] = useState(generateCards);
	const [chosenCards, setChosenCards] = useState<number[]>([]);

	const nextRound = function (cardId: number) {
		setChosenCards([...chosenCards, cardId]);
		setScore(score + 1);
		setCards(shuffle(cards));
	};

	const resetGame = function () {
		setScore(0);
		setChosenCards([]);
		setCards(generateCards);
	};

	const handleClick = (card: CardData) => () => {
		if (!chosenCards.includes(card.id)) {
			nextRound(card.id);
		} else {
			resetGame();
		}
	};

	return (
		<div className="cards">
			{cards.map((card, i) => (
				<Card key={i} name={card.name} onClick={handleClick(card)} />
			))}
		</div>
	);
};

export default Cards;
