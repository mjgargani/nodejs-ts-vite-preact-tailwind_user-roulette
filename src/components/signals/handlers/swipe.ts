import { batch } from '@preact/signals';
import { current, handle, signals } from '..';

export default (value: number) => {
	const users = current.users.results.value;
	if (!users?.length) return;

	const id = users.findIndex((el) => el.login.uuid === current.selected.value);
	if (value > 1) {
		const next = id + 1 >= users.length ? 0 : id + 1;
		batch(() => {
			handle.selected(users[next].login.uuid);
		});
	}

	if (value < 1) {
		const before = id - 1 <= 0 ? users.length - 1 : id - 1;
		batch(() => {
			handle.selected(users[before].login.uuid);
		});
	}

	if (value) {
		signals.swipe.value = value;
	}

	return signals.swipe.value;
};
