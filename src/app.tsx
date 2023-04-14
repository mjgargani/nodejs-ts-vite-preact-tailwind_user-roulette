import React, { TargetedEvent } from 'preact/compat';

import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import RandomUser from './classes/RandomUser';
import Card from './components/Card';
import MainContainer from './components/MainContainer';
import { type RandomUserResponse } from './classes/types';

export function App() {
	const [users, setUsers] = useState<RandomUserResponse>();
	const [isUpdating, setIsUpdating] = useState<boolean>(true);
	const [seed, setSeed] = useState<string>('123');
	const [rouletteRotationBase, setRouletteRotationBase] = useState<number>(0);
	const [angleSelect, setAngleSelect] = useState<number>(0);
	const [direction, setDirection] = useState<'left' | 'right' | false>(false);

	const handleAngleSelect = ({ target }: any) => {
		console.log(target?.data);
		setAngleSelect(target?.dataset.angle as number);
	};

	const handleSeed = ({ target }: any) => {
		setSeed(target?.value as string);
		setRouletteRotationBase(180);
		setAngleSelect(0);
	};

	const retriveUsers = useCallback(
		async (e?: Event) => {
			e?.preventDefault?.();

			setIsUpdating(true);

			const data: RandomUser = new RandomUser({
				results: 12,
				seed,
				format: 'json',
				nat: ['br'],
				exc: ['login', 'registered', 'id'],
			});

			return data
				.retrieve()
				.then((response) => {
					setUsers(response as RandomUserResponse);
				})
				.catch((error) => {
					console.error(error);
					return false;
				})
				.finally(() => {
					setIsUpdating(false);
					return true;
				});
		},
		[seed],
	);

	useEffect(() => {
		if (seed && retriveUsers) retriveUsers();
	}, [seed, retriveUsers]);

	useEffect(() => {
		const diff = 360 - Math.abs(rouletteRotationBase - angleSelect);

		if (direction === false && diff > 0) {
			setDirection(diff > 180 ? 'left' : 'right');
		}

		if (direction !== false && diff > 0) {
			if (direction === 'right') {
				setRouletteRotationBase(rouletteRotationBase > 360 ? 0 : rouletteRotationBase + 1);
			} else if (direction === 'left') {
				setRouletteRotationBase(rouletteRotationBase <= 0 ? 360 : rouletteRotationBase - 1);
			}
		}

		if (diff <= 0) {
			setDirection(false);
		}
	}, [rouletteRotationBase, angleSelect, direction]);

	return (
		<MainContainer>
			<form class="absolute bottom-0 flex max-h-min flex-col">
				<label for="seed" class="min-w-full text-center">
					Seed: {seed}
				</label>
				<input id="seed" type="text" value={seed} onInput={handleSeed} />
				<p for="roulette-test" class="min-w-full text-center mt-2">
					{rouletteRotationBase}deg
				</p>
				<p for="roulette-test" class="min-w-full text-center mt-2">
					selected {angleSelect}deg
				</p>
				<p>diff {Math.abs(rouletteRotationBase - angleSelect)}</p>
				<p>direction {direction}</p>
			</form>

			{users?.results.length &&
				users.results.map((el, i) => {
					const angle = i * 30;
					const angleId = 360 - angle;
					return (
						<div
							key={`${angle}_${Date.now()}`}
							data-angle={angleId}
							selected={angleSelect === angle}
							// eslint-disable-next-line tailwindcss/no-custom-classname
							class={`min-h-3/4 fixed top-0 flex w-max origin-top items-end bg-green-600 transition-all duration-500`}
							style={{
								transform: `rotate(calc(${angle}deg + ${rouletteRotationBase}deg))`,
							}}
							onClick={handleAngleSelect}
						>
							<Card id={`user_card_${angle}`} testId={`test_user_card_${angle}`}>
								<p>{angleId}</p>
								<p>{[el.name.title, el.name.first, el.name.last].join(' ')}</p>
							</Card>
						</div>
					);
				})}
		</MainContainer>
	);
}
