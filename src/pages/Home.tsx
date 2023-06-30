/** @jsxImportSource @emotion/react */
import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { GET_ANIME_LIST } from '../clients/anime';
import { Button, Text } from '../components';
import AnimeCard from '../components/AnimeCard';
import { SizeEnums } from '../enums';

type MediaType = {
	id: number;
	title: {
		romaji: string;
		english: string;
	};
	coverImage: {
		extraLarge: string;
	};
};

function Home() {
	const [displayedData, setDisplayedData] = useState<MediaType[]>([]);
	const [firstRender, setFirstRender] = useState<boolean>(true);
	const [search, setSearch] = useState<string>('');
	const [page, setPage] = useState<number>(1);

	const { data, loading, error } = useQuery(GET_ANIME_LIST, {
		variables: {
			search: search || null,
			page: page,
			perPage: 10,
		},
	});

	const handleLoadMore = () => {
		setPage(page + 1);
	};

	useEffect(() => {
		if (data) {
			setDisplayedData([...displayedData, ...data.Page.media]);
			setFirstRender(false);
		}
	}, [data]);

	if (loading && firstRender) {
		return <LoopCircleLoading size="large" color="#212121" />;
	}

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
					Anime List
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
							setPage(1);
							setDisplayedData([]);
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
				{displayedData.map((data: MediaType) => {
					return (
						<AnimeCard
							key={data.id}
							data={{
								id: data.id,
								title: data.title.romaji,
								coverImage: data.coverImage.extraLarge,
							}}></AnimeCard>
					);
				})}
			</div>
			<Button
				type="Primary"
				onClick={handleLoadMore}
				style={css`
					margin: 1em 0;
					width: -webkit-fill-available;
				`}>
				<span>{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Load More'}</span>
			</Button>
		</div>
	);
}

export default Home;
