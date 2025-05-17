import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { CardData } from "@/types/CardData";

import Card from "@/components/Card/Card";
import "./Cards.scss";

type Props = {
	cards: CardData[];
	onCardClick: (cardId: number) => void;
	hintedIds: number[];
	isPlaying: boolean;
};

const rotationsA = [-10, 2, 7, -2, 3, -1, -6, 2, -9, -2, 1, 8];
const rotationsB = [5, -2, -7, 2, -3, 1, 6, -2, 9, 2, -1, -8];

const Cards = ({ cards, onCardClick, hintedIds, isPlaying }: Props) => {
	const [rotations, setRotations] = useState(rotationsA);

	const toggleRotations = () => {
		setRotations(prev => (prev === rotationsA ? rotationsB : rotationsA));
	};

	return (
		<div className="cards">
			<AnimatePresence>
				{cards.map((card, i) => (
					<Card
						key={card.id}
						name={card.name}
						rotation={rotations[i % rotations.length]}
						hinted={hintedIds.includes(card.id)}
						isActive={isPlaying}
						onClick={() => {
							onCardClick(card.id);
							toggleRotations();
						}}
					/>
				))}
			</AnimatePresence>
		</div>
	);
};

export default Cards;
