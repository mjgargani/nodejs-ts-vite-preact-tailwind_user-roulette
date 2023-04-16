import { batch, effect } from '@preact/signals';
import RandomUser from './RandomUser';
import { handle, signals } from '@/components/signals';
import { RandomUserResponse } from './types';
import colors from '@/utils/colors';

export default effect(() => {
	handle.selected('none');

	const data: RandomUser = new RandomUser({
		results: 12,
		seed: signals.seed.value,
		format: 'json',
		nat: ['br'],
		exc: ['registered', 'id'],
		lego: signals.lego.value,
	});

	data
		.retrieve()
		.then((response) => {
			const original = (response as RandomUserResponse).results;
			const results = original.map((el, i) => ({
				...el,
				angle: 360 - i * 30,
				color: colors[Math.floor(Math.random() * colors.length)],
			}));
			batch(() => {
				handle.users.results(results);
				handle.selected(results[5].login.uuid);
				handle.angle(results[5].angle);
				handle.loading(false);
			});
		})
		.catch((error) => {
			handle.loading(false);
			console.error(error);
		});
});
