import React from 'preact/compat';
import { h } from 'preact';
import { render, screen, cleanup } from '@testing-library/preact';
import { App } from '../../app';
import { server } from '../mock/server';
import randomUsersMock from '../mock/random-users.json';
import { Mock } from 'vitest';

global.fetch = vi.fn();

beforeEach(() => {
	(fetch as Mock).mockResolvedValue({
		json: async () => Promise.resolve(randomUsersMock),
	});
});

afterEach(() => {
	cleanup();
});

describe('main page tests', () => {
	it('needs to show all the components, except the filter ones, on screen', async () => {
		const { container } = render(<App />);
		expect(container).toBeInTheDocument();

		const updateInputSeed = await screen.findByTestId(/test-input-seed/);
		const updateBtnSeedRandom = await screen.findByTestId(/test-btn-random-seed/);

		expect(updateInputSeed).toBeInTheDocument();
		expect(updateBtnSeedRandom).toBeInTheDocument();

		const cards = await screen.findAllByTestId(/test_user_card_\d/);
		expect(cards).toHaveLength(12);

		expect(updateInputSeed).toBeEnabled();
		expect(updateBtnSeedRandom).toBeEnabled();
	});

	it.only('needs to contain a main random user card from api, with correct collapsed data', async () => {
		const { container } = render(<App />);
		expect(container).toBeInTheDocument();

		const updateInputSeed = await screen.findByTestId(/test-input-seed/);
		const updateBtnSeedRandom = await screen.findByTestId(/test-btn-random-seed/);

		expect(updateInputSeed).toBeInTheDocument();
		expect(updateBtnSeedRandom).toBeInTheDocument();

		const cards = await screen.findAllByTestId(/test_user_card_\d/);
		expect(cards).toHaveLength(12);

		expect(updateInputSeed).toBeEnabled();
		expect(updateBtnSeedRandom).toBeEnabled();

		const defaultCard = await screen.findByTestId(/test_user_card_0/);

		expect(defaultCard).toContainHTML(
			`<h3>Sr ${randomUsersMock.results[0].name.first} ${randomUsersMock.results[0].name.last}</h3>`,
		);
		expect(defaultCard).toContainHTML(`<title>masculino</title>`);
		expect(defaultCard).toContainHTML(`<title>brasileiro</title>`);
		expect(defaultCard).toContainHTML(
			`<span>${Math.floor(
				(Date.now() - new Date(randomUsersMock.results[0].dob.date).getTime()) / 31536000000,
			)} anos</span>`,
		);
		expect(defaultCard).toContainHTML(`<section id="main-user-card-details" data-expanded />`);
		expect(defaultCard).toContainHTML(`<h4>Endereço</h4>`);
		expect(defaultCard).toContainHTML(
			'<ul>' +
				`<li>${randomUsersMock.results[0].location.street.name}, ${randomUsersMock.results[0].location.street.number}</li>` +
				`<li>${randomUsersMock.results[0].location.city}, ${randomUsersMock.results[0].location.state} - Brasil</li>` +
				'</ul>',
		);

		const mainCardPicture = await screen.findByTestId(/test_user_card_3_picture/);
		expect(mainCardPicture).toHaveStyle({
			'background-image': `url(${randomUsersMock.results[3].picture.medium})`,
			'background-size': 'cover',
			'background-repeat': 'no-repeat',
			'background-position': 'center',
		});
	});

	it('needs to contain the rest of the list (page) of random users, only with the avatar and the name', async () => {
		const { container } = render(<App />);
		expect(container).toBeInTheDocument();
	});

	it('needs, from the expanded card of selected random user, the detailed info', async () => {
		const { container } = render(<App />);
		expect(container).toBeInTheDocument();
	});

	it('needs a local storage for the colected data', async () => {
		const { container } = render(<App />);
		expect(container).toBeInTheDocument();
	});

	it('needs to recover data from local storage, if the api fails, with a warning', async () => {
		const { container } = render(<App />);
		expect(container).toBeInTheDocument();
	});

	it('needs, as the api developer page, a konami code to unlock the lego api', async () => {
		const { container } = render(<App />);
		expect(container).toBeInTheDocument();
	});
});
