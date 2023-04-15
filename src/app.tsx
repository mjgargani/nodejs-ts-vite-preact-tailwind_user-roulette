import React, { TargetedEvent } from 'preact/compat';
import type Preact from 'preact';

import { h } from 'preact';
import RandomUser from './classes/RandomUser';
import MainContainer from './components/MainContainer';
import { User, type RandomUserResponse } from './classes/types';
import { nanoid } from 'nanoid';
import { useTranslation, withTranslation } from 'react-i18next';
import { batch, computed, effect, signal } from '@preact/signals';
import CardItem from './components/atom/CardItem';
import './app.css';

const colors = [
	'#E6B0AA',
	'#D7BDE2',
	'#A9CCE3',
	'#AED6F1',
	'#A3E4D7',
	'#A9DFBF',
	'#F9E79F',
	'#EDBB99',
	'#E5E7E9',
	'#E5E7E9',
];

export const signals = {
	loading: signal<boolean>(true),
	seed: signal<string>('1234'),
	angle: signal<number>(0),
	users: {
		results: signal<User[] | null>(null),
	},
	selected: signal<string>(''),
	swipe: signal<number>(1),
	lego: signal<boolean>(false),
};

export const current = {
	loading: computed(() => signals.loading.value),
	seed: computed(() => signals.seed.value),
	angle: computed(() => signals.angle.value),
	users: {
		results: computed(() => signals.users.results.value),
	},
	selected: computed(() => signals.selected.value),
	swipe: computed(() => signals.swipe.value),
	lego: computed(() => signals.lego.value),
};

export const handle = {
	loading: (state: boolean) => (signals.loading.value = state),
	seed: ({ target }: any) => !!target.value && (signals.seed.value = target.value),
	angle: (deg: number) => !!deg && (signals.angle.value = deg),
	users: {
		results: (data: User[]) => data && (signals.users.results.value = data),
	},
	selected: (uuid: string) => !!uuid && (signals.selected.value = uuid),
	swipe: (value: number) => {
		console.log(value);
		const users = current.users.results.value;
		const currentId = users!.findIndex((el) => el.login.uuid === current.selected.value);
		if (value > 1) {
			batch(() => {
				const next = currentId + 1 >= users!.length ? 0 : currentId + 1;
				handle.angle(users![next].angle);
				handle.selected(users![next].login.uuid);
			});
		}
		if (value < 1) {
			batch(() => {
				const before = currentId - 1 <= 0 ? users!.length - 1 : currentId - 1;
				handle.angle(users![before].angle);
				handle.selected(users![before].login.uuid);
			});
		}
		return !!value && (signals.swipe.value = value);
	},
	lego: () => (signals.lego.value = !signals.lego.value),
};

const retriveUsers = effect(() => {
	const data: RandomUser = new RandomUser({
		results: 12,
		seed: signals.seed.value,
		format: 'json',
		nat: ['br'],
		exc: ['registered', 'id'],
		lego: signals.lego.value,
	});

	data
		.retrieve()
		.then((response) => {
			const original = (response as RandomUserResponse).results;
			const results = original.map((el, i) => ({
				...el,
				angle: 360 - i * 30,
				color: colors[Math.floor(Math.random() * colors.length)],
			}));
			batch(() => {
				handle.users.results(results);
				handle.selected(results[0].login.uuid);
				handle.angle(results[0].angle);
				handle.loading(false);
			});
		})
		.catch((error) => {
			console.error(error);
		});
});

function App() {
	const { t } = useTranslation();

	return (
		<MainContainer>
			<div class="absolute bottom-0 w-3/4 md:w-1/4 whitespace-nowrap text-center z-50 bg-black rounded-t p-2">
				<label for="seed" class="mr-1 min-w-full text-center">
					{t('Seed')}
				</label>
				<input
					id="seed"
					type="text"
					value={signals.seed}
					onChange={handle.seed}
					class={`mr-1 w-2/4 md:w-3/4  ${current.loading.value ? 'cursor-not-allowed' : ''}`}
					disabled={current.loading.value}
					data-testid="test-input-seed"
				/>
				<button
					onClick={() => {
						handle.loading(true);
						handle.seed({ target: { value: nanoid() } });
						handle.angle(current.angle - 180);
					}}
					disabled={current.loading.value}
					class={`${current.loading.value ? 'cursor-not-allowed' : ''} mr-1`}
					data-testid="test-btn-random-seed"
				>
					🎲
				</button>
				<button
					onClick={() => {
						handle.loading(true);
						handle.lego();
						handle.seed({ target: { value: nanoid() } });
						handle.angle(current.angle - 180);
					}}
					disabled={current.loading.value}
					class={`${current.loading.value ? 'cursor-not-allowed' : ''} ${signals.lego.value ? '' : 'opacity-50'}`}
					data-testid="test-btn-random-seed"
				>
					🧱
				</button>
			</div>

			<div class="fixed h-full w-full m-0 p-0 top-0 z-40 opacity-0 md:hidden">
				<input
					type="range"
					min="0"
					max="2"
					class="h-full w-full"
					value={current.swipe}
					onInput={({ target }) => handle.swipe(target!.value)}
					onPointerUp={() => handle.swipe(1)}
				/>
			</div>
			<div
				id="roulette-container"
				class="m-0 flex justify-center"
				style={{
					transition: 'all 2s',
				}}
			>
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
			</div>
		</MainContainer>
	);
}

export default withTranslation()(App);
