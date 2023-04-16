import { CustomUser } from '@/classes/types';
import { batch, computed, signal } from '@preact/signals';
import { UseTranslationResponse } from 'react-i18next';

export const signals = {
	loading: signal<boolean>(true),
	seed: signal<string>('1234'),
	angle: signal<number>(0),
	users: {
		results: signal<CustomUser[] | null>(null),
	},
	selected: signal<string>(''),
	swipe: signal<number>(1),
	lego: signal<boolean>(false),
	i18next: signal<UseTranslationResponse<'translation', undefined> | null>(null),
	spin: signal<boolean>(false),
};

export const current = {
	loading: computed(() => signals.loading.value),
	seed: computed(() => signals.seed.value),
	angle: computed(() => signals.angle.value),
	opposite: computed(() => Math.abs(signals.angle.value - 180)),
	users: {
		results: computed(() => signals.users.results.value),
	},
	selected: computed(() => signals.selected.value),
	swipe: computed(() => signals.swipe.value),
	lego: computed(() => signals.lego.value),
	i18next: computed(() => signals.i18next.value as UseTranslationResponse<'translation', undefined>),
	spin: computed(() => signals.spin.value),
};

export const handle = {
	loading: (state: boolean) => {
		if (current.spin.value) {
			batch(() => {
				handle.spin(false);
				signals.loading.value = state;
			});
			return;
		}
		return (signals.loading.value = state);
	},
	seed: (value: string) => {
		batch(() => {
			handle.loading(true);
			handle.angle(current.opposite.value);
		});
		return !!value && (signals.seed.value = value);
	},
	angle: (deg: number) => !!deg && (signals.angle.value = deg),
	users: {
		results: (data: CustomUser[]) => data && (signals.users.results.value = data),
	},
	selected: (uuid: string) => !!uuid && (signals.selected.value = uuid),
	swipe: (value: number) => {
		console.log(value);
		const users = current.users.results.value;
		const currentId = users!.findIndex((el) => el.login.uuid === current.selected.value);
		if (value > 1) {
			batch(() => {
				const next = currentId + 1 >= users!.length ? 0 : currentId + 1;
				handle.angle(users![next].angle);
				handle.selected(users![next].login.uuid);
			});
		}
		if (value < 1) {
			batch(() => {
				const before = currentId - 1 <= 0 ? users!.length - 1 : currentId - 1;
				handle.angle(users![before].angle);
				handle.selected(users![before].login.uuid);
			});
		}
		return !!value && (signals.swipe.value = value);
	},
	lego: () => (signals.lego.value = !signals.lego.value),
	i18next: (hook: UseTranslationResponse<'translation', undefined>) => (signals.i18next.value = hook),
	spin: (state: boolean) => {
		batch(() => {
			handle.selected('none');
			signals.spin.value = state;
		});
	},
};
