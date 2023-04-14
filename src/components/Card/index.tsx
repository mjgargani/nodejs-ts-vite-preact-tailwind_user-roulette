import React from 'preact/compat';

import { type h, type ComponentChildren } from 'preact';

type CardProps = {
	key?: string;
	id: string | h.JSX.SignalLike<string | undefined>;
	testId: string;
	children: ComponentChildren;
};

function Card({ key, id, testId, children }: CardProps) {
	return (
		<div key={key} id={id} data-testid={testId} class="pointer-events-none min-w-full">
			{children}
		</div>
	);
}

export default Card;
