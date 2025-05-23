import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { CardData } from "@/types/CardData";

import Card from "@/components/Card";
import "./Cards.scss";

type Props = {
	cards: CardData[];
	onCardClick: (code: string) => void;
	hintedCodes: string[];
	isPlaying: boolean;
};

const generateRotations = (count: number, min = -4, max = 4) => {
	return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

const Cards = ({ cards, onCardClick, hintedCodes, isPlaying }: Props) => {
	const [rotations, setRotations] = useState(() => generateRotations(cards.length));

	const regenerateRotations = () => {
		setRotations(generateRotations(cards.length));
	};

	return (
		<div className={`cards ${!isPlaying ? "cards--inactive" : ""}`}>
			<AnimatePresence>
				{cards.map((card, i) => (
					<Card
						key={card.code}
						card={card}
						rotation={rotations[i % rotations.length]}
						isHinted={hintedCodes.includes(card.code)}
						isActive={isPlaying}
						handleClick={() => {
							onCardClick(card.code);
							regenerateRotations();
						}}
					/>
				))}
			</AnimatePresence>
		</div>
	);
};

export default Cards;
