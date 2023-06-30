export const setCollection = (payload: any) => ({
	type: 'SET_COLLECTION',
	payload,
});

export const setCollectionToAnime = (payload: any) => ({
	type: 'SET_COLLECTION_TO_ANIME',
	payload,
});

export const setAnimeToCollection = (payload: any) => ({
	type: 'SET_ANIME_TO_COLLECTION',
	payload,
});

export const addCollection = (payload: any) => ({
	type: 'ADD_COLLECTION',
	payload,
});

export const addCollectionToAnime = (payload: any) => ({
	type: 'ADD_COLLECTION_TO_ANIME',
	payload,
});

export const addAnimeToCollection = (payload: any) => ({
	type: 'ADD_ANIME_TO_COLLECTION',
	payload,
});

export const removeCollection = (payload: any) => ({
	type: 'REMOVE_COLLECTION',
	payload,
});

export const removeAnimeFromCollection = (payload: any) => ({
	type: 'REMOVE_ANIME_FROM_COLLECTION',
	payload,
});

export const renameCollection = (payload: any) => ({
	type: 'RENAME_COLLECTION',
	payload,
});
