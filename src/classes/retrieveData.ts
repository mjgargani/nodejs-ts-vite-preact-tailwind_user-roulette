import { batch, effect } from '@preact/signals';
import RandomUser from './RandomUser';
import { current, handle } from '@/components/signals';
import { type RandomUserProps, type RandomUserResponse } from './types';
import colors from '@/utils/colors';

export const retrieveUsers = async ({ seed, gender, nat, lego }: Partial<RandomUserProps['props']>) => {
	if (!current.loading.peek()) {
		handle.loading(true);

		const data: RandomUser = new RandomUser({
			format: 'json',
			results: 12,
			exc: ['registered', 'id'],
			seed,
			gender,
			nat,
			lego,
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

				handle.users.results(results);
				setTimeout(() => {
					batch(() => {
						handle.selected(results[Math.floor(Math.random() * results.length)].login.uuid);
						handle.loading(false);
					});
				}, 1000);
			})
			.catch((error: Error) => {
				handle.notification(
					true,
					'error',
					'Unable to retrieve API information, please reload the page or try again later',
				);
				handle.spin(false);
				console.error(error);
			});
	}
};

export const fetchEffect = () =>
	effect(() => {
		retrieveUsers({
			seed: current.seed.value,
			gender: current.filters.gender(),
			nat: current.filters.nat(),
			lego: current.lego.peek(),
		});
	});
