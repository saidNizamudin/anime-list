/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faPencilAlt, faPlus, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Button, Text, TextInput } from '../components';
import { SizeEnums } from '../enums';
import {
	addCollection,
	removeCollection,
	renameCollection,
	setAnimeToCollection,
	setCollection,
} from '../redux/actions/collectionActions';
import storage from '../utilities/storage';

function CollectionList() {
	const [search, setSearch] = useState('');
	const [newCollectionName, setNewCollectionName] = useState('');
	const [editedCollectionName, setEditedCollectionName] = useState('');

	const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
	const [showDeleteCollectionModal, setShowDeleteCollectionModal] = useState(false);
	const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);

	const [selectedCollectionToDelete, setSelectedCollectionToDelete] = useState(null);
	const [selectedCollectionToEdit, setSelectedCollectionToEdit] = useState(null);

	const collectionList = useSelector((state: any) => state.collection.collection);
	const animeToCollection = useSelector((state: any) => state.collection.animeToCollection);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const clxList = storage.get('collection', []);
		const animeToClx = storage.get('animeToCollection', []);
		dispatch(setCollection(clxList));
		dispatch(setAnimeToCollection(animeToClx));
	}, []);

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
			setShowNewCollectionModal(false);
			setNewCollectionName('');
		}
	};

	const handleRemoveCollection = () => {
		dispatch(removeCollection(selectedCollectionToDelete));
		setShowDeleteCollectionModal(false);
		setSelectedCollectionToDelete(null);
	};

	const handleRenameCollection = () => {
		if (editedCollectionName == '') {
			toast.error('Collection name cannot be empty');
			return;
		} else if (
			!checkUniqueClxName(editedCollectionName) ||
			!/^[a-zA-Z0-9\s]+$/.test(editedCollectionName)
		) {
			toast.error('Collection name must be unique and only contain alphanumeric characters');
			return;
		} else {
			dispatch(
				renameCollection({
					id: selectedCollectionToEdit,
					title: editedCollectionName,
				})
			);
			setShowEditCollectionModal(false);
			setSelectedCollectionToEdit(null);
			setEditedCollectionName('');
		}
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
					Collection List
				</Text>
				<div
					css={css`
						width: 100%;
						display: grid;
						grid-template-columns: 7fr 1fr;
						gap: 0.5em;
					`}>
					<div
						css={css`
							width: 100%;
							position: relative;
							background: #f5f5f5;
							border-radius: 8px;
							box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
							height: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
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
							placeholder={'Search Category...'}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							value={search}
							css={css`
								width: 100%;
								border: none;
								padding: 1em;
								outline: none;
								background: transparent;
								font-size: 16px;
								font-weight: 400;
								color: #212121;
								&::placeholder {
									color: #9e9e9e;
								}
							`}
						/>
					</div>
					<div
						css={css`
							width: 100%;
							position: relative;
							background: #212121;
							border-radius: 8px;
							box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
							height: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: center;
							cursor: pointer;
							transition: 0.3s all ease-in-out;
							&:hover {
								transform: scale(1.1);
							}
						`}>
						<FontAwesomeIcon
							icon={faPlus}
							css={css`
								color: white;
								width: 30px;
								height: 30px;
							`}
							onClick={() => {
								setShowNewCollectionModal(true);
							}}
						/>
					</div>
				</div>
			</div>
			<div
				css={css`
					width: 100%;
					display: flex;
					flex-direction: column;
				`}>
				{collectionList
					.filter((data: any) => {
						return data.title.toLowerCase().includes(search.toLowerCase());
					})
					.map((data: any) => {
						return (
							<div
								css={css`
									position: relative;
									display: flex;
									height: 150px;
									justify-content: center;
									align-items: center;
									width: -webkit-fill-available;
									background: #212121;
									margin-bottom: 1em;
									padding: 1em;
									border-radius: 8px;
									box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
									cursor: pointer;
									transition: 0.3s all ease-in-out;
									&:hover {
										background: #000000;
									}
								`}
								key={data.id}
								onClick={() => {
									navigate(`/collection/${data.id}`);
								}}>
								<Text
									size={SizeEnums.XXXL}
									color={'white'}
									style={css`
										font-weight: 600;
										text-transform: uppercase;
										z-index: 1;
										word-break: break-word;
									`}>
									{data.title}
								</Text>
								<img
									src={
										animeToCollection.find((item: any) => item.collectionId === data.id)?.anime[0]
											?.image ||
										'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg'
									}
									alt=""
									css={css`
										position: absolute;
										top: 0;
										right: 0;
										width: 100%;
										height: 100%;
										object-fit: cover;
										border-radius: 8px;
										opacity: 0.5;
									`}
								/>
								<div
									css={css`
										display: flex;
										flex-direction: column;
										gap: 0.5em;
										position: absolute;
										bottom: 0.5em;
										right: 0.5em;
									`}>
									<FontAwesomeIcon
										icon={faTrashAlt}
										css={css`
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
											setShowDeleteCollectionModal(true);
											setSelectedCollectionToDelete(data.id);
										}}
									/>
									<FontAwesomeIcon
										icon={faPencilAlt}
										css={css`
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
											setShowEditCollectionModal(true);
											setSelectedCollectionToEdit(data.id);
											setEditedCollectionName(data.title);
										}}
									/>
								</div>
							</div>
						);
					})}
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
				open={showDeleteCollectionModal}
				onClose={() => {
					setShowDeleteCollectionModal(false);
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
						Are you sure you want to delete this collection?
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
								setShowDeleteCollectionModal(false);
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
			<Modal
				open={showEditCollectionModal}
				onClose={() => {
					setShowEditCollectionModal(false);
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
						Edit Collection Form
					</Text>
					<TextInput
						onChange={(e) => {
							setEditedCollectionName(e.target.value);
						}}
						placeholder="Input your new collection name here..."
						value={editedCollectionName}
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
						New Collection Name must be
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
						onClick={handleRenameCollection}>
						Rename
					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default CollectionList;
