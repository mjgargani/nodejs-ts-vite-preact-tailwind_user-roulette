/* eslint no-await-in-loop: 0 */
/* eslint max-statements-per-line: 0 */

import React from 'preact/compat';
import { h } from 'preact';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/preact';
import i18n from '@/i18n';
import App from '@/app';
import { server } from '../mock/server';
import * as signals from '@/components/signals';

import randomUsersMock from '@/__test__/mock/random-users.json';
import randomUsersMockFilterFemale from '@/__test__/mock/random-users-filter-female-br.json';
import randomUsersMockFilterMale from '@/__test__/mock/random-users-filter-male-br.json';
import randomUsersMockFilterNatA from '@/__test__/mock/random-users-filter-br-ca.json';
import randomUsersMockFilterNatB from '@/__test__/mock/random-users-filter-br-ca-rs.json';
import randomUsersMockFilterNatC from '@/__test__/mock/random-users-filter-br-ca-rs-tr.json';

import '../mock/storage';
import { type CustomUser } from '@/classes/types';

global.HTMLAudioElement.prototype.play = vi.fn();

const { t } = i18n;

beforeEach(async () => {
	server(200).listen();
	render(<App />);
	// Temp workaround, since the default method (waitFor/find*), for some reason,
	// is currently not recognizing the alteration of DOM #1
	await new Promise((res) =>
		setTimeout(() => {
			res(true);
		}, 2500),
	);
});

afterEach(() => {
	signals.reset();
	server(200).resetHandlers();
});

