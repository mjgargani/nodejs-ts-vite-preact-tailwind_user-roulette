import React from 'preact/compat';
import { h } from 'preact';
import { render, screen, cleanup } from '@testing-library/preact';
import { App } from '../../app';
import { server } from '../mock/server';
import { results as randomUsersMock } from '../mock/random-users.json';

beforeEach(() => {
  server(200).resetHandlers();
  server(200).listen();
});

afterEach(() => {
  cleanup();
});

describe('main page tests', () => {
  it('needs to show all the components, except the filter ones, on screen', async () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();

    const updateBtn = await screen.findByTestId(/test_update_btn/);
    expect(updateBtn).toBeInTheDocument();
    expect(updateBtn).toBeDisabled();

    const cards = await screen.findAllByTestId(/test_user_card_\d/);
    expect(cards).toHaveLength(7);

    expect(updateBtn).toBeEnabled();
  });

  it.only('needs to contain a main random user card from api, with correct collapsed data', async () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();

    const updateBtn = await screen.findByTestId(/test_update_btn/);
    expect(updateBtn).toBeInTheDocument();
    expect(updateBtn).toBeDisabled();

    const cards = await screen.findAllByTestId(/test_user_card_\d/);
    expect(cards).toHaveLength(7);

    expect(updateBtn).toBeEnabled();

    const mainCard = await screen.findByTestId(/test_user_card_3/);

    expect(mainCard).toContainHTML(`<h3>Sra ${randomUsersMock[3].name.first} ${randomUsersMock[3].name.last}</h3>`);
    expect(mainCard).toContainHTML(`<title>feminino</title>`);
    expect(mainCard).toContainHTML(`<title>brasileira</title>`);
    expect(mainCard).toContainHTML(
      `<span>${Math.floor((Date.now() - new Date(randomUsersMock[3].dob.date).getTime()) / 31536000000)} anos</span>`,
    );
    expect(mainCard).toContainHTML(`<section id="main-user-card-details" data-expanded />`);
    expect(mainCard).toContainHTML(`<h4>Endereço</h4>`);
    expect(mainCard).toContainHTML(
      '<ul>' +
        `<li>${randomUsersMock[3].location.street.name}, ${randomUsersMock[3].location.street.number}</li>` +
        `<li>${randomUsersMock[3].location.city}, ${randomUsersMock[3].location.state} - Brasil</li>` +
        '</ul>',
    );

    const mainCardPicture = await screen.findByTestId(/test_user_card_3_picture/);
    expect(mainCardPicture).toHaveStyle({
      'background-image': `url(${randomUsersMock[3].picture.medium})`,
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
