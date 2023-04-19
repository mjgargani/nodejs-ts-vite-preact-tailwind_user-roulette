import React from 'preact/compat';
import { h } from 'preact';
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/preact';
import { type Mock } from 'vitest';
import i18n from '@/i18n';
import App from '@/app';
import { type CustomUser } from '@/classes/types';
import { server } from '../mock/server';

import randomUsersMock from '@/__test__/mock/random-users.json';
import randomUsersMockFilterFemale from '@/__test__/mock/random-users-filter-female-br.json';
import randomUsersMockFilterMale from '@/__test__/mock/random-users-filter-male-br.json';
import randomUsersMockFilterNat from '@/__test__/mock/random-users-filter-br-ca-rs-tr.json';

// Global.fetch = vi.fn();

global.HTMLMediaElement.prototype.play = vi.fn();

beforeEach(() => {
	// (fetch as Mock).mockResolvedValue({
	// 	json: async () => Promise.resolve(randomUsersMock),
	// });
	server(200).listen();
});

afterEach(() => {
	server(200).resetHandlers();
	cleanup();
});

describe('main page tests', () => {
	// It('needs to show all the components on screen', async () => {
	// 	const { container } = render(<App />);
	// 	expect(container).toBeInTheDocument();

	// 	const inputSeed = await screen.findByTestId(/test-input-seed/);
	// 	const btnSeedRandom = (await screen.findAllByTestId(/test-btn-random-seed/))[0];
	// 	const btnLego = (await screen.findAllByTestId(/test-btn-lego/))[0];

	// 	expect(inputSeed).toBeInTheDocument();
	// 	expect(btnSeedRandom).toBeInTheDocument();
	// 	expect(btnLego).toBeInTheDocument();

	// 	expect(inputSeed).toBeDisabled();
	// 	expect(btnSeedRandom).toBeDisabled();
	// 	expect(btnLego).toBeDisabled();

	// 	const checkGenders = await screen.findAllByTestId(/test_filter_gender_\w/);
	// 	const checkNat = await screen.findAllByTestId(/test_filter_nat_\w/);

	// 	expect(checkGenders).toHaveLength(2);
	// 	expect(checkNat).toHaveLength(21);

	// 	const cards = await screen.findAllByTestId(/test-user-card-\d/);
	// 	expect(cards).toHaveLength(12);

	// 	await waitFor(
	// 		() => {
	// 			expect(inputSeed).toBeEnabled();
	// 			expect(btnSeedRandom).toBeEnabled();
	// 			expect(btnLego).toBeEnabled();
	// 		},
	// 		{ timeout: 5000 },
	// 	);
	// });

	// it('needs to contain a main random user card from api, with correct expanded data', async () => {
	// 	const { container } = render(<App />);
	// 	expect(container).toBeInTheDocument();

	// 	const cards = await screen.findAllByTestId(/test-user-card-\d/);
	// 	expect(cards).toHaveLength(12);

	// 	const selectedCard = await screen.findByTestId(/test-user-card-\d+_selected/);
	// 	const { uuid } = selectedCard.dataset;

	// 	const selectedUser = (randomUsersMock.results as CustomUser[]).filter((el) => el.login.uuid === uuid)[0];

	// 	const { t } = i18n;

	// 	expect(selectedCard).toHaveTextContent(
	// 		`${t(selectedUser.name.title)} ${selectedUser.name.first} ${selectedUser.name.last}`,
	// 	);
	// 	expect(selectedCard).toHaveTextContent(`${t(selectedUser.gender)}`);
	// 	expect(selectedCard).toHaveTextContent(`${t(selectedUser.nat.toLocaleLowerCase())}`);
	// 	const age = Math.floor((Date.now() - new Date(selectedUser.dob.date).getTime()) / 31536000000);
	// 	expect(selectedCard).toHaveTextContent(`${age} anos`);
	// 	expect(selectedCard).toHaveTextContent('Endereço');
	// 	expect(selectedCard).toHaveTextContent(`${selectedUser.location.city} - ${selectedUser.location.state}, Brasil`);

	// 	const mainCardPicture = await screen.findByTestId(/test-user-card-picture-\d+_selected/);
	// 	expect(mainCardPicture).toHaveStyle(`background-image: url(${selectedUser.picture.large})`);
	// 	expect(mainCardPicture).toHaveStyle('background-position: center');
	// 	expect(mainCardPicture).toHaveStyle('background-repeat: no-repeat');
	// 	expect(mainCardPicture).toHaveStyle('background-size: cover');
	// });

	// it.each([Array.from(Array(randomUsersMock.results).keys())])(
	// 	'needs to contain the rest of the list (page) of random users, only with the avatar and the name (card: %p)',
	// 	async (index) => {
	// 		const { container } = render(<App />);
	// 		expect(container).toBeInTheDocument();

	// 		const cards = await screen.findAllByTestId(/test-user-card-\d/);
	// 		expect(cards).toHaveLength(12);

	// 		const currentCard = cards[index];
	// 		expect(currentCard).toBeInTheDocument();

	// 		const { uuid } = currentCard.dataset;
	// 		const [currentData] = randomUsersMock.results.filter((el) => el.login.uuid === uuid);
	// 		const isSelected = currentCard.dataset.selected === 'true';

	// 		const { t } = i18n;
	// 		expect(currentCard).toHaveTextContent(
	// 			`${t(currentData.name.title)} ${currentData.name.first} ${currentData.name.last}`,
	// 		);

	// 		const cardPictures = await screen.findAllByTestId(/^test-user-card-picture-/);
	// 		const mainCardPicture = cardPictures[index];

	// 		const picture = isSelected ? currentData.picture.large : currentData.picture.thumbnail;
	// 		expect(mainCardPicture).toHaveStyle(`background-image: url(${picture})`);
	// 		expect(mainCardPicture).toHaveStyle('background-position: center');
	// 		expect(mainCardPicture).toHaveStyle('background-repeat: no-repeat');
	// 		expect(mainCardPicture).toHaveStyle('background-size: cover');
	// 	},
	// );

	it.each([Array.from(Array(randomUsersMock.results).keys())])(
		'needs to have a filter who changes gender and nationality (card: %p)',
		async (index) => {
			const { container } = render(<App />);
			expect(container).toBeInTheDocument();

			const checkGenders = await screen.findAllByTestId(/test_filter_gender_\w/);
			const checkNat = await screen.findAllByTestId(/test_filter_nat_\w/);

			expect(checkGenders).toHaveLength(2);
			expect(checkNat).toHaveLength(21);

			fireEvent.click(screen.getByTestId(/test_filter_gender_male/));

			const cards = await screen.findAllByTestId(/test-user-card-\d/);
			expect(cards).toHaveLength(12);

			const currentCard = cards[index];
			expect(currentCard).toBeInTheDocument();

			const { uuid } = currentCard.dataset;
			const [currentData] = randomUsersMockFilterFemale.results.filter((el) => el.login.uuid === uuid);
			const isSelected = currentCard.dataset.selected === 'true';

			const { t } = i18n;
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

	// It('need to have a combobox with a cache of the last input seeds', async () => {
	// 	expect(true).toBe(true);
	// });

	// it('needs, optionally, to receive the seed input on the endpoint <host>/#/<seed>', async () => {
	// 	expect(true).toBe(true);
	// });

	// it('needs return a warning message on screen when the status of API be different than 200', async () => {
	// 	expect(true).toBe(true);
	// });
});
