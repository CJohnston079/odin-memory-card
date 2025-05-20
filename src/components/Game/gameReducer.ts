import type { CardData } from "@/types/CardData";
import { shuffle } from "@/components/Cards/cardUtils";

export type GameState = {
	cards: CardData[];
	loading: boolean;
	error: string | null;
	score: number;
	showHint: boolean;
	chosenCards: string[];
	isPlaying: boolean;
};

export type GameAction =
	| { type: "FETCH_START" }
	| { type: "FETCH_SUCCESS"; cards: CardData[] }
	| { type: "FETCH_ERROR"; error: string }
	| { type: "START_GAME" }
	| { type: "END_GAME" }
	| { type: "NEXT_ROUND"; code: string }
	| { type: "SHOW_HINT" };

export const initialState: GameState = {
	cards: [],
	loading: true,
	error: null,
	score: 0,
	showHint: false,
	chosenCards: [],
	isPlaying: true,
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
	switch (action.type) {
		case "FETCH_START":
			return { ...state, loading: true, error: null };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, cards: action.cards };
		case "FETCH_ERROR":
			return { ...state, loading: false, error: action.error };
		case "START_GAME":
			return {
				...state,
				score: 0,
				chosenCards: [],
				showHint: false,
				isPlaying: true,
			};
		case "END_GAME":
			return { ...state, isPlaying: false, showHint: false };
		case "NEXT_ROUND": {
			const updatedChosen = [...state.chosenCards, action.code];
			const updatedScore = state.score + 1;

			return {
				...state,
				score: updatedScore,
				chosenCards: updatedChosen,
				isPlaying: updatedScore === state.cards.length ? false : state.isPlaying,
				cards: shuffle(state.cards),
				showHint: false,
			};
		}
		case "SHOW_HINT":
			return { ...state, showHint: true };
		default:
			return state;
	}
};
