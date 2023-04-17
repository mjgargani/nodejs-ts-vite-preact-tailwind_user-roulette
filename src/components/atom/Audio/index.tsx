import { handle } from '@/components/signals';
import { useEffect, useRef } from 'preact/hooks';

type AudioProps = {
	name: string;
	src: Array<['mp3' | 'wav' | 'ogg', string]>;
};

function Audio({ name, src = [] }: AudioProps) {
	const ref = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (!!name && !!ref.current) {
			handle.audio(name, ref.current);
		}
	});

	return (
		<audio ref={ref} id={`audio_${name}`} controls={false} preload="auto" loop={false} autoPlay={false} volume={0.5}>
			{!!src.length && src.map((el, i) => <source key={i} src={el[1]} type={`audio/${el[0]}`} />)}
		</audio>
	);
}

export default Audio;
