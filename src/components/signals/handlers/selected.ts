import { batch, computed } from '@preact/signals';
import { current, handle, signals } from '..';

export default (uuid: string | false) => {
	batch(() => {
		if (uuid) {
			const users = current.users.results.value;
			if (users?.length) {
				const angle = users.filter((el) => el.login.uuid === uuid)[0]?.angle;
				if (angle !== undefined) {
					const target = computed(() => 360 - angle).value;
					handle.angle(target);
				}
			}
		}

		signals.selected.value = uuid || 'none';
	});
};
