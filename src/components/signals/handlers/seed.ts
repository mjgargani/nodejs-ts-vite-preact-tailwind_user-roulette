import { batch, signal } from '@preact/signals';
import { current, handle, signals } from '..';
import { type User } from '@/classes/types';
import { type Seed } from '@/components/atom/Filters';

export default (value: string) => {
	const users = current.users.results.value;
	if (users?.length && (current.loading.value || value === current.seed.value)) {
		batch(() => {
			handle.selected(users[Math.floor(Math.random() * users.length)].login.uuid);
			handle.loading(false);
		});
		return;
	}

	if (current.filters.gender().length === 1) {
		handle.filters.set<User['gender']>('gender', ['male', 'female']);
	}

	const currentSeeds = current.filters.seeds();
	const newSeeds: Seed[] = currentSeeds.map((el) =>
		el.seed === value ? { seed: el.seed, selected: true } : { seed: el.seed, selected: false },
	);

	if (!currentSeeds.some((el) => el.seed === value)) {
		newSeeds.push({ seed: value, selected: true });
	}

	handle.filters.set<Seed>('seeds', newSeeds);
	signals.seed.value = handle.filters
		.get<Seed>('seeds', handle.filters.initial.seeds)
		.filter((el) => Boolean(el.selected))[0].seed;
};
