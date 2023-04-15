import React, { TargetedEvent } from 'preact/compat';
import type Preact from 'preact';

import { h } from 'preact';
import RandomUser from './classes/RandomUser';
import MainContainer from './components/MainContainer';
import { User, type RandomUserResponse } from './classes/types';
import { nanoid } from 'nanoid';
import { withTranslation } from 'react-i18next';
import { computed, effect, signal } from '@preact/signals';
import CardItem from './components/atom/CardItem';

export const signals = {
	loading: signal<boolean>(false),
	seed: signal<string>('123'),
	angle: signal<number>(0),
	users: {
		results: signal<User[] | null>(null),
	},
};

export const current = {
	loading: computed(() => signals.loading.value),
	seed: computed(() => signals.seed.value),
	angle: computed(() => signals.angle.value),
	users: {
		results: computed(() => signals.users.results.value),
	},
};

export const handle = {
	loading: (start: true) => start && (signals.loading.value = start),
	seed: ({ target }: any) => !!target.value && (signals.seed.value = target.value),
	angle: (deg: number) => !!deg && (signals.angle.value = deg),
	users: {
		results: (data: User[]) => data && (signals.users.results.value = data),
	},
};

const retriveUsers = effect(() => {
	const data: RandomUser = new RandomUser({
		results: 12,
		seed: signals.seed.value,
		format: 'json',
		nat: ['br'],
		exc: ['registered', 'id'],
	});

	data
		.retrieve()
		.then((response) => {
			handle.users.results((response as RandomUserResponse).results);
		})
		.catch((error) => {
			console.error(error);
		});
});

retriveUsers();

setInterval(() => {
	handle.angle(current.angle.value + 30);
}, 1000);

function App() {
	return (
		<MainContainer>
			<div class="absolute bottom-0 max-h-min max-md:flex max-md:flex-col md:whitespace-nowrap">
				<p>Angle: {signals.angle}</p>
				<label for="seed" class="mr-2 min-w-full text-center">
					Seed:
				</label>
				<input
					id="seed"
					type="text"
					value={signals.seed}
					onChange={handle.seed}
					class={`mr-2 ${current.loading ? 'cursor-not-allowed' : ''}`}
					disabled={current.loading}
					data-testid="test-input-seed"
				/>
				<button
					onClick={() => {
						handle.loading(true);
						handle.seed({ target: { value: nanoid() } });
					}}
					disabled={current.loading}
					class={current.loading ? 'cursor-not-allowed' : ''}
					data-testid="test-btn-random-seed"
				>
					🎲
				</button>
			</div>

			<CardItem angle={0} user={current.users.results?.value?.[0]} />
			<CardItem angle={30} user={current.users.results?.value?.[1]} />
			<CardItem angle={60} user={current.users.results?.value?.[2]} />
			<CardItem angle={90} user={current.users.results?.value?.[3]} />
			<CardItem angle={120} user={current.users.results?.value?.[4]} />
			<CardItem angle={150} user={current.users.results?.value?.[5]} />
			<CardItem angle={180} user={current.users.results?.value?.[6]} />
			<CardItem angle={210} user={current.users.results?.value?.[7]} />
			<CardItem angle={240} user={current.users.results?.value?.[8]} />
			<CardItem angle={270} user={current.users.results?.value?.[9]} />
			<CardItem angle={300} user={current.users.results?.value?.[10]} />
			<CardItem angle={330} user={current.users.results?.value?.[11]} />

			<div class="fixed -top-24 z-20 flex h-1/4 w-1/12 origin-top rounded-full bg-violet-100 shadow-lg" />
		</MainContainer>
	);
}

export default withTranslation()(App);
