type CardImagesData = {
	svg: string;
	png: string;
};

export type CardData = {
	code: string;
	image: string;
	images: CardImagesData;
	value: string;
	suit: string;
};

export type CardsData = {
	success: boolean;
	deck_id: string;
	cards: CardData[];
	remaining: number;
};
