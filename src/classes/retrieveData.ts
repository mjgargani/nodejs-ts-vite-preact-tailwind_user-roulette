import { batch, effect } from '@preact/signals';
import RandomUser from './RandomUser';
import { current, handle, signals } from '@/components/signals';
import { RandomUserResponse } from './types';
import colors from '@/utils/colors';

export default effect(() => {
	handle.loading(true);

	const data: RandomUser = new RandomUser({
		results: 12,
		seed: current.seed.value,
		format: 'json',
		nat: ['br'],
		exc: ['registered', 'id'],
		lego: current.lego.peek(),
	});

	data
		.retrieve()
		.then((response) => {
			const original = (response as RandomUserResponse).results;
			const results = original.map((el, i) => ({
				...el,
				angle: i * 30,
				color: colors[Math.floor(Math.random() * colors.length)],
			}));
			batch(() => {
				handle.users.results(results);
				setTimeout(() => {
					batch(() => {
						handle.selected(results[Math.floor(Math.random() * results.length)].login.uuid);
						handle.loading(false);
					});
				}, 1000);
			});
		})
		.catch((error) => {
			handle.loading(false);
			console.error(error);
		});
});
