/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from '@emotion/react';
import { ReactNode } from 'react';
import { SizeEnums } from '../enums';

export type TextProps = {
	color?: string;
	children?: ReactNode;
	size?: SizeEnums;
	style?: SerializedStyles;
	onClick?: () => void;
};

export default function Text({ color = 'black', size, children, style, onClick }: TextProps) {
	return (
		<span
			onClick={onClick}
			css={css`
				color: ${color};
				font-size: ${size};
				${style}
			`}>
			{children}
		</span>
	);
}
