import { current } from '@/components/signals';

type RouletteItemPictureProps = {
	angle: number;
	classes: any;
};

function RouletteItemPicture({ angle, classes }: RouletteItemPictureProps) {
	return (
		<div
			data-testid={`test_user_card_picture_${angle}`}
			style={{
				backgroundImage: `url(${classes.picture.size})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				filter: classes.picture.blur,
				borderRadius: current.lego.value ? '3%' : '1000px 1000px 9999px 9999px',
			}}
			class={`${classes.picture.height} min-w-min`}
		/>
	);
}

export default RouletteItemPicture;
