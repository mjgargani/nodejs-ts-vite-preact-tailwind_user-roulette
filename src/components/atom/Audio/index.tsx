// Fyi: https://developer.chrome.com/blog/autoplay/
import React from 'preact/compat';

import { handle } from '@/components/signals';
import { useEffect, useRef } from 'preact/hooks';

type AudioProps = {
	name: string;
	src: Array<['mp3' | 'wav' | 'ogg', string]>;
};

function Audio({ name, src = [] }: AudioProps) {
	const ref = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (Boolean(name) && Boolean(ref.current)) {
			handle.audio(name, ref.current!);
		}
	}, [name, ref]);

	if (!ref) return <></>;

	return (
		<audio ref={ref} id={`audio_${name}`} controls={false} preload="auto" loop={false} autoPlay={false} volume={0.5}>
			{Boolean(src.length) && src.map((el, i) => <source key={i} src={el[1]} type={`audio/${el[0]}`} />)}
		</audio>
	);
}

export default Audio;
