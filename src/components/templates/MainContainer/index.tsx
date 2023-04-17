import React from 'preact/compat';

import type Preact from 'preact';
import './styles.css';
import { current, handle } from '@/components/signals';
import { type ComponentChildren } from 'preact';

type MainContainerProps = {
	children: ComponentChildren;
};

function MainContainer({ children }: MainContainerProps) {
	return (
		<div
			id="main-container"
			class={`${current.loading.value ? '!cursor-wait' : ''}`}
			onClick={() => handle.show(false)}
		>
			{children}
		</div>
	);
}

export default MainContainer;
