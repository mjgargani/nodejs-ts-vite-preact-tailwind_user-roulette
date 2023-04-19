import { Nationalities, RandomUserProps, User } from '@/classes/types';
import randomUsers from './random-users.json';
import randomFilterFemale from './random-users-filter-female-br.json';
import randomFilterMale from './random-users-filter-male-br.json';
import randomFilterNat from './random-users-filter-br-ca-rs-tr.json';
import { rest } from 'msw';

export const handlers = (statusCode: 200) => [
	rest.get('https://randomuser.me/api/1.4/', async (req, res, ctx) => {
		const filters = req.url.searchParams;

		const gender = filters.get('gender');
		const nat = filters.get('nat');

		let response = randomUsers;

		if (gender === 'female') {
			response = randomFilterFemale;
		} else if (gender === 'male') {
			response = randomFilterMale;
		} else if (nat === 'br,ca,rs,tr') {
			response = randomFilterFemale;
		}

		return res(ctx.status(statusCode), ctx.json(response));
	}),
];
