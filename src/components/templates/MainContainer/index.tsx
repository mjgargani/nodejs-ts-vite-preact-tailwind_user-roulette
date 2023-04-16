import React from 'preact/compat';

import type Preact from 'preact';
import './styles.css';
import { current } from '@/components/signals';

const MainContainer: Preact.FunctionComponent = ({ children }) => (
	<div id="main-container" class={current.loading.value ? '!cursor-wait' : ''}>
		{children}
	</div>
);

export default MainContainer;
