import { batch } from '@preact/signals';
import { handle, signals } from '..';

export default (state: boolean) => {
	batch(() => {
		handle.spin(state);
		signals.loading.value = state;
	});
};
