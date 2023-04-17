import { type CustomUser, type Nationalities, type User } from '@/classes/types';
import { computed, signal } from '@preact/signals';
import { type UseTranslationResponse } from 'react-i18next';
import selected from './handlers/selected';
import swipe from './handlers/swipe';
import spin from './handlers/spin';
import seed from './handlers/seed';
import loading from './handlers/loading';

export const signals = {
	loading: signal<boolean>(true),
	seed: signal<string>('1234'),
	angle: signal<number>(0),
	users: {
		results: signal<CustomUser[] | undefined>(undefined),
	},
	selected: signal<string>(''),
	swipe: signal<number>(1),
	lego: signal<boolean>(false),
	i18next: signal<UseTranslationResponse<'translation'> | undefined>(undefined),
	spin: signal<boolean>(false),
	audio: signal<Record<string, HTMLAudioElement>>({}),
	click: signal<boolean>(true),
	filters: signal<
		| {
				gender: Array<User['gender']> | undefined;
				nat: Array<Nationalities['1.4']> | undefined;
		  }
		| undefined
	>({
		gender: ['male', 'female'],
		nat: ['br'],
	}),
	show: signal<boolean>(false),
};

export const current = {
	loading: computed(() => signals.loading.value),
	seed: computed(() => signals.seed.value),
	angle: computed(() => signals.angle.value),
	users: {
		results: computed(() => signals.users.results.value),
	},
	selected: computed(() => signals.selected.value),
	swipe: computed(() => signals.swipe.value),
	lego: computed(() => signals.lego.value),
	i18next: computed(() => signals.i18next.value!),
	spin: computed(() => signals.spin.value),
	audio: computed(() => signals.audio.value),
	click: computed(() => signals.click.value),
	filters: computed(() => signals.filters.value),
	show: computed(() => signals.show.value),
};

export const handle = {
	loading,
	seed,
	angle: (deg: number) => Boolean(deg) && (signals.angle.value = deg),
	users: {
		results: (data: CustomUser[]) => data && (signals.users.results.value = data),
	},
	selected,
	swipe,
	lego: () => (signals.lego.value = !signals.lego.value),
	i18next: (hook: UseTranslationResponse<'translation'>) => (signals.i18next.value = hook),
	spin,
	audio: (name: string, element: HTMLAudioElement) => Object.assign(signals.audio.value, { [name]: element }),
	click: (active: boolean) => (signals.click.value = active),
	filter: (data: { gender: Array<User['gender']> | undefined; nat: Array<Nationalities['1.4']> | undefined }) =>
		(signals.filters.value = data),
	show: (state: boolean) => (signals.show.value = state),
};
