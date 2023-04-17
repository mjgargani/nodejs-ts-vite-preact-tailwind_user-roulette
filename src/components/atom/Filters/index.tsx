import React from 'preact/compat';

import { current, handle } from '@/components/signals';
import { type Nationalities, type User } from '@/classes/types';
import filters from './filters.json';
import './styles.css';

function Filters() {
	if (current.lego.value) {
		handle.show(false);
		return <></>;
	}

	const { t } = current.i18next.value;

	const handleFilters = (e: Event) => {
		e.preventDefault();

		const gender = Array.from(document.querySelectorAll('input[id^=filter_gender_]'));
		const nat = Array.from(document.querySelectorAll('input[id^=filter_nat_]'));

		const dataGender = (gender as HTMLInputElement[])
			.map((el) => el.checked && (el.value as User['gender']))
			.filter(Boolean) as Array<User['gender']>;

		const dataNat = (nat as HTMLInputElement[])
			.map((el) => el.checked && (el.value as Nationalities['1.4']))
			.filter(Boolean) as Array<Nationalities['1.4']>;

		handle.filter({ gender: dataGender, nat: dataNat });
	};

	return (
		<div
			class={`absolute top-0 z-50 w-3/4 cursor-pointer rounded-b bg-black p-2 text-center text-gray-50 md:w-1/4 ${
				current.loading.value ? 'pointer-events-none grayscale' : ''
			}`}
			id="filter-container"
		>
			<div class="w-full select-none" onClick={() => handle.show(!current.show.value)}>
				🗂️
			</div>
			<div id="filter-container-content" class={`flex flex-col overflow-auto ${current.show.value ? 'h-72' : 'h-0'}`}>
				<div class="flex flex-col justify-center">
					<label class="m-1">{t('Genders')}</label>
					<div class="flex flex-wrap justify-center rounded bg-gray-900">
						{filters.gender.map((el, i) => (
							<div class="m-2" key={`filter_gender_${el}_${i}`}>
								<input
									type="checkbox"
									id={`filter_gender_${el}`}
									data-testid={`test_filter_gender_${el}`}
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
					<div class="flex flex-wrap justify-center  rounded bg-gray-900">
						{filters.nat.map((el, i) => (
							<div class="m-2" key={`filter_nat_${el}_${i}`}>
								<input
									type="checkbox"
									id={`filter_nat_${el}`}
									data-testid={`test_filter_nat_${el}`}
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
