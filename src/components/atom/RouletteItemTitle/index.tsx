import { CustomUser } from '@/classes/types';
import { current } from '@/components/signals';

type RouletteItemTitleProps = {
	user: CustomUser;
	classes: any;
};

function RouletteItemTitle({ user, classes }: RouletteItemTitleProps) {
	const { t } = current.i18next.value;

	return (
		<h3 class={`mb-2 text-center rounded bg-black bg-opacity-5 p-1 ${classes.text.title}`}>
			{[t(user.name.title), user.name.first, user.name.last].join(' ')}
		</h3>
	);
}

export default RouletteItemTitle;
