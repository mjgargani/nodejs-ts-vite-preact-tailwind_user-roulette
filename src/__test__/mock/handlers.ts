import randomUsers from './random-users.json';
import { rest } from 'msw';

export const handlers = (statusCode: 200) => [
  rest.get('https://randomuser.me/api/1.4/', async (_req, res, ctx) =>
    res(ctx.status(statusCode), ctx.json(randomUsers)),
  ),
];
