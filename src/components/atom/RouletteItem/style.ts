import { type CustomUser } from '@/classes/types';
import { current, signals } from '@/components/signals';

export const twClasses = (isSelected: boolean, user: CustomUser) => ({
	container: `${
		isSelected ? 'min-h-9/10 md:w-1/8 2xl:w-1/12 z-10 w-1/2' : 'min-h-3/4 z-0 w-1/3 md:w-1/12 2xl:w-1/16 brightness-75'
	} ${current.lego.value ? 'rounded-b' : 'rounded-b-full'} ${current.loading.value ? '' : 'cursor-pointer'}`,
	content: isSelected ? '' : 'opacity-20',
	address: isSelected ? '' : 'max-h-0 overflow-y-hidden',
	picture: {
		size: isSelected ? user.picture.large : user.picture.thumbnail,
		blur: isSelected ? '' : 'blur(2px)',
		height: isSelected ? 'h-36' : 'h-24',
	},
	text: {
		title: isSelected ? 'text-lg md:text-2xl' : 'text-sm md:text-xl',
	},
});

export const additionalStyles = (angle: number, user: CustomUser) => ({
	backgroundColor: current.lego.value ? user.color : 'Snow',
	backgroundImage: current.lego.value
		? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='10' fill='black' fill-opacity='0.1'/%3E%3C/svg%3E")`
		: null,
	backgroundSize: current.lego.value ? '40' : null,
	transform: `rotate(calc(${angle}deg + ${signals.angle.value}deg))`,
});
