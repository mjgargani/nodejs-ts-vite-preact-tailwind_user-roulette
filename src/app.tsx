import React, { TargetedEvent } from 'preact/compat';

import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import RandomUser from './classes/RandomUser';
import Card from './components/Card';
import MainContainer from './components/MainContainer';
import { type RandomUserResponse } from './classes/types';
import { nanoid } from 'nanoid';

export function App() {
	const [users, setUsers] = useState<RandomUserResponse>();
	const [isUpdating, setIsUpdating] = useState<boolean>(true);
	const [seed, setSeed] = useState<string>('123');
	const [baseAngle, setBaseAngle] = useState<number>(0);

	const handleBaseAngle = ({ target }: any) => {
		console.log(target?.data);
		setBaseAngle(target?.dataset.angle as number);
	};

	const handleSeed = ({ target }: any) => {
		setSeed(target?.value as string);
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

	useEffect(() => {}, []);

	const userCards = useCallback(
		() =>
			users?.results.length &&
			users.results.map((el, i) => {
				const angle = baseAngle + i * 30;
				return (
					<div
						key={`${angle}_${el.login.uuid}`}
						data-angle={angle}
						data-uuid={el.login.uuid}
						// eslint-disable-next-line tailwindcss/no-custom-classname
						class={`min-h-3/4 fixed top-0 flex w-max origin-top items-end bg-green-600`}
						style={{
							transform: `rotate(calc(${angle}deg - ${baseAngle}deg))`,
						}}
						onClick={handleBaseAngle}
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
