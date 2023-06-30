/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Text } from '../components';
import { SizeEnums } from '../enums';

type AnimeCardProps = {
	data: {
		id: number;
		title: string;
		coverImage: string;
	};
};

export default function AnimeCard({ data }: AnimeCardProps) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/${data.id}`);
	};

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
			onClick={handleClick}>
			<img
				src={
					data.coverImage ||
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
		</div>
	);
}
