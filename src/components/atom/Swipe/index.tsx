import { current, handle } from '@/components/signals';
import { batch } from '@preact/signals';

function Swipe() {
	const handleSwipe = (e: Event) => {
		e.preventDefault();
		batch(() => {
			handle.swipe(Number((e.target! as HTMLInputElement).value));
			handle.show(false);
		});
	};

	return (
		<div class="fixed h-full w-full m-0 p-0 top-0 z-40 opacity-0 md:hidden">
			<input
				type="range"
				min="0"
				max="2"
				class="h-full w-full"
				value={current.swipe}
				onInput={handleSwipe}
				onPointerUp={() => handle.swipe(1)}
			/>
		</div>
	);
}

export default Swipe;
