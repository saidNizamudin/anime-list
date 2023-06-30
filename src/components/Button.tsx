/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from '@emotion/react';
import React from 'react';

type ButtonProps = {
	onClick?: () => void;
	type: 'Primary' | 'Secondary' | 'Danger' | 'Disabled';
	children: React.ReactNode;
	style?: SerializedStyles;
};

export default function Button({ onClick, type, children, style }: ButtonProps) {
	const colorStyle = (type: 'Primary' | 'Secondary' | 'Danger' | 'Disabled') => {
		switch (type) {
			case 'Primary':
				return css`
					background-color: #2196f3;
					border: 2px solid #2196f3;
					color: white;
					&:hover {
						background-color: #e3f2fd;
						border: 2px solid #1976d2;
						color: #1976d2;
					}
				`;
			case 'Secondary':
				return css`
					background-color: white;
					border: 2px solid #2196f3;
					color: #2196f3;
					&:hover {
						background-color: #e3f2fd;
						border: 2px solid #1976d2;
						color: #1976d2;
					}
				`;
			case 'Danger':
				return css`
					background-color: white;
					border: 2px solid #f44336;
					color: #f44336;
					&:hover {
						background-color: #f44336;
						border: 2px solid #f44336;
						color: white;
					}
				`;
			default:
				return;
		}
	};

	return (
		<button
			disabled={type == 'Disabled'}
			css={css`
				width: fit-content;
				cursor: pointer;
				font-size: 1em;
				border-radius: 5px;
				padding: 0.5em 1.5em;
				transition: all 0.2s ease-in-out;
				outline: none;
				display: flex;
				align-items: center;
				justify-content: center;
				&:disabled {
					background-color: #e5e5e5;
					border: 2px solid #e5e5e5;
					cursor: not-allowed;
					color: black;
				}
				${colorStyle(type)}
				${style}
			`}
			onClick={
				type == 'Disabled'
					? () => {
							return;
					  }
					: onClick
			}>
			{children}
		</button>
	);
}
