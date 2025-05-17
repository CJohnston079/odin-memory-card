import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import Controls from "../Controls/Controls";
import Cards from "@/components/Cards/Cards";
import Menu from "../Menu/Menu";
import { generateCards, shuffle } from "@/components/Cards/cardUtils";
import "./Game.scss";

const Game = () => {
	const [score, setScore] = useState(0);
	const [showHint, setShowHint] = useState(false);
	const [cards, setCards] = useState(() => generateCards());
	const [chosenCards, setChosenCards] = useState<number[]>([]);
	const [isPlaying, setIsPlaying] = useState(true);

	const hintedIds = showHint ? chosenCards.slice(0, Math.ceil(chosenCards.length / 2)) : [];

	const startGame = useCallback(() => {
		setScore(0);
		setChosenCards([]);
		setCards(generateCards());
		setShowHint(false);
		setIsPlaying(true);
	}, []);

	const endGame = useCallback(() => {
		setIsPlaying(false);
		setShowHint(false);
	}, []);

	const nextRound = useCallback(
		(cardId: number) => {
			setChosenCards(prev => [...prev, cardId]);
			setScore(prev => prev + 1);

			if (score === cards.length - 1) {
				endGame();
			}

			setCards(prev => shuffle(prev));
			setShowHint(false);
		},
		[score, cards.length, endGame]
	);

	const handleCardClick = (cardId: number) => {
		if (!isPlaying) return;

		if (!chosenCards.includes(cardId)) {
			nextRound(cardId);
		} else {
			endGame();
		}
	};

	return (
		<>
			<AnimatePresence>
				{!isPlaying && <Menu score={score} startNewGame={startGame} />}
			</AnimatePresence>
			<Controls score={score} setShowHint={setShowHint} endGame={endGame} />
			<Cards
				cards={cards}
				onCardClick={handleCardClick}
				hintedIds={hintedIds}
				isPlaying={isPlaying}
			/>
		</>
	);
};

export default Game;
