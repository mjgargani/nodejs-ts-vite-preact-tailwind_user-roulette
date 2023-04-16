import { CustomUser } from '@/classes/types';
import { current } from '@/components/signals';

export default (isSelected: boolean, user: CustomUser) => ({
	container: `${isSelected ? 'min-h-9/10 md:w-1/8 z-10 w-1/2' : 'min-h-3/4 z-0 w-1/3 md:w-1/12'} ${
		current.lego.value ? 'rounded-b' : 'rounded-b-full'
	}`,
	content: isSelected ? '' : 'opacity-20',
	address: isSelected ? '' : 'max-h-0 overflow-y-hidden',
	picture: {
		size: isSelected ? user.picture.large : user.picture.thumbnail,
		blur: isSelected ? '' : 'blur(2px)',
		height: isSelected ? 'h-36' : 'h-24',
	},
	text: {
		title: isSelected ? 'text-xl md:text-2xl' : 'text-lg md:text-xl',
	},
});
