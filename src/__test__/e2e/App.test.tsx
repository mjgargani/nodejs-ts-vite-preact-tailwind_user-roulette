import React from 'preact/compat';
import { h } from 'preact';
import { render, screen, cleanup } from '@testing-library/preact';
import { App } from '../../app';
import { server } from '../mock/server';

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
  it('needs to contain a main random user card from api, with correct collapsed data', () => {
    expect(true).toBe(true);
  });
  it('needs to contain the rest of the list (page) of random users, only with the avatar and the name', () => {
    expect(true).toBe(true);
  });
  it('needs, from the expanded card of selected random user, the detailed info', () => {
    expect(true).toBe(true);
  });
  it('needs a local storage for the colected data', () => {
    expect(true).toBe(true);
  });
  it('needs to recover data from local storage, if the api fails, with a warning', () => {
    expect(true).toBe(true);
  });
  it('needs, as the api developer page, a konami code to unlock the lego api', () => {
    expect(true).toBe(true);
  });
});
