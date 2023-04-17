import CardItem from '@/components/atom/RouletteItem';
import { current, handle } from '@/components/signals';
import { effect, signal } from '@preact/signals';
import './styles.css';

const spinRoulette = signal<NodeJS.Timer | null>(null);

effect(() => {
	if (current.spin.value) {
		spinRoulette.value = setInterval(() => {
			current.audio.value.click.currentTime = 0;
			current.audio.value.click.play();
			handle.angle(current.angle.value + 30);
		}, 150);
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
			onClick={() => handle.show(false)}
		>
			{users?.map((el) => (
				<CardItem id={`user-card-${el.angle}`} angle={el.angle} user={el} />
			))}
		</div>
	);
}

export default Roulette;