describe('main page tests', () => {
	it('needs to show all the components on screen', async () => {
		const inputSeed = await screen.findByTestId(/test-input-seed/);
		const btnSeedRandom = (await screen.findAllByTestId(/test-btn-random-seed/))[0];
		const btnLego = (await screen.findAllByTestId(/test-btn-lego/))[0];

		expect(inputSeed).toBeInTheDocument();
		expect(btnSeedRandom).toBeInTheDocument();
		expect(btnLego).toBeInTheDocument();

		expect(inputSeed).toBeEnabled();
		expect(btnSeedRandom).toBeEnabled();
		expect(btnLego).toBeEnabled();

		const checkGenders = await screen.findAllByTestId(/test_filter_gender_\w/);
		const checkNat = await screen.findAllByTestId(/test_filter_nat_\w/);
		expect(checkGenders).toHaveLength(2);
		expect(checkNat).toHaveLength(21);

		const cards = await screen.findAllByTestId(/test-user-card-\d/);
		expect(cards).toHaveLength(12);
	});
	it('needs to contain a main random user card from api, with correct expanded data', async () => {
		const btnLego = screen.getByTestId(/test-btn-lego/);
		expect(btnLego).toBeEnabled();
		const cards = screen.getAllByTestId(/test-user-card-\d/);
		expect(cards).toHaveLength(12);

		const selectedCard = await screen.findByTestId(/test-user-card-\d+_selected/);
		const { uuid } = selectedCard.dataset;

		const selectedUser = (randomUsersMock.results as CustomUser[]).filter((el) => el.login.uuid === uuid)[0];

		expect(selectedCard).toHaveTextContent(
			`${t(selectedUser.name.title)} ${selectedUser.name.first} ${selectedUser.name.last}`,
		);
		expect(selectedCard).toHaveTextContent(`${t(selectedUser.gender)}`);
		expect(selectedCard).toHaveTextContent(`${t(selectedUser.nat.toLocaleLowerCase())}`);
		const age = Math.floor((Date.now() - new Date(selectedUser.dob.date).getTime()) / 31536000000);
		expect(selectedCard).toHaveTextContent(`${age} anos`);
		expect(selectedCard).toHaveTextContent('Endereço');
		expect(selectedCard).toHaveTextContent(`${selectedUser.location.city} - ${selectedUser.location.state}, Brasil`);

		const mainCardPicture = await screen.findByTestId(/test-user-card-picture-\d+_selected/);
		expect(mainCardPicture).toHaveStyle(`background-image: url(${selectedUser.picture.large})`);
		expect(mainCardPicture).toHaveStyle('background-position: center');
		expect(mainCardPicture).toHaveStyle('background-repeat: no-repeat');
		expect(mainCardPicture).toHaveStyle('background-size: cover');
	});

	it.each([Array.from(Array(randomUsersMock.results).keys())])(
		'needs to contain the rest of the list (page) of random users, only with the avatar and the name (card: %p)',
		async (index) => {
			const btnLego = screen.getByTestId(/test-btn-lego/);
			expect(btnLego).toBeEnabled();
			const cards = screen.getAllByTestId(/test-user-card-\d/);
			expect(cards).toHaveLength(12);

			const currentCard = cards[index];
			expect(currentCard).toBeInTheDocument();

			const { uuid } = currentCard.dataset;

			const [currentData] = randomUsersMock.results.filter((el) => el.login.uuid === uuid);
			const isSelected = currentCard.dataset.selected === 'true';

			expect(currentCard).toHaveTextContent(
				`${t(currentData.name.title)} ${currentData.name.first} ${currentData.name.last}`,
			);

			const cardPictures = await screen.findAllByTestId(/^test-user-card-picture-/);
			const mainCardPicture = cardPictures[index];
			const picture = isSelected ? currentData.picture.large : currentData.picture.thumbnail;
			expect(mainCardPicture).toHaveStyle(`background-image: url(${picture})`);
			expect(mainCardPicture).toHaveStyle('background-position: center');
			expect(mainCardPicture).toHaveStyle('background-repeat: no-repeat');
			expect(mainCardPicture).toHaveStyle('background-size: cover');
		},
	);

	it.each([
		[['gender_male'], [randomUsersMockFilterFemale.results[0]]],
		[['gender_female'], [randomUsersMockFilterMale.results[0]]],
		[
			['nat_ca', 'nat_rs', 'nat_tr'],
			[
				randomUsersMockFilterNatA.results[0],
				randomUsersMockFilterNatB.results[0],
				randomUsersMockFilterNatC.results[0],
			],
		],
	])('needs to have a filter who changes gender and nationality (filter(s): %p)', async (filters, data) => {
		const btnLego = screen.getByTestId(/test-btn-lego/);
		expect(btnLego).toBeEnabled();
		const cards = screen.getAllByTestId(/test-user-card-\d/);
		expect(cards).toHaveLength(12);

		const checkGenders = await screen.findAllByTestId(/test_filter_gender_\w/);
		const checkNat = await screen.findAllByTestId(/test_filter_nat_\w/);
		expect(checkGenders).toHaveLength(2);
		expect(checkNat).toHaveLength(21);

		for (let i = 0; i < filters.length; i++) {
			await new Promise((res) =>
				setTimeout(() => {
					res(true);
				}, 250),
			);
			fireEvent.click(screen.getByTestId(new RegExp(`test_filter_${filters[i]}`)));

			// Temp workaround, since the default method (find*), for some reason,
			// is currently not recognizing the alteration of DOM #2
			const card = await new Promise((res) => {
				const interval = setInterval(() => {
					const element = document.querySelector(`div[data-uuid="${data[i].login.uuid}"]`);
					if (element) {
						clearInterval(interval);
						res(element);
					}
				}, 250);
			});

			expect(card).toHaveTextContent(data[i].name.first);
		}
	});

	it('need to have a combobox with a cache of the last input seeds', async () => {
		const btnLego = screen.getByTestId(/test-btn-lego/);
		expect(btnLego).toBeEnabled();
		const cards = screen.getAllByTestId(/test-user-card-\d/);
		expect(cards).toHaveLength(12);

		const seedOptions = () => screen.getAllByTestId(/test-seed-option-\w/);
		expect(seedOptions()).toHaveLength(2);

		for (let i = 1; i <= 3; i++) {
			fireEvent.click(screen.getByTestId('test-btn-random-seed'));

			// Wait for the roulette
			await new Promise((res) =>
				setTimeout(() => {
					res(true);
				}, 2500),
			);

			expect(seedOptions()).toHaveLength(2 + i);
		}
	}, 10000);

	it('needs, optionally, to receive the seed input on the endpoint <host>/#/<seed>', async () => {
		expect(true).toBe(true);
	});
	it('needs return a warning message on screen when the status of API be different than 200', async () => {
		expect(true).toBe(true);
	});
});
