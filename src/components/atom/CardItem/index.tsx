import React from 'react';
import type Preact from 'preact';
import { type h } from 'preact';
import { User } from '@/classes/types';
import { current, handle, signals } from '@/app';
import { useTranslation } from 'react-i18next';
import { batch, computed } from '@preact/signals';

type CardProps = {
	id?: string;
	testId?: string;
	angle: number;
	user?: User;
};

function CardItem({ id, testId, user, angle }: CardProps) {
	if (!user) return <></>;

	const { t } = useTranslation();
	const targetAngle = 360 - angle;
	const isSelected = computed(() => current.selected.value === user?.login.uuid);
	const classes = {
		container: `${isSelected.value ? 'min-h-9/10 md:w-1/8 z-10 w-1/2' : 'min-h-3/4 z-0 w-1/3 md:w-1/12'} ${
			current.lego.value ? 'rounded-b' : 'rounded-b-full'
		}`,
		content: isSelected.value ? '' : 'opacity-20',
		address: isSelected.value ? '' : 'max-h-0 overflow-y-hidden',
		picture: {
			size: isSelected.value ? user.picture.large : user.picture.thumbnail,
			blur: isSelected.value ? '' : 'blur(2px)',
			height: isSelected.value ? 'h-36' : 'h-24',
		},
		text: {
			title: isSelected.value ? 'text-xl md:text-2xl' : 'text-lg md:text-xl',
		},
	};

	return (
		<div
			id={id}
			data-testid={testId}
			data-angle={angle}
			data-uuid={user.login.uuid}
			selected={isSelected}
			class={`${classes.container} absolute top-0 h-2 flex origin-top cursor-pointer items-end rounded text-black shadow-lg`}
			style={{
				backgroundColor: current.lego.value ? user.color : 'Snow',
				backgroundImage: current.lego.value
					? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='10' fill='black' fill-opacity='0.1'/%3E%3C/svg%3E")`
					: null,
				backgroundSize: current.lego.value ? '40' : null,
				transform: `rotate(calc(${angle}deg + ${signals.angle}deg))`,
			}}
			onClick={({ target: { dataset } }) => {
				batch(() => {
					handle.angle(targetAngle);
					handle.selected(dataset?.uuid);
				});
			}}
		>
			<div class={`${classes.content} min-w-full pointer-events-none`}>
				<div class="m-1">
					<h3 class={`mb-2 text-center rounded bg-black bg-opacity-5 p-1 ${classes.text.title}`}>
						{[t(user.name.title), user.name.first, user.name.last].join(' ')}
					</h3>
					<section id="main-user-card-details" data-expanded={isSelected} class={classes.address}>
						<p class="mb-2 text-center text-xl">
							<span class="mr-2">{t(user.gender)}</span>
							<span>{t(user.nat)}</span>
						</p>
						<p class="mb-2 rounded bg-black bg-opacity-5 text-center text-base">
							<span>{Math.floor((Date.now() - new Date(user.dob.date).getTime()) / 31536000000)} anos</span>
						</p>
						<h4 class="mb-2 rounded bg-black bg-opacity-5 text-center text-base">{t('Address')}</h4>
						<ul>
							<li class="mb-2 text-sm">{`${user.location.street.name}, ${user.location.street.number}`}</li>
							<li class="mb-2 text-sm">{`${user.location.city} - ${user.location.state}, ${t(
								user.location.country,
							)}`}</li>
						</ul>
					</section>
					<div
						data-testid={`test_user_card_picture_${angle}`}
						style={{
							backgroundImage: `url(${classes.picture.size})`,
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							filter: classes.picture.blur,
							borderRadius: current.lego.value ? '3%' : '1000px 1000px 9999px 9999px',
						}}
						class={`${classes.picture.height} min-w-min`}
					/>
				</div>
			</div>
		</div>
	);
}

export default CardItem;
