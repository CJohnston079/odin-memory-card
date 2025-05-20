export async function getNewDeck(newDeckApi: string, deckApi: string) {
	const deckRes = await fetch(newDeckApi);
	const deckData = await deckRes.json();
	const drawRes = await fetch(`${deckApi}/${deckData.deck_id}/draw/?count=12`);
	return await drawRes.json();
}
