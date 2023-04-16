import CardItem from '@/components/atom/RouletteItem';
import { current, handle } from '@/components/signals';
import { effect, signal } from '@preact/signals';
import './styles.css';

const spinRoulette = signal<NodeJS.Timer | null>(null);

effect(() => {
	if (current.spin.value) {
		spinRoulette.value = setInterval(() => {
			handle.angle(current.angle.value + 30);
		}, 100);
	} else {
		spinRoulette.value && clearInterval(spinRoulette.value);
	}
});

function Roulette() {
	const users = current.users.results.value;

	return (
		<div
			id="roulette-container"
			class={`m-0 flex justify-center`}
			style={{
				transition: 'all 2s',
			}}
		>
			{users?.map((el) => (
				<CardItem angle={el.angle} user={el} />
			))}
		</div>
	);
}

export default Roulette;
