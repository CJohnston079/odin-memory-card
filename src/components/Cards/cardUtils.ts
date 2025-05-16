import type { CardData } from "@/types/CardData";

export const generateCards = (): CardData[] => {
	const suits = ["♣️", "♦️", "♠️", "♥️"];
	const values = Array.from({ length: 10 }, (_, i) => i + 1);
	const deck = suits.flatMap(suit => values.map(v => `${v} ${suit}`));
	const shuffled = shuffle(deck);
	return Array.from({ length: 12 }, (_, i) => ({ id: i, name: shuffled[i] }));
};

export const shuffle = <T>(arr: T[]): T[] => {
	const shuffled = [...arr];
	do {
		shuffled.sort(() => Math.random() - 0.5);
	} while (shuffled.some((item, i) => item === arr[i]));
	return shuffled;
};
