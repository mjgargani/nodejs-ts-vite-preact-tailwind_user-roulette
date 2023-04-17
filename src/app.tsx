import React, { useRef } from 'preact/compat';
import type Preact from 'preact';
import { h } from 'preact';
import { useTranslation, withTranslation } from 'react-i18next';

import { handle } from '@/components/signals';
import MainContainer from '@/components/templates/MainContainer';
import Seed from '@/components/atom/Seed';
import Swipe from '@/components/atom/Swipe';
import Roulette from '@/components/molecules/Roulette';

import '@/classes/retrieveData';

import clickMp3 from '@/assets/click.mp3';
import clickWav from '@/assets/click.wav';
import clickOgg from '@/assets/click.ogg';
import Audio from './components/atom/Audio';
import Filters from './components/atom/Filters';

function App() {
	handle.i18next(useTranslation());

	return (
		<MainContainer>
			<Audio
				name="click"
				src={[
					['mp3', clickMp3],
					['wav', clickWav],
					['ogg', clickOgg],
				]}
			/>
			<Filters />
			<Seed />
			<Swipe />
			<Roulette />
		</MainContainer>
	);
}

export default withTranslation()(App);
