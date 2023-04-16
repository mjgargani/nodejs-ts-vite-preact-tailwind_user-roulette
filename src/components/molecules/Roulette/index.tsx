import CardItem from '@/components/atom/RouletteItem';
import { current, handle } from '@/components/signals';
import { effect, signal } from '@preact/signals';

const spinRoulette = signal<NodeJS.Timer | null>(null);

effect(() => {
	if (current.spin.value) {
		spinRoulette.value = setInterval(() => {
			handle.angle(current.angle.value + 60);
		}, 100);
	} else {
		spinRoulette.value && clearInterval(spinRoulette.value);
	}
});

function Roulette() {
	return (
		<div
			id="roulette-container"
			class={`m-0 flex justify-center`}
			style={{
				transition: 'all 2s',
			}}
		>
			<CardItem angle={0} user={current.users.results?.value?.[0]} />
			<CardItem angle={30} user={current.users.results?.value?.[1]} />
			<CardItem angle={60} user={current.users.results?.value?.[2]} />
			<CardItem angle={90} user={current.users.results?.value?.[3]} />
			<CardItem angle={120} user={current.users.results?.value?.[4]} />
			<CardItem angle={150} user={current.users.results?.value?.[5]} />
			<CardItem angle={180} user={current.users.results?.value?.[6]} />
			<CardItem angle={210} user={current.users.results?.value?.[7]} />
			<CardItem angle={240} user={current.users.results?.value?.[8]} />
			<CardItem angle={270} user={current.users.results?.value?.[9]} />
			<CardItem angle={300} user={current.users.results?.value?.[10]} />
			<CardItem angle={330} user={current.users.results?.value?.[11]} />
		</div>
	);
}

export default Roulette;
