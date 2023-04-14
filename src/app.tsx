import React, { TargetedEvent } from 'preact/compat';

import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import RandomUser from './classes/RandomUser';
import Card from './components/Card';
import MainContainer from './components/MainContainer';
import { type RandomUserResponse } from './classes/types';
import { nanoid } from 'nanoid';
import closeRound from './utils/closeRound';

export function App() {
	const [users, setUsers] = useState<RandomUserResponse>();
	const [isUpdating, setIsUpdating] = useState<boolean>(true);
	const [seed, setSeed] = useState<string>('123');
	const [baseAngle, setBaseAngle] = useState<number>(180);
	const [targetAngle, setTargetAngle] = useState<number>(0);

	const handleTargetAngle = ({ target }: any) => {
		setTargetAngle(target?.dataset.angle as number);
	};

	const handleSeed = ({ target }: any) => {
		setSeed(target?.value as string);
		setBaseAngle(180);
		setTargetAngle(0);
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
				exc: ['registered', 'id'],
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
		const abs = targetAngle - baseAngle;
		const diff = abs > 180 ? abs - 360 : abs < -180 ? abs + 360 : abs;
		const speed = Number((Math.abs(diff) / 20).toFixed(2));

		if (diff > 0) {
			setBaseAngle(baseAngle > 359 ? 0 : closeRound(baseAngle + speed, 'ceil'));
		}

		if (diff < 0) {
			setBaseAngle(baseAngle < 0 ? 359 : closeRound(baseAngle - speed, 'floor'));
		}
	}, [baseAngle, targetAngle]);

	const userCards = useCallback(
		() =>
			users?.results.length &&
			users.results.map((el, i) => {
				const angle = i * 30;
				return (
					<div
						key={`${angle}_${el.login.uuid}`}
						data-angle={angle}
						data-uuid={el.login.uuid}
						selected={angle === baseAngle}
						// eslint-disable-next-line tailwindcss/no-custom-classname
						class={`min-h-3/4 fixed top-0 flex w-max origin-top items-end bg-green-600`}
						style={{
							transform: `rotate(calc(${angle}deg - ${baseAngle}deg))`,
						}}
						onClick={handleTargetAngle}
					>
						<Card id={`user_card_${angle}`} testId={`test_user_card_${angle}`}>
							<p>{angle}</p>
							<p>{[el.name.title, el.name.first, el.name.last].join(' ')}</p>
						</Card>
					</div>
				);
			}),
		[users, baseAngle],
	);

	return (
		users?.results.length && (
			<MainContainer>
				<div class="absolute bottom-0 max-h-min whitespace-nowrap">
					<label for="seed" class="min-w-full text-center mr-2">
						Seed:
					</label>
					<input id="seed" type="text" value={seed} onInput={handleSeed} class="mr-2" />
					<button onClick={() => handleSeed({ target: { value: () => nanoid() } })}>🎲</button>
				</div>

				{userCards()}
			</MainContainer>
		)
	);
}
