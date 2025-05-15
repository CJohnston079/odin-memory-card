import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Card from "@/components/Card/Card";
import "./Cards.scss";

type CardData = {
	id: number;
	name: string;
};

type Props = {
	score: number;
	showHint: boolean;
	setScore: React.Dispatch<React.SetStateAction<number>>;
	setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
};

const rotationsA = [-10, 2, 7, -2, 3, -1, -6, 2, -9, -2, 1, 8];
const rotationsB = [5, -2, -7, 2, -3, 1, 6, -2, 9, 2, -1, -8];

const shuffle = function <T>(cards: T[]): T[] {
	const shuffled = [...cards];

	do {
		shuffled.sort(() => Math.random() - 0.5);
	} while (shuffled.some((card, i) => card === cards[i]));

	return shuffled;
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

const Cards = function ({ score, setScore, showHint, setShowHint }: Props) {
	const [cards, setCards] = useState(generateCards);
	const [chosenCards, setChosenCards] = useState<number[]>([]);
	const [rotations, setRotations] = useState(rotationsA);

	const hintedCards = showHint ? chosenCards.slice(0, Math.ceil(chosenCards.length / 2)) : [];

	const toggleRotations = () => {
		setRotations(prev => (prev === rotationsA ? rotationsB : rotationsA));
	};

	const nextRound = function (cardId: number) {
		setChosenCards([...chosenCards, cardId]);
		setScore(score + 1);
		setCards(shuffle(cards));
		setShowHint(false);
	};

	const resetGame = function () {
		setScore(0);
		setChosenCards([]);
		setCards(generateCards);
		setShowHint(false);
	};

	const handleClick = (card: CardData) => () => {
		toggleRotations();

		if (!chosenCards.includes(card.id)) {
			nextRound(card.id);
		} else {
			resetGame();
		}
	};

	return (
		<div className="cards">
			<AnimatePresence>
				{cards.map((card, i) => (
					<Card
						key={card.id}
						name={card.name}
						rotation={rotations[i]}
						hinted={hintedCards.includes(card.id)}
						onClick={handleClick(card)}
					/>
				))}
			</AnimatePresence>
		</div>
	);
};

export default Cards;
