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

const rotationsA = [-10, 2, 7, -2, 3, -1, -6, 2, -9, -2, 1, 8];
const rotationsB = [5, -2, -7, 2, -3, 1, 6, -2, 9, 2, -1, -8];

const Cards = ({ cards, onCardClick, hintedCodes, isPlaying }: Props) => {
	const [rotations, setRotations] = useState(rotationsA);

	const toggleRotations = () => {
		setRotations(prev => (prev === rotationsA ? rotationsB : rotationsA));
	};

	return (
		<div className="cards">
			<AnimatePresence>
				{cards.map((card, i) => (
					<Card
						key={card.code}
						card={card}
						rotation={rotations[i % rotations.length]}
						hinted={hintedCodes.includes(card.code)}
						isActive={isPlaying}
						onClick={() => {
							onCardClick(card.code);
							toggleRotations();
						}}
					/>
				))}
			</AnimatePresence>
		</div>
	);
};

export default Cards;
