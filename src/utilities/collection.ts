type AnimeClxListType = {
	animeId: number;
	collection: number[];
};

type ClXListType = {
	id: number;
	name: string;
};

export default function splitClxList(
	clxList: ClXListType[],
	animeClxType: AnimeClxListType[],
	animeId: number
): {
	unselectedClxList: number[];
	selectedClxList: number[];
} {
	const selectedClxList: number[] =
		animeClxType.filter((animeClx) => animeClx.animeId === animeId)[0]?.collection || [];

	const unselectedClxList: number[] = clxList
		.filter((clx) => !selectedClxList.some((selectedClx) => selectedClx === clx.id))
		.map((clx) => clx.id);

	return { unselectedClxList, selectedClxList };
}
