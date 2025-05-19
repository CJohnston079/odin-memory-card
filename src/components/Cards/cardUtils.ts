export const shuffle = <T>(arr: T[]): T[] => {
	const shuffled = [...arr];
	do {
		shuffled.sort(() => Math.random() - 0.5);
	} while (shuffled.some((item, i) => item === arr[i]));
	return shuffled;
};
