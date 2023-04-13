import { handlers } from './handlers';
import { setupServer } from 'msw/node';

export const server = (statusCode: 200) => setupServer(...handlers(statusCode));
