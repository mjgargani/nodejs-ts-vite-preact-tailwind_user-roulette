import React from 'preact/compat';
import type Preact from 'preact';
import { h } from 'preact';
import { useTranslation, withTranslation } from 'react-i18next';

import '@/app.css';
import { current, handle } from '@/components/signals';
import MainContainer from '@/components/templates/MainContainer';
import Seed from '@/components/atom/Seed';
import Swipe from '@/components/atom/Swipe';
import Roulette from '@/components/molecules/Roulette';

import '@/classes/retrieveData';

function App() {
	handle.i18next(useTranslation());
	const { t } = current.i18next.value;

	return (
		<MainContainer>
			<Seed />
			<Swipe />
			<Roulette />
		</MainContainer>
	);
}

export default withTranslation()(App);
