/* eslint @typescript-eslint/naming-convention: 0 */

import { type RandomUserResponse } from '@/classes/types';
import randomUsers from './random-users.json';
import randomFilterFemale from './random-users-filter-female-br.json';
import randomFilterMale from './random-users-filter-male-br.json';
import randomFilterNatA from './random-users-filter-br-ca.json';
import randomFilterNatB from './random-users-filter-br-ca-rs.json';
import randomFilterNatC from './random-users-filter-br-ca-rs-tr.json';
import { rest } from 'msw';

const mock: Record<string, RandomUserResponse> = {
	'female,br': randomFilterFemale as RandomUserResponse,
	'male,br': randomFilterMale as RandomUserResponse,
	'male,female,br,ca': randomFilterNatA as RandomUserResponse,
	'male,female,br,ca,rs': randomFilterNatB as RandomUserResponse,
	'male,female,br,ca,rs,tr': randomFilterNatC as RandomUserResponse,
};

export const handlers = (statusCode: 200) => [
	rest.get('https://randomuser.me/api/1.4/', async (req, res, ctx) => {
		const filters = req.url.searchParams;

		const gender = filters.get('gender');
		const nat = filters.get('nat');

		const condition = `${gender ?? ''},${nat ?? ''}`;

		const response = mock[condition] || randomUsers;

		return res(ctx.status(statusCode), ctx.json(response));
	}),
];
