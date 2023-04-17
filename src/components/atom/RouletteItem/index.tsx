import React from 'preact/compat';
import type Preact from 'preact';
import { type h } from 'preact';

import { type CustomUser } from '@/classes/types';
import { batch, computed } from '@preact/signals';
import { current, handle, signals } from '@/components/signals';
import { twClasses, additionalStyles } from './style';
import RouletteItemPicture from '../RouletteItemPicture';
import RouletteItemDetails from '../RouletteItemDetails';
import RouletteItemTitle from '../RouletteItemTitle';

type CardProps = {
	id?: string;
	testId?: string;
	angle: number;
	user?: CustomUser;
};

function CardItem({ id, testId, user, angle }: CardProps) {
	if (!user) return <></>;
	const { t } = current.i18next.value;

	const isSelected = computed(() => current.selected.value === user?.login.uuid).value;
	const classes = twClasses(isSelected, user);
	const styles = additionalStyles(angle, user);

	const handleClick = ({ target }: Event) => {
		current.audio.value.click.currentTime = 0;
		current.audio.value.click.play();
		const { dataset } = target as HTMLDivElement;
		batch(() => {
			handle.selected(dataset.uuid!);
		});
	};

	return (
		<div
			id={id}
			data-testid={`${testId ?? ''}${isSelected ? '_selected' : ''}`}
			data-angle={angle}
			data-uuid={user.login.uuid}
			data-selected={isSelected}
			class={`${classes.container} absolute top-0 flex h-2 origin-top select-none items-end rounded text-black shadow-lg`}
			style={styles}
			onClick={handleClick}
		>
			<div class={`${classes.content} pointer-events-none min-w-full`}>
				<div class="m-1">
					<RouletteItemTitle user={user} classes={classes} />
					<RouletteItemDetails isSelected={isSelected} user={user} classes={classes} />
					<RouletteItemPicture isSelected={isSelected} angle={angle} classes={classes} />
				</div>
			</div>
		</div>
	);
}

export default CardItem;
