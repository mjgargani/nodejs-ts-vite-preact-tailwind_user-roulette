import React from 'preact/compat';

import { type ComponentChildren } from 'preact';
import './styles.css';
import { current } from '@/components/signals';

export type NotificationProps = {
	show: boolean;
	type: 'normal' | 'warning' | 'error';
	children: ComponentChildren;
};

function Notification({ show, type, children }: NotificationProps) {
	const { t } = current.i18next.value;

	const color = {
		normal: 'border-black bg-gray-900',
		warning: 'border-black bg-gray-900',
		error: 'border-black bg-gray-900',
	};
	const icon = {
		normal: 'ℹ️',
		warning: '⚠️',
		error: '❌',
	};
	return show ? (
		<div
			id="notification"
			class={`absolute bottom-12 z-50 flex w-3/4 flex-col rounded border-2 text-sm text-gray-50 shadow-lg md:w-2/4 ${color[type]}`}
		>
			<div class="flex flex-row">
				<div class="mr-2 w-fit p-1">{icon[type]}</div>
				<div class="p-1 text-justify">{children}</div>
			</div>
			<button class="bg-black/20 hover:bg-black/50">✖️ {t('Dismiss')}</button>
		</div>
	) : (
		<></>
	);
}

export default Notification;
