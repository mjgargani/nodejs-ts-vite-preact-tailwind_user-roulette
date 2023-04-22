import React from 'preact/compat';

import { type CustomUser } from '@/classes/types';
import { current } from '@/components/signals';
import currentAge from '@/utils/currentAge';

type RouletteItemDetailsProps = {
	isSelected: boolean;
	user: CustomUser;
	classes: Record<string, Record<string, string> | string>;
};

function RouletteItemDetails({ isSelected, user, classes }: RouletteItemDetailsProps) {
	const { t } = current.i18next.value;

	return (
		<section id="main-user-card-details" data-expanded={isSelected} class={classes.address as string}>
			<p class="mb-2 text-center text-sm md:text-xl">
				{!current.lego.value && <span class="mr-2">{t(user.gender)}</span>}
				<span>{t(user.nat.toLocaleLowerCase())}</span>
			</p>
			<p class="mb-2 rounded bg-black/5 text-center text-sm md:text-base">
				<span>{currentAge(user.dob.date)} anos</span>
			</p>
			<h4 class="mb-2 rounded bg-black/5 text-center text-sm md:text-base">{t('Address')}</h4>
			<ul>
				<li class="mb-2 text-sm">{`${user.location.city} - ${user.location.state}, ${t(user.location.country)}`}</li>
			</ul>
		</section>
	);
}

export default RouletteItemDetails;
