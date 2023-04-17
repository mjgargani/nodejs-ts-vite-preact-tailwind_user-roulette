import React from 'preact/compat';

import { current, handle } from '@/components/signals';
import { batch } from '@preact/signals';
import { Nationalities, User } from '@/classes/types';
import filters from './filters.json';
import './styles.css';

function Filters() {
	const { t } = current.i18next.value;

	const handleFilters = (e: Event) => {
		e.preventDefault();

		const gender = Array.from(document.querySelectorAll('input[id^=filter_gender_]'));
		const nat = Array.from(document.querySelectorAll('input[id^=filter_nat_]'));

		const dataGender = (gender as HTMLInputElement[])
			.map((el) => el.checked && (el.value as User['gender']))
			.filter(Boolean) as User['gender'][];

		const dataNat = (nat as HTMLInputElement[])
			.map((el) => el.checked && (el.value as Nationalities['1.4']))
			.filter(Boolean) as Nationalities['1.4'][];

		batch(() => {
			handle.seed('');
			handle.filter({ gender: dataGender, nat: dataNat });
		});
	};

	return (
		<div
			class={`absolute top-0 w-3/4 md:w-1/4 text-center z-50 bg-black text-gray-50 rounded-b p-2 cursor-pointer ${
				current.loading.value ? 'grayscale pointer-events-none' : ''
			}`}
			style={{
				transition: 'height 1s',
			}}
		>
			<div class="w-full select-none" onClick={() => handle.show(!current.show.value)}>
				🗂️
			</div>
			<div class={`flex flex-col overflow-auto transition-all ${current.show.value ? 'h-72' : 'h-0'}`}>
				<div class="flex flex-col justify-center">
					<label class="m-1">{t('Genders')}</label>
					<div class="flex flex-wrap justify-center bg-gray-900 rounded">
						{filters.gender.map((el, i) => (
							<div class="m-2">
								<input
									key={`filter_gender_${el}_${i}`}
									type="checkbox"
									id={`filter_gender_${el}`}
									name={`filter_gender_${el}`}
									class="mr-1"
									value={el}
									checked={current.filters.value?.gender?.includes(el as User['gender'])}
									onChange={handleFilters}
								/>
								<label for={`filter_gender_${el}`}>{t(el)}</label>
							</div>
						))}
					</div>
				</div>
				<div class="flex flex-wrap justify-center">
					<label class="m-1">{t('Nationalities')}</label>
					<div class="flex flex-wrap justify-center  bg-gray-900 rounded">
						{filters.nat.map((el, i) => (
							<div class="m-2">
								<input
									key={`filter_nat_${el}_${i}`}
									type="checkbox"
									id={`filter_nat_${el}`}
									name={`filter_nat_${el}`}
									class="mr-1"
									value={el}
									checked={current.filters.value?.nat?.includes(el as Nationalities['1.4'])}
									onChange={handleFilters}
								/>
								<label for={`filter_nat_${el}`}>{t(el)}</label>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Filters;
