/** @jsxImportSource @emotion/react */
import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { faFolderOpen, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { GET_ANIME_BY_ID } from '../clients/anime';
import { Button, CollectionCard, Text, TextInput } from '../components';
import { SizeEnums } from '../enums';
import {
	addAnimeToCollection,
	addCollection,
	addCollectionToAnime,
	setCollection,
	setCollectionToAnime,
} from '../redux/actions/collectionActions';
import storage from '../utilities/storage';
import renderHtmlAsText from '../utilities/string';

function Anime() {
	const [newCollectionName, setNewCollectionName] = useState('');
	const [searchCollectionName, setSearchCollectionName] = useState('');

	const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
	const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(false);

	const { id } = useParams<{ id: string }>();

	const collectionList = useSelector((state: any) => state.collection.collection);
	const collectionToAnime = useSelector((state: any) => state.collection.collectionToAnime).find(
		(anime: any) => anime.animeId == id
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data, loading, error } = useQuery(GET_ANIME_BY_ID, {
		variables: {
			id: id,
		},
	});

	const checkUniqueClxName = (name: string) => {
		return !collectionList.find(
			(collection: any) => collection.title.toLowerCase() == name.toLowerCase()
		);
	};

	const handleCreateCollection = () => {
		if (newCollectionName == '') {
			toast.error('Collection name cannot be empty');
			return;
		} else if (
			!checkUniqueClxName(newCollectionName) ||
			!/^[a-zA-Z0-9\s]+$/.test(newCollectionName)
		) {
			toast.error('Collection name must be unique and only contain alphanumeric characters');
			return;
		} else {
			const newId = uuidv4();
			dispatch(addCollection({ id: newId, title: newCollectionName }));
			dispatch(
				addCollectionToAnime({
					collectionId: newId,
					animeId: id,
				})
			);
			dispatch(
				addAnimeToCollection({
					anime: {
						id: id,
						title: data.Media.title.romaji,
						image: data.Media.coverImage.extraLarge,
					},
					collectionId: newId,
				})
			);
			setShowNewCollectionModal(false);
			setNewCollectionName('');
		}
	};

	const handleAddToCollection = (collection: any) => () => {
		dispatch(
			addCollectionToAnime({
				collectionId: collection.id,
				animeId: id,
			})
		);
		dispatch(
			addAnimeToCollection({
				anime: {
					id: id,
					title: data.Media.title.romaji,
					image: data.Media.coverImage.extraLarge,
				},
				collectionId: collection.id,
			})
		);
		setShowAddToCollectionModal(false);
		setSearchCollectionName('');
	};

	useEffect(() => {
		if (data) {
			const clxList: any = storage.get('collection', []);
			const clxToAnime: any = storage.get('collectionToAnime', []);
			dispatch(setCollection(clxList));
			dispatch(setCollectionToAnime(clxToAnime));
		}
	}, [data]);

	if (loading) {
		return <LoopCircleLoading size="large" color="#212121" />;
	}

	if (error) {
		return <p>Error :(</p>;
	}

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				align-items: center;
			`}>
			<div
				css={css`
					margin-bottom: 1em;
					position: relative;
				`}>
				<Text
					size={SizeEnums.L}
					color="#212121"
					style={css`
						margin-left: 0.5em;
						box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
						padding: 0.25em 0.5em;
						border-radius: 8px;
						background: #f5f5f5;
						top: 0.5em;
						right: 0.5em;
						position: absolute;
						text-align: left;
						word-break: break-word;
						font-weight: 600;
					`}>
					{data.Media.title.romaji}
				</Text>
				<img
					css={css`
						border-radius: 8px;
						width: 100%;
						object-fit: cover;
					`}
					src={
						data.Media.coverImage.extraLarge ||
						'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg'
					}
					alt={data.Media.title.romaji}
				/>
				<Button
					type="Secondary"
					style={css`
						margin: 1em 0 0.5em 0;
						width: -webkit-fill-available;
					`}
					onClick={() => {
						setShowAddToCollectionModal(true);
					}}>
					Add to existing collection
				</Button>
				<Button
					type="Secondary"
					style={css`
						margin-bottom: 1em;
						width: -webkit-fill-available;
					`}
					onClick={() => {
						setShowNewCollectionModal(true);
					}}>
					<FontAwesomeIcon
						icon={faPlusCircle}
						css={css`
							font-size: 2em;
							margin-right: 0.25em;
						`}
					/>
					Create new collection
				</Button>
				<div
					css={css`
						align-self: flex-start;
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						width: 100%;
						height: fit-content;
						max-height: 500px;
					`}>
					<Text
						size={SizeEnums.M}
						color="#212121"
						style={css`
							font-weight: 600;
							text-decoration: underline;
						`}>
						Genres:
					</Text>
					<div
						css={css`
							width: 100%;
							display: grid;
							grid-template-columns: repeat(4, 1fr);
							gap: 0.5em;
							margin-bottom: 1em;
						`}>
						{data.Media.genres.map((genre: string) => {
							return (
								<Text
									size={SizeEnums.M}
									color="white"
									style={css`
										font-weight: 400;
										padding: 0.25em 0.5em;
										border-radius: 8px;
										background: #1976d2;
										box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
									`}>
									{genre}
								</Text>
							);
						})}
					</div>
					<Text
						size={SizeEnums.M}
						color="#212121"
						style={css`
							font-weight: 600;
							text-decoration: underline;
						`}>
						Description:
					</Text>
					<Text
						size={SizeEnums.M}
						color="#212121"
						style={css`
							white-space: pre-line;
							max-height: 100%;
							overflow-y: auto;
							text-align: justify;
							&::-webkit-scrollbar {
								width: 6px;
								background-color: transparent;
							}
							&::-webkit-scrollbar-thumb {
								background-color: #c0c0c0;
								border-radius: 3px;
							}
							&::-webkit-scrollbar-thumb:hover {
								background-color: #a0a0a0;
							}
							padding-right: 0.5em;
						`}>
						{renderHtmlAsText(data.Media.description)}
					</Text>
				</div>
			</div>
			<div
				css={css`
					width: 100%;
					margin-bottom: 2em;
				`}>
				{collectionToAnime?.collection?.length > 0 ? (
					<div
						css={css`
							display: flex;
							width: -webkit-fill-available;
							flex-direction: column;
						`}>
						<Text
							size={SizeEnums.L}
							color="#212121"
							style={css`
								font-weight: 600;
							`}>
							Anime is in the following collections:
						</Text>
						<div
							css={css`
								display: grid;
								grid-template-columns: repeat(2, 1fr);
								gap: 1em;
								margin-top: 0.5em;
							`}>
							{collectionToAnime.collection.map((collectionId: number) => {
								const collection = collectionList.find(
									(collection: any) => collection.id == collectionId
								);
								return (
									<div
										key={collection.id}
										css={css`
											display: flex;
											flex-direction: row;
											align-items: center;
											justify-content: center;
											color: #212121;
											font-weight: 400;
											background-color: #bbdefb;
											cursor: pointer;
											box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
											padding: 0.5em;
											border-radius: 8px;
											transition: all 0.2s ease-in-out;
											&:hover {
												background-color: #84bbe7;
												color: white;
											}
										`}
										onClick={() => {
											navigate(`/collection/${collection.id}`);
										}}>
										<FontAwesomeIcon
											icon={faFolderOpen}
											css={css`
												width: 20px;
												height: 20px;
												margin-right: 0.5em;
											`}
										/>
										{collection.title}
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<Text
						size={SizeEnums.L}
						color="#212121"
						style={css`
							font-weight: 600;
						`}>
						Anime is not in any collection
					</Text>
				)}
			</div>
			<Modal
				open={showNewCollectionModal}
				onClose={() => {
					setShowNewCollectionModal(false);
				}}>
				<div
					css={css`
						width: 300px;
						height: 35%;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						background-color: white;
						border-radius: 8px;
						padding: 1.5em 1em;
						display: flex;
						flex-direction: column;
						align-items: center;
						outline: none;
					`}>
					<Text
						size={SizeEnums.XL}
						color="#212121"
						style={css`
							font-weight: 600;
							margin-bottom: 1em;
							text-decoration: underline;
						`}>
						Create New Collection Form
					</Text>
					<TextInput
						onChange={(e) => {
							setNewCollectionName(e.target.value);
						}}
						placeholder="Input collection name here..."
						value={newCollectionName}
					/>
					<Text
						size={SizeEnums.M}
						color="#212121"
						style={css`
							display: flex;
							font-weight: 600;
							flex-direction: row;
							align-self: flex-start;
							break-word: break-all;
							align-items: center;
						`}>
						Collection Name must be
					</Text>
					<Text
						size={SizeEnums.S}
						color="#212121"
						style={css`
							align-self: flex-start;
						`}>
						Filled
					</Text>
					<Text
						size={SizeEnums.S}
						color="#212121"
						style={css`
							align-self: flex-start;
						`}>
						Unique from other collection
					</Text>
					<Text
						size={SizeEnums.S}
						color="#212121"
						style={css`
							align-self: flex-start;
						`}>
						Only contain alphanumeric characters
					</Text>
					<Button
						type="Primary"
						style={css`
							margin-top: auto;
							width: -webkit-fill-available;
						`}
						onClick={handleCreateCollection}>
						Create
					</Button>
				</div>
			</Modal>
			<Modal
				open={showAddToCollectionModal}
				onClose={() => {
					setShowAddToCollectionModal(false);
				}}>
				<div
					css={css`
						width: 350px;
						height: 80%;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						background-color: white;
						border-radius: 8px;
						padding: 1.5em 1em;
						display: flex;
						flex-direction: column;
						align-items: center;
						outline: none;
					`}>
					<Text
						size={SizeEnums.L}
						color="#212121"
						style={css`
							font-weight: 600;
							margin-bottom: 1em;
							text-decoration: underline;
						`}>
						Choose Collection
					</Text>
					<div
						css={css`
							width: 100%;
							position: relative;
							background: #f5f5f5;
							border-radius: 8px;
							margin-bottom: 1em;
							box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
						`}>
						<FontAwesomeIcon
							icon={faSearch}
							css={css`
								color: #9e9e9e;
								width: 20px;
								height: 20px;
								position: absolute;
								top: 50%;
								right: 1em;
								transform: translateY(-50%);
							`}
						/>
						<input
							type="text"
							placeholder={'Search Collection...'}
							onChange={(e) => {
								setSearchCollectionName(e.target.value);
							}}
							value={searchCollectionName}
							css={css`
								width: 100%;
								border: none;
								outline: none;
								background: transparent;
								font-size: 16px;
								font-weight: 400;
								color: #212121;
								padding: 1em;
								&::placeholder {
									color: #9e9e9e;
								}
							`}
						/>
					</div>
					<div
						css={css`
							width: 100%;
							height: fit-content;
							max-height: 100%;
							overflow-y: auto;
							&::-webkit-scrollbar {
								width: 6px;
								background-color: transparent;
							}
							&::-webkit-scrollbar-thumb {
								background-color: #c0c0c0;
								border-radius: 3px;
							}
							&::-webkit-scrollbar-thumb:hover {
								background-color: #a0a0a0;
							}
							display: grid;
							grid-template-columns: 1fr 1fr;
							gap: 0.5em;
						`}>
						{collectionList
							.filter((collection: any) => {
								return (
									!collectionToAnime?.collection?.find(
										(collectionToAnime: any) => collectionToAnime == collection.id
									) && collection.title.toLowerCase().includes(searchCollectionName.toLowerCase())
								);
							})
							.map((collection: any) => {
								return (
									<CollectionCard data={collection} onClick={handleAddToCollection(collection)} />
								);
							})}
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default Anime;
