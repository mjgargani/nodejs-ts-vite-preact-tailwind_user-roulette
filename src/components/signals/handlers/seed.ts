import { batch } from '@preact/signals';
import { current, handle, signals } from '..';

export default (value: string) => {
	const users = current.users.results.value;
	if (users?.length && (current.loading.value || value === current.seed.value)) {
		batch(() => {
			handle.selected(users[Math.round(Math.random() * users.length)].login.uuid);
			handle.loading(false);
		});
		return signals.seed.value;
	}

	if (current.filters.value?.gender?.length === 1) {
		handle.filter({
			...current.filters.value,
			gender: [],
		});
	}

	signals.seed.value = value;
	return signals.seed.value;
};
