import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import Controls from "@/components/Controls";
import Cards from "@/components/Cards";
import LoadingSpinner from "@/components/LoadingSpinner";
import Menu from "@/components/Menu";

import { shuffle } from "@/components/Cards/cardUtils";
import "./Game.scss";

const NEW_DECK_API = import.meta.env.VITE_CMS_NEW_DECK_API;
const DECK_API = import.meta.env.VITE_CMS_DECK_API;

const Game = () => {
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [score, setScore] = useState(0);
	const [showHint, setShowHint] = useState(false);
	const [chosenCards, setChosenCards] = useState<string[]>([]);
	const [isPlaying, setIsPlaying] = useState(true);
	const hasFetchedRef = useRef(false);

	const hintedCodes: string[] = showHint
		? chosenCards.slice(0, Math.ceil(chosenCards.length / 2))
		: [];

	const fetchNewCards = useCallback(async () => {
		try {
			setLoading(true);
			const deckRes = await fetch(NEW_DECK_API);
			const deckData = await deckRes.json();

			const drawRes = await fetch(`${DECK_API}/${deckData.deck_id}/draw/?count=12`);
			const drawData = await drawRes.json();

			setCards(drawData.cards);
		} catch (err) {
			setError(`Failed to fetch cards. ${err}`);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (!hasFetchedRef.current) {
			hasFetchedRef.current = true;
			fetchNewCards();
		}
	}, [fetchNewCards]);

	const startGame = useCallback(() => {
		setScore(0);
		setChosenCards([]);
		setShowHint(false);
		setIsPlaying(true);
		fetchNewCards();
	}, [fetchNewCards]);

	const endGame = useCallback(() => {
		setIsPlaying(false);
		setShowHint(false);
	}, []);

	const nextRound = useCallback(
		(code: string) => {
			setChosenCards(prev => [...prev, code]);
			setScore(prev => prev + 1);

			if (score === cards.length - 1) {
				endGame();
			}

			setCards(prev => shuffle(prev));
			setShowHint(false);
		},
		[score, cards.length, endGame]
	);

	const handleCardClick = (code: string) => {
		if (!isPlaying) return;

		if (!chosenCards.includes(code)) {
			nextRound(code);
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
			{error ? (
				<p>{error}</p>
			) : loading ? (
				<LoadingSpinner />
			) : (
				<Cards
					cards={cards}
					onCardClick={handleCardClick}
					hintedCodes={hintedCodes}
					isPlaying={isPlaying}
				/>
			)}
		</>
	);
};

export default Game;
