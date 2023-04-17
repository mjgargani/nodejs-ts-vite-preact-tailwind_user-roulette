import React from 'preact/compat';
import { type CustomUser } from '@/classes/types';
import { current } from '@/components/signals';

type RouletteItemTitleProps = {
	user: CustomUser;
	classes: any;
};

function RouletteItemTitle({ user, classes }: RouletteItemTitleProps) {
	const { t } = current.i18next.value;

	return (
		<h3 class={`mb-2 rounded bg-black/5 p-1 text-center ${classes.text.title as string}`}>
			{[t(user.name.title), user.name.first, user.name.last].join(' ')}
		</h3>
	);
}

export default RouletteItemTitle;
