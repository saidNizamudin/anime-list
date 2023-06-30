/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ClxType = {
	id: number;
	title: string;
};

type CollectionCardProps = {
	data: ClxType;
	onClick: () => void;
};

export default function CollectionCard({ data, onClick }: CollectionCardProps) {
	return (
		<div
			css={css`
				height: fit-content;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				padding: 1em;
				background-color: #bbdefb;
				border-radius: 8px;
				cursor: pointer;
				transition: all 0.2s ease-in-out;
				&:hover {
					background-color: #84bbe7;
				}
			`}
			key={data.id}
			onClick={onClick}>
			<FontAwesomeIcon
				icon={faFolderOpen}
				css={css`
					width: 20px;
					height: 20px;
					margin-right: 1em;
				`}
			/>
			<span>{data.title}</span>
		</div>
	);
}
