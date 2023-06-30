/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Text } from '../components';
import { SizeEnums } from '../enums';
import {
	removeAnimeFromCollection,
	setAnimeToCollection,
	setCollection,
} from '../redux/actions/collectionActions';
import storage from '../utilities/storage';

function CollectionDetail() {
	const [search, setSearch] = useState<string>('');

	const [showDeleteAnimeModal, setShowDeleteAnimeModal] = useState(false);

	const [selectedAnimeToDelete, setSelectedAnimeToDelete] = useState(null);

	const { id } = useParams<{ id: string }>();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const collectionList = useSelector((state: any) => state.collection.collection);
	const animeToCollection = useSelector((state: any) => state.collection.animeToCollection).find(
		(collection: any) => collection.collectionId == id
	);

	useEffect(() => {
		const clxList: any = storage.get('collection', []);
		const animeToClx: any = storage.get('animeToCollection', []);
		dispatch(setCollection(clxList));
		dispatch(setAnimeToCollection(animeToClx));
	}, []);

	const handleRemoveCollection = () => {
		dispatch(
			removeAnimeFromCollection({
				animeId: selectedAnimeToDelete,
				collectionId: id,
			})
		);
		setShowDeleteAnimeModal(false);
	};

	return (
		<div>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 1em;
				`}>
				<Text
					size={SizeEnums.XXXL}
					color={'#212121'}
					style={css`
						font-weight: 600;
						margin-bottom: 0.25em;
					`}>
					{collectionList.find((collection: any) => collection.id == id)?.title}
				</Text>
				<div
					css={css`
						width: 100%;
						position: relative;
						background: #f5f5f5;
						border-radius: 8px;
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
						placeholder={'Search Anime...'}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						value={search}
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
			</div>
			<div
				css={css`
					width: 100%;
					display: flex;
					flex-direction: column;
				`}>
				{animeToCollection?.anime
					.filter((data: any) => {
						return data?.title.toLowerCase().includes(search.toLowerCase());
					})
					.map((data: any) => {
						return (
							<div
								css={css`
									position: relative;
									border-radius: 4px;
									box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
									display: flex;
									width: 100%;
									flex-direction: column;
									cursor: pointer;
									transition: all 0.3s ease-in-out;
									margin-bottom: 1em;
									&:hover {
										transform: scale(1.02);
									}
								`}
								onClick={() => {
									navigate(`/${data.id}`);
								}}>
								<img
									src={
										data.image ||
										'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg'
									}
									alt={data.title}
									css={css`
										height: 300px;
										border-radius: 4px;
										object-fit: cover;
									`}
								/>
								<Text
									size={SizeEnums.XS}
									color="#212121"
									style={css`
										box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
										padding: 0.25em 0.5em;
										border-radius: 8px;
										background: #f5f5f5;
										top: 1em;
										right: 1em;
										position: absolute;
										text-align: left;
										word-break: break-word;
										font-weight: 600;
									`}>
									{data.title}
								</Text>
								<FontAwesomeIcon
									icon={faTrashAlt}
									css={css`
										position: absolute;
										bottom: 0.5em;
										right: 0.5em;
										width: 20px;
										height: 20px;
										padding: 0.5em;
										border-radius: 8px;
										background: white;
										z-index: 1;
										cursor: pointer;
										transition: 0.3s all ease-in-out;
										&:hover {
											background: #212121;
											color: white;
										}
									`}
									onClick={(e) => {
										e.stopPropagation();
										setShowDeleteAnimeModal(true);
										setSelectedAnimeToDelete(data.id);
									}}
								/>
							</div>
						);
					})}
			</div>
			<Modal
				open={showDeleteAnimeModal}
				onClose={() => {
					setShowDeleteAnimeModal(false);
				}}>
				<div
					css={css`
						width: 300px;
						height: fit-content;
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
							text-align: center;
						`}>
						Are you sure you want to delete this anime?
					</Text>
					<div
						css={css`
							display: grid;
							grid-template-columns: 1fr 1fr;
							gap: 1em;
							width: 100%;
						`}>
						<Button
							type="Danger"
							style={css`
								margin-top: auto;
								width: -webkit-fill-available;
							`}
							onClick={() => {
								setShowDeleteAnimeModal(false);
							}}>
							No
						</Button>
						<Button
							type="Primary"
							style={css`
								margin-top: auto;
								width: -webkit-fill-available;
							`}
							onClick={handleRemoveCollection}>
							Yes
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default CollectionDetail;
