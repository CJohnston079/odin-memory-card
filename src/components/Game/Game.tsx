import { useCallback, useEffect, useReducer, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import Controls from "@/components/Controls";
import Cards from "@/components/Cards";
import LoadingSpinner from "@/components/LoadingSpinner";
import Menu from "@/components/Menu";

import { getNewDeck } from "@/services/deckService";
import { gameReducer, initialState } from "./gameReducer";

import "./Game.scss";

const NEW_DECK_API = import.meta.env.VITE_CMS_NEW_DECK_API;
const DECK_API = import.meta.env.VITE_CMS_DECK_API;

const Game = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);
	const hasFetchedRef = useRef(false);

	const fetchNewCards = useCallback(async () => {
		try {
			dispatch({ type: "FETCH_START" });
			const drawData = await getNewDeck(NEW_DECK_API, DECK_API);
			dispatch({ type: "FETCH_SUCCESS", cards: drawData.cards });
		} catch (err) {
			dispatch({ type: "FETCH_ERROR", error: `Failed to fetch cards. ${err}` });
		}
	}, []);

	useEffect(() => {
		if (!hasFetchedRef.current) {
			hasFetchedRef.current = true;
			fetchNewCards();
		}
	}, [fetchNewCards]);

	const startGame = useCallback(() => {
		if (state.loading) {
			return;
		}

		dispatch({ type: "START_GAME" });
		fetchNewCards();
	}, [fetchNewCards, state.loading]);

	const endGame = () => {
		dispatch({ type: "END_GAME" });
	};

	const showHint = () => {
		dispatch({ type: "SHOW_HINT" });
	};

	const handleCardClick = (code: string) => {
		if (!state.isPlaying) {
			return;
		}

		if (state.chosenCards.includes(code)) {
			dispatch({ type: "END_GAME" });
		} else {
			dispatch({ type: "NEXT_ROUND", code });
		}
	};

	const getHintedCodes = (cards: string[], showHint: boolean): string[] => {
		return showHint ? cards.slice(0, Math.ceil(cards.length / 2)) : [];
	};

	return (
		<>
			<AnimatePresence>
				{!state.isPlaying && <Menu score={state.score} startNewGame={startGame} />}
			</AnimatePresence>
			<div className="game">
				<header className="game__header">
					<h1 className="game__heading">Memory card</h1>
				</header>
				<section className="game__main">
					{state.error ? (
						<p>{state.error}</p>
					) : state.loading ? (
						<LoadingSpinner />
					) : (
						<Cards
							cards={state.cards}
							onCardClick={handleCardClick}
							hintedCodes={getHintedCodes(state.chosenCards, state.showHint)}
							isPlaying={state.isPlaying}
						/>
					)}
				</section>
				<footer className="game__footer">
					<Controls
						score={state.score}
						highScore={state.highScore}
						isHintShowing={state.showHint}
						setShowHint={showHint}
						endGame={endGame}
					/>
				</footer>
			</div>
		</>
	);
};

export default Game;
