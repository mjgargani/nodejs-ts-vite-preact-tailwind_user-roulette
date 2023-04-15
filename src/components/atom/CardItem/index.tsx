import React from 'react';
import type Preact from 'preact';
import { type h } from 'preact';
import { CustomUser } from '@/classes/types';
import { handle, signals } from '@/app';
import { useTranslation } from 'react-i18next';
import { computed } from '@preact/signals';

type CardProps = {
	id?: string;
	testId?: string;
	angle: number;
	user?: CustomUser;
};

function CardItem({ id, testId, user, angle }: CardProps) {
	const { t } = useTranslation();

	return user ? (
		<div
			id={id}
			data-testid={testId}
			data-angle={user.angle}
			data-uuid={user.login.uuid}
			selected={true}
			class={`${
				true ? 'min-h-9/10 md:w-1/8 z-10 w-1/2' : 'min-h-3/4 z-0 w-1/3 md:w-1/12'
			} fixed top-0 flex origin-top cursor-pointer items-end rounded bg-gray-100 text-black shadow-lg transition-transform`}
			style={{
				transform: `rotate(calc(${angle}deg + ${signals.angle}deg))`,
			}}
			onClick={handle.angle}
		>
			<div class={`${true ? '' : 'opacity-50'} min-w-full`}>
				<div class="m-1">
					<h3 class="mb-2 text-center text-xl">{[t(user.name.title), user.name.first, user.name.last].join(' ')}</h3>
					<p class="mb-2 text-center text-xl">
						<span class="mr-2">{t(user.gender)}</span>
						<span>{t(user.nat)}</span>
					</p>
					<p class="text-l mb-2 text-center text-gray-500">
						<span>{Math.floor((Date.now() - new Date(user.dob.date).getTime()) / 31536000000)} anos</span>
					</p>
					<section id="main-user-card-details" data-expanded={true} class={true ? '' : 'hidden'}>
						<h4 class="mb-2 rounded bg-gray-300 text-center text-base">{t('Address')}</h4>
						<ul>
							<li class="mb-2 text-sm">{`${user.location.street.name}, ${user.location.street.number}`}</li>
							<li class="mb-2 text-sm">{`${user.location.city} - ${user.location.state}, ${t(
								user.location.country,
							)}`}</li>
						</ul>
					</section>
					<div
						data-testid={`test_user_card_picture_${user.angle}`}
						style={{
							backgroundImage: `url(${true ? user.picture.large : user.picture.thumbnail})`,
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							filter: true ? '' : 'blur(4px)',
						}}
						class="h-36 min-w-min rounded"
					/>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}

export default CardItem;
