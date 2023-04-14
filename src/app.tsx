import React, { TargetedEvent } from 'preact/compat';
import type Preact from 'preact';

import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import RandomUser from './classes/RandomUser';
import Card from './components/Card';
import MainContainer from './components/MainContainer';
import { type CustomUser, type RandomUserResponse } from './classes/types';
import { nanoid } from 'nanoid';
import closeRound from './utils/closeRound';
import { useTranslation, withTranslation } from 'react-i18next';

function App() {
	const [users, setUsers] = useState<RandomUserResponse>();
	const [isUpdating, setIsUpdating] = useState<boolean>(true);
	const [seed, setSeed] = useState<string>('123');
	const [baseAngle, setBaseAngle] = useState<number>(180);
	const [targetAngle, setTargetAngle] = useState<number>(0);

	const { t } = useTranslation();

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
					const colors = ['red', 'blue', 'green', 'yellow', 'gray'];
					const results: CustomUser[] = (response as RandomUserResponse).results.map((el, i) => ({
						...el,
						angle: i * 30,
						bgColor: `bg-${colors[Math.floor(Math.random() * colors.length)]}-100`,
					}));
					const newUsers = { ...(response as RandomUserResponse), results };
					setUsers(newUsers as RandomUserResponse);
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
		const speed = Number((Math.abs(diff) / 10).toFixed(1));

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
			(users.results as CustomUser[]).map((el) => {
				const isSelected = closeRound(el.angle) === closeRound(baseAngle);
				return (
					<div
						key={`${el.angle}_${el.login.uuid}`}
						data-angle={el.angle}
						data-uuid={el.login.uuid}
						selected={isSelected}
						// eslint-disable-next-line tailwindcss/no-custom-classname
						class={`${
							isSelected ? 'min-h-9/10 md:w-1/8 z-10 w-1/2' : 'min-h-3/4 z-0 w-1/3 md:w-1/12'
						} fixed top-0 flex origin-top cursor-pointer items-end rounded bg-gray-100 text-black shadow-lg`}
						style={{
							transform: `rotate(calc(${el.angle}deg - ${baseAngle}deg))`,
						}}
						onClick={handleTargetAngle}
					>
						<Card id={`user_card_${el.angle}`} testId={`test_user_card_${el.angle}`}>
							<div class={`${isSelected ? '' : 'opacity-50'} min-w-full`}>
								<div class="m-1">
									<h3 class="mb-2 text-center text-xl">{[t(el.name.title), el.name.first, el.name.last].join(' ')}</h3>
									<p class="mb-2 text-center text-xl">
										<span class="mr-2">{t(el.gender)}</span>
										<span>{t(el.nat)}</span>
									</p>
									<p class="text-l mb-2 text-center text-gray-500">
										<span>{Math.floor((Date.now() - new Date(el.dob.date).getTime()) / 31536000000)} anos</span>
									</p>
									<section id="main-user-card-details" data-expanded={isSelected} class={isSelected ? '' : 'hidden'}>
										<h4 class="mb-2 rounded bg-gray-300 text-center text-base">{t('Address')}</h4>
										<ul>
											<li class="mb-2 text-sm">{`${el.location.street.name}, ${el.location.street.number}`}</li>
											<li class="mb-2 text-sm">{`${el.location.city} - ${el.location.state}, ${t(
												el.location.country,
											)}`}</li>
										</ul>
									</section>
									<div
										data-testid={`test_user_card_picture_${el.angle}`}
										style={{
											backgroundImage: `url(${isSelected ? el.picture.medium : el.picture.thumbnail})`,
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
											backgroundPosition: 'center',
											filter: isSelected ? '' : 'blur(4px)',
										}}
										class="h-36 min-w-min rounded"
									/>
								</div>
							</div>
						</Card>
					</div>
				);
			}),
		[users, baseAngle],
	);

	return users?.results.length ? (
		<MainContainer>
			<div class="absolute bottom-0 max-h-min max-md:flex max-md:flex-col md:whitespace-nowrap">
				<label for="seed" class="mr-2 min-w-full text-center">
					Seed:
				</label>
				<input
					id="seed"
					type="text"
					value={seed}
					onInput={handleSeed}
					class="mr-2"
					disabled={isUpdating}
					data-testid="test-input-seed"
				/>
				<button
					onClick={() => {
						handleSeed({ target: { value: () => nanoid() } });
					}}
					disabled={isUpdating}
					data-testid="test-btn-random-seed"
				>
					🎲
				</button>
			</div>
			{userCards()}
			<div class="fixed -top-24 z-20 flex h-1/4 w-1/12 origin-top rounded-full bg-violet-100 shadow-lg" />
		</MainContainer>
	) : (
		<></>
	);
}

export default withTranslation()(App);
