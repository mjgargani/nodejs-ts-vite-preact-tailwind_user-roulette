import React from 'preact/compat';

import { current } from '@/components/signals';

type RouletteItemPictureProps = {
	isSelected: boolean;
	angle: number;
	classes: any;
};

function RouletteItemPicture({ isSelected, angle, classes }: RouletteItemPictureProps) {
	return (
		<div
			data-testid={`test-user-card-picture-${angle}${isSelected ? '_selected' : ''}`}
			style={{
				backgroundImage: `url(${classes.picture.size as string})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				filter: classes.picture.blur as string,
				borderRadius: current.lego.value ? '3%' : '1000px 1000px 9999px 9999px',
			}}
			class={`${classes.picture.height as string} min-w-min`}
		/>
	);
}

export default RouletteItemPicture;
