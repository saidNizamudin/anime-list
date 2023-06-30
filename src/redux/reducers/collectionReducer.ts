import { toast } from 'react-toastify';
import storage from '../../utilities/storage';

type AnimeType = {
	id: number;
	title: string;
	image: string;
};

type CollectionType = {
	id: number;
	title: string;
};

type initialStateType = {
	collection: CollectionType[];
	collectionToAnime: {
		animeId: number;
		collection: CollectionType[];
	}[];
	animeToCollection: {
		collectionId: number;
		anime: AnimeType[];
	}[];
};

const initialState: initialStateType = {
	collection: [],
	collectionToAnime: [],
	animeToCollection: [],
};

const defaultAction: {
	type: string;
	payload: any;
} = {
	type: '',
	payload: null,
};

const collectionReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let selectedCollection:
		| {
				animeId: number;
				collection: CollectionType[];
		  }
		| undefined;
	let selectedAnime:
		| {
				collectionId: number;
				anime: AnimeType[];
		  }
		| undefined;
	let newCollection: any;
	let newCollectionToAnime: any;
	let newAnimeToCollection: any;

	switch (type) {
		case 'SET_COLLECTION':
			return {
				...state,
				collection: payload,
			};

		case 'SET_COLLECTION_TO_ANIME':
			return {
				...state,
				collectionToAnime: payload,
			};

		case 'SET_ANIME_TO_COLLECTION':
			return {
				...state,
				animeToCollection: payload,
			};

		case 'ADD_COLLECTION':
			storage.set('collection', [...state.collection, payload]);
			toast.success('Collection added successfully');
			return {
				...state,
				collection: [...state.collection, payload],
			};

		case 'ADD_COLLECTION_TO_ANIME':
			selectedCollection = state.collectionToAnime.find((item) => item.animeId === payload.animeId);

			if (selectedCollection) {
				selectedCollection.collection = [...selectedCollection.collection, payload.collectionId];
				newCollectionToAnime = [
					...state.collectionToAnime.map((item) => {
						if (item.animeId === payload.animeId) {
							return selectedCollection;
						} else {
							return item;
						}
					}),
				];
			} else {
				newCollectionToAnime = [
					...state.collectionToAnime,
					{
						animeId: payload.animeId,
						collection: [payload.collectionId],
					},
				];
			}

			storage.set('collectionToAnime', newCollectionToAnime);
			toast.success('Anime added to collection successfully');
			return {
				...state,
				collectionToAnime: newCollectionToAnime,
			};

		case 'ADD_ANIME_TO_COLLECTION':
			selectedAnime = state.animeToCollection.find(
				(item) => item.collectionId === payload.collectionId
			);

			if (selectedAnime) {
				selectedAnime.anime = [...selectedAnime.anime, payload.anime];
				newAnimeToCollection = [
					...state.animeToCollection.map((item) => {
						if (item.collectionId === payload.collectionId) {
							return selectedAnime;
						} else {
							return item;
						}
					}),
				];
			} else {
				newAnimeToCollection = [
					...state.animeToCollection,
					{ collectionId: payload.collectionId, anime: [payload.anime] },
				];
			}

			storage.set('animeToCollection', newAnimeToCollection);
			return {
				...state,
				animeToCollection: newAnimeToCollection,
			};

		case 'REMOVE_COLLECTION':
			newCollection = [...state.collection.filter((item) => item.id !== payload)];
			newCollectionToAnime = state.collectionToAnime.map((item) => {
				return {
					...item,
					collection: item.collection.filter((item) => item !== payload),
				};
			});
			newAnimeToCollection = state.animeToCollection.filter(
				(item) => item.collectionId !== payload
			);

			storage.set('collection', newCollection);
			storage.set('collectionToAnime', newCollectionToAnime);
			storage.set('animeToCollection', newAnimeToCollection);
			toast.success('Collection removed successfully');
			return {
				...state,
				collection: newCollection,
				animeToCollection: newAnimeToCollection,
				collectionToAnime: newCollectionToAnime,
			};

		case 'REMOVE_ANIME_FROM_COLLECTION':
			newCollectionToAnime = state.collectionToAnime.map((item) => {
				if (item.animeId === payload.animeId) {
					return {
						...item,
						collection: item.collection.filter((item) => item !== payload.collectionId),
					};
				} else {
					return item;
				}
			});

			newAnimeToCollection = state.animeToCollection.map((item) => {
				if (item.collectionId === payload.collectionId) {
					return {
						...item,
						anime: item.anime.filter((item) => item.id !== payload.animeId),
					};
				} else {
					return item;
				}
			});

			storage.set('collectionToAnime', newCollectionToAnime);
			storage.set('animeToCollection', newAnimeToCollection);
			toast.success('Anime removed from collection successfully');
			return {
				...state,
				collectionToAnime: newCollectionToAnime,
				animeToCollection: newAnimeToCollection,
			};

		case 'RENAME_COLLECTION':
			newCollection = [
				...state.collection.map((item) => {
					if (item.id === payload.id) {
						return payload;
					} else {
						return item;
					}
				}),
			];

			storage.set('collection', newCollection);
			toast.success('Collection renamed successfully');
			return {
				...state,
				collection: newCollection,
			};

		default:
			return state;
	}
};

export default collectionReducer;
