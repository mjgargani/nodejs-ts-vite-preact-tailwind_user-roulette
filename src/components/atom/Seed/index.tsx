import React from 'preact/compat';

import { current, handle, signals } from '@/components/signals';
import { batch, signal } from '@preact/signals';
import { nanoid } from 'nanoid';
import { type ChangeEvent } from 'preact/compat';

const delay = signal<boolean>(false);

const delaySeed = (e: ChangeEvent) => {
	e.preventDefault();
	handle.spin(true);

	if (!delay.value) {
		console.log('eita');
		delay.value = true;
		const timeout = setTimeout(() => {
			const target = e.target! as HTMLInputElement;
			if (delay.value) {
				handle.seed(target.value || '');
				delay.value = false;
			}

			clearTimeout(timeout);
		}, 2000);
	}
};

function Seed() {
	const { t } = current.i18next.value;

	return (
		<div
			class={`absolute bottom-0 z-50 w-3/4 whitespace-nowrap rounded-t bg-black p-2 text-center md:w-1/4 ${
				current.loading.value ? 'pointer-events-none grayscale' : ''
			}`}
		>
			<label for="seed" class="mr-1 min-w-full text-center">
				{t('Seed')}
			</label>
			<input
				id="seed"
				type="text"
				value={current.seed}
				onChange={delaySeed}
				class="mr-1 w-2/4 rounded bg-gray-900 text-gray-50 md:w-3/4"
				disabled={current.loading.value}
				data-testid="test-input-seed"
			/>
			<button
				onClick={(e: Event) => {
					e.preventDefault();
					handle.seed(nanoid());
				}}
				disabled={current.loading.value}
				class="mr-1"
				data-testid="test-btn-random-seed"
			>
				🎲
			</button>
			<button
				onClick={(e: Event) => {
					e.preventDefault();
					batch(() => {
						handle.lego();
						handle.seed(nanoid());
					});
				}}
				disabled={current.loading.value}
				class={signals.lego.value ? '' : 'opacity-50'}
				data-testid="test-btn-lego"
			>
				🧱
			</button>
		</div>
	);
}

export default Seed;
