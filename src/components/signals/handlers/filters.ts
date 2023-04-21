import { type Nationalities, type User } from '@/classes/types';
import { signals } from '..';
import * as storage from '@/utils/storage';
import { type Seed } from '@/components/atom/Filters';

type Filters = 'seeds' | 'gender' | 'nat';

export const initial = {
	seeds: [
		{ seed: '', selected: false },
		{ seed: '1234', selected: true },
	] as Seed[],
	gender: ['male', 'female'] as Array<User['gender']>,
	nat: ['br'] as Array<Nationalities['1.4']>,
};

export function get<T>(filter: Filters, initial: T[]): T[] {
	const data = storage.get<T[]>(filter);
	if (!data?.length) {
		storage.set<T[]>(filter, initial);
		return initial;
	}

	return data;
}

export function set<T>(filter: Filters, value: T[]): void {
	storage.set<T[]>(filter, value);
	const newData = storage.get<T[]>(filter);
	signals.filters[filter].value = newData as Seed[] | Array<User['gender']> | Array<Nationalities['1.4']>;
}
