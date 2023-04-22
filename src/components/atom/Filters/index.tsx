import React from 'preact/compat';

import { current, handle } from '@/components/signals';
import { type Nationalities, type User } from '@/classes/types';
import filters from './filters.json';
import './styles.css';
import * as storage from '@/utils/storage';
import { batch } from '@preact/signals';
import { retrieveUsers } from '@/classes/retrieveData';
import { route } from 'preact-router';

export type Seed = { seed: string; selected: boolean };

function Filters() {
	const { t } = current.i18next.value;

	const handleSeeds = (e: Event) => {
		const comboSeed = Array.from(document.querySelectorAll('option[id^=filter_seed_]'));
		const optionSeed = (comboSeed as HTMLOptionElement[]).filter((el) => Boolean(el.selected))[0].value;

		const newSeeds = current.filters
			.seeds()
			.map((el) => (el.seed === optionSeed ? { seed: el.seed, selected: true } : { seed: el.seed, selected: false }));

		handle.filters.set<Seed>('seeds', newSeeds);
		route(
			`/${
				handle.filters.get<Seed>('seeds', handle.filters.initial.seeds).filter((el) => Boolean(el.selected))[0].seed
			}`,
		);
	};

	const handleGender = (e: Event) => {
		const gender = Array.from(document.querySelectorAll('input[id^=filter_gender_]'));

		const dataGender = (gender as HTMLInputElement[])
			.map((el) => el.checked && (el.value as User['gender']))
			.filter(Boolean) as Array<User['gender']>;

		if (current.filters.gender() !== dataGender && dataGender.length === 1 && Boolean(current.seed.value)) {
			handle.seed('');
			route('/');
			handle.notification(true, 'warning', 'It is not possible to use seeds for a specific gender');
		}

		handle.filters.set<User['gender']>('gender', dataGender);
		retrieveUsers({
			seed: current.seed.value,
			gender: current.filters.gender(),
			nat: current.filters.nat(),
			lego: current.lego.peek(),
		});
	};

	const handleNat = (e: Event) => {
		const nat = Array.from(document.querySelectorAll('input[id^=filter_nat_]'));

		const dataNat = (nat as HTMLInputElement[])
			.map((el) => el.checked && (el.value as Nationalities['1.4']))
			.filter(Boolean) as Array<Nationalities['1.4']>;

		handle.filters.set<Nationalities['1.4']>('nat', dataNat);
		route(`${current.seed.value}`);
		retrieveUsers({
			seed: current.seed.value,
			gender: current.filters.gender(),
			nat: current.filters.nat(),
			lego: current.lego.peek(),
		});
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
				<div class="flex flex-col justify-center whitespace-nowrap">
					<label class="m-1">{t('Previous Seeds')}</label>
					<div class="flex flex-wrap justify-center">
						<select
							id="filter_seed"
							title={t('Previous Seeds')!}
							onChange={handleSeeds}
							class="mr-1 w-3/4 rounded bg-gray-900 text-gray-50"
							data-testid="test-seed-select"
						>
							<option id={`filter_seed_none`} value="" data-testid="test-seed-option-none" selected={false}>
								{`<${t('None')}>`}
							</option>
							{current.filters.seeds().map(
								(el, i) =>
									Boolean(el.seed) && (
										<option
											key={`filter_seed_${i}`}
											id={`filter_seed_${el.seed}`}
											value={el.seed}
											data-testid={`test-seed-option-${el.seed}`}
											selected={el.selected}
										>
											{el.seed}
										</option>
									),
							)}
						</select>
						<button
							class="ml-1"
							onClick={() => {
								// eslint-disable-next-line no-alert
								if (confirm(t('Clear previous seeds?')!)) {
									storage.del('seeds');
									handle.seed(
										handle.filters
											.get<Seed>('seeds', handle.filters.initial.seeds)
											.filter((el) => Boolean(el.selected))[0].seed,
									);
								}
							}}
						>
							🗑️
						</button>
					</div>
				</div>
				<div class="flex flex-col justify-center">
					<label class="m-1">{t('Genders')}</label>
					<div class="flex flex-wrap justify-center rounded bg-gray-900">
						{current.lego.value ? (
							<div class="text-4xl">🧱</div>
						) : (
							filters.gender.map((el, i) => (
								<div class="m-2" key={`filter_gender_${el}_${i}`}>
									<input
										type="checkbox"
										id={`filter_gender_${el}`}
										data-testid={`test_filter_gender_${el}`}
										name={`filter_gender_${el}`}
										class="mr-1"
										value={el}
										checked={current.filters.gender().includes(el as User['gender'])}
										onChange={handleGender}
									/>
									<label for={`filter_gender_${el}`}>{t(el)}</label>
								</div>
							))
						)}
						<button
							class="ml-1"
							onClick={() =>
								handle.notification(
									true,
									'normal',
									'In principle, the "Random User API" does not have options with non-cisgender sexual diversity',
								)
							}
						>
							ℹ️
						</button>
					</div>
				</div>
				<div class="flex flex-wrap justify-center">
					<label class="m-1">{t('Nationalities')}</label>
					<div class="flex w-full flex-wrap justify-center rounded bg-gray-900">
						{current.lego.value ? (
							<div class="text-4xl">🧱</div>
						) : (
							filters.nat.map((el, i) => (
								<div class="m-2" key={`filter_nat_${el}_${i}`}>
									<input
										type="checkbox"
										id={`filter_nat_${el}`}
										data-testid={`test_filter_nat_${el}`}
										name={`filter_nat_${el}`}
										class="mr-1"
										value={el}
										checked={current.filters.nat().includes(el as Nationalities['1.4'])}
										onChange={handleNat}
									/>
									<label for={`filter_nat_${el}`}>{t(el)}</label>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Filters;
