import React from 'preact/compat';

import { current, handle, signals } from '@/components/signals';
import { batch, effect, signal } from '@preact/signals';
import { nanoid } from 'nanoid';
import { ChangeEvent } from 'preact/compat';

const delay = signal<Boolean>(false);

const delaySeed = (e: ChangeEvent) => {
	e.preventDefault();
	handle.spin(true);

	if (!delay.value) {
		delay.value = true;
		const timeout = setTimeout(() => {
			const target = e.target! as HTMLInputElement;
			delay.value && !!target.value && handle.seed(target.value);
			delay.value = false;
			clearTimeout(timeout);
		}, 2000);
	}
};

function Seed() {
	const { t } = current.i18next.value;

	return (
		<div
			class={`absolute bottom-0 w-3/4 md:w-1/4 whitespace-nowrap text-center z-50 bg-black rounded-t p-2 ${
				current.loading.value ? 'grayscale pointer-events-none' : ''
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
				class="mr-1 w-2/4 md:w-3/4"
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
				data-testid="test-btn-random-seed"
			>
				🧱
			</button>
		</div>
	);
}

export default Seed;
