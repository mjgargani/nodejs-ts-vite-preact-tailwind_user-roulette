import React from 'preact/compat';

import { current, handle, signals } from '@/components/signals';
import { signal } from '@preact/signals';
import filters from './filters.json';
import './styles.css';

const show = signal<boolean>(false);

function Filters() {
	const { t } = current.i18next.value;

	return (
		<div
			class={`absolute top-0 w-3/4 md:w-1/4 text-center z-50 bg-black rounded-b p-2 cursor-pointer ${
				current.loading.value ? 'grayscale pointer-events-none' : ''
			}`}
			onClick={(e: Event) => {
				e.preventDefault();
				show.value = !show.value;
			}}
			style={{
				transition: 'height 1s',
			}}
		>
			🗂️
			<div class={`flex flex-col overflow-auto transition-all ${show.value ? 'h-72' : 'h-0'}`}>
				<div class="flex flex-col justify-center">
					<label class="m-1">{t('Genders')}</label>
					<div class="flex flex-wrap justify-center bg-gray-900 text-gray-50 rounded">
						{filters.gender.map((el, i) => (
							<div class="m-2">
								<input
									key={`filters_${el}_${i}`}
									type="checkbox"
									id={`filters_${el}`}
									name={`filters_${el}`}
									class="mr-1"
									value={el}
								/>
								<label for={`filters_${el}`}>{t(el)}</label>
							</div>
						))}
					</div>
				</div>
				<div class="flex flex-wrap justify-center">
					<label class="m-1">{t('Nationalities')}</label>
					<div class="flex flex-wrap justify-center  bg-gray-900 text-gray-50 rounded">
						{filters.nat.map((el, i) => (
							<div class="m-2">
								<input
									key={`filters_${el}_${i}`}
									type="checkbox"
									id={`filters_${el}`}
									name={`filters_${el}`}
									class="mr-1"
									value={el}
								/>
								<label for={`filters_${el}`}>{t(el)}</label>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Filters;
