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

	signals.seed.value = value;
	return signals.seed.value;
};
