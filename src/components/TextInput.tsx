/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

type TextInputProps = {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	value: string;
};

export default function TextInput({ onChange, placeholder, value }: TextInputProps) {
	return (
		<input
			type="text"
			onChange={onChange}
			placeholder={placeholder}
			value={value}
			css={css`
				width: -webkit-fill-available;
				border-radius: 8px;
				padding: 1em;
				background: white;
				box-shadow: 0 3px 11px #0000001a, 0 3px 6px #00000026;
				outline: none;
				border: none;
				margin-bottom: 0.25em;
			`}
		/>
	);
}
