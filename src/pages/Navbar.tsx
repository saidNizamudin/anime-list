/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Text } from '../components';
import { SizeEnums } from '../enums';

function Navbar() {
	const navigate = useNavigate();

	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				gap: 0.5em;
				margin-bottom: 0.5em;
			`}>
			<Text
				size={SizeEnums.L}
				color="white"
				style={css`
					font-weight: 500;
					padding: 0.25em 0.5em;
					background: #212121;
					border-radius: 8px;
					width: 100%;
					display: flex;
					justify-content: center;
					cursor: pointer;
					transition: all 0.2s ease-in-out;
					&:hover {
						background-color: #1565c0;
					}
				`}
				onClick={() => {
					navigate('/');
				}}>
				Anime List
			</Text>
			<Text
				size={SizeEnums.L}
				color="white"
				style={css`
					font-weight: 500;
					padding: 0.25em 0.5em;
					background: #212121;
					border-radius: 8px;
					width: 100%;
					display: flex;
					justify-content: center;
					cursor: pointer;
					transition: all 0.2s ease-in-out;
					&:hover {
						background-color: #1565c0;
					}
				`}
				onClick={() => {
					navigate('/collections');
				}}>
				Collection list
			</Text>
		</div>
	);
}

export default Navbar;
