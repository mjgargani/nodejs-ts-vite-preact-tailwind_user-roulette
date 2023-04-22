import { type CustomUser, type Nationalities, type User } from '@/classes/types';
import { computed, signal } from '@preact/signals';
import { type UseTranslationResponse } from 'react-i18next';
import selected from './handlers/selected';
import swipe from './handlers/swipe';
import spin from './handlers/spin';
import seed from './handlers/seed';
import loading from './handlers/loading';
import * as filters from './handlers/filters';

import { type Seed } from '../atom/Filters';
import * as storage from '@/utils/storage';
import { type NotificationProps } from '../atom/Notification';

export const signals = {
	loading: signal<boolean>(true),
	seed: signal<string>(filters.get<Seed>('seeds', filters.initial.seeds).filter((el) => Boolean(el.selected))[0].seed),
	angle: signal<number>(0),
	users: {
		results: signal<CustomUser[] | undefined>(undefined),
	},
	selected: signal<string>(''),
	swipe: signal<number>(3),
	lego: signal<boolean>(false),
	i18next: signal<UseTranslationResponse<'translation'> | undefined>(undefined),
	spin: signal<boolean>(false),
	audio: signal<Record<string, HTMLAudioElement>>({}),
	click: signal<boolean>(true),
	filters: {
		seeds: signal<Seed[]>(filters.get<Seed>('seeds', filters.initial.seeds)),
		gender: signal<Array<User['gender']>>(filters.get<User['gender']>('gender', filters.initial.gender)),
		nat: signal<Array<Nationalities['1.4']>>(filters.get<Nationalities['1.4']>('nat', filters.initial.nat)),
	},
	show: signal<boolean>(false),
	notification: signal<[boolean, NotificationProps['type'], string]>([false, 'normal', '']),
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
	filters: {
		seeds: () => filters.get<Seed>('seeds', filters.initial.seeds),
		gender: () => filters.get<User['gender']>('gender', filters.initial.gender),
		nat: () => filters.get<Nationalities['1.4']>('nat', filters.initial.nat),
	},
	show: computed(() => signals.show.value),
	notification: computed(() => signals.notification.value),
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
	filters,
	show: (state: boolean) => (signals.show.value = state),
	notification: (show: boolean, type?: NotificationProps['type'], message?: string) =>
		(signals.notification.value = [show, type ?? 'normal', message ?? '']),
};

// For the test env
export const reset = () => {
	signals.loading.value = true;
	signals.angle.value = 0;
	signals.users.results.value = undefined;
	signals.selected.value = '';
	signals.swipe.value = 3;
	signals.lego.value = false;
	signals.i18next.value = undefined;
	signals.spin.value = false;
	signals.audio.value = {};
	signals.click.value = true;
	signals.show.value = false;
	signals.notification.value = [false, 'normal', ''];

	storage.cls();
	signals.seed.value = filters.get<Seed>('seeds', filters.initial.seeds).filter((el) => Boolean(el.selected))[0].seed;
	signals.filters.seeds.value = filters.get<Seed>('seeds', filters.initial.seeds);
	signals.filters.gender.value = filters.get<User['gender']>('gender', filters.initial.gender);
	signals.filters.nat.value = filters.get<Nationalities['1.4']>('nat', filters.initial.nat);
};
