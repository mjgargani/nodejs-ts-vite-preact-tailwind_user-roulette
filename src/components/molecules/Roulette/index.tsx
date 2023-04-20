import React from 'preact/compat';

import CardItem from '@/components/atom/RouletteItem';
import { current, handle } from '@/components/signals';
import { effect, signal } from '@preact/signals';
import './styles.css';

const spinRoulette = signal<NodeJS.Timer | undefined>(undefined);

effect(() => {
	if (current.spin.value) {
		spinRoulette.value = setInterval(() => {
			if (current?.audio?.value?.click) {
				current.audio.value.click.currentTime = 0;
				current.audio.value.click.play();
			}

			handle.angle(current.angle.value + 30);
		}, 150);
	} else if (spinRoulette.value) {
		clearInterval(spinRoulette.value);
	}
});

function Roulette() {
	const users = current.users.results.value;

	return (
		<div
			id="roulette-container"
			class={`m-0 flex justify-center`}
			style={{
				transition: 'all 2s',
			}}
			onClick={() => handle.show(false)}
		>
			{users?.map((el, i) => (
				<CardItem
					key={`user-card-${i}-${el.angle}`}
					id={`user-card-${el.angle}`}
					testId={`test-user-card-${el.angle}`}
					angle={el.angle}
					user={el}
				/>
			))}
		</div>
	);
}

export default Roulette;
