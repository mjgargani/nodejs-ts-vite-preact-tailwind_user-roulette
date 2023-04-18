import React from 'preact/compat';

function Shields() {
	return (
		<div class="absolute -top-9 left-0 z-50 flex w-fit origin-bottom-left rotate-90 flex-row p-1 md:left-0 md:top-0 md:rotate-0 md:flex-col">
			<div class="m-1">
				<a
					href="https://github.com/mjgargani/nodejs-ts-vite-preact-tailwind_user-roulette/releases"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src="https://img.shields.io/github/package-json/v/mjgargani/nodejs-ts-vite-preact-tailwind_user-roulette"
						alt="Latest release"
					/>
				</a>
			</div>
			<div class="m-1">
				<a
					href="https://github.com/mjgargani/nodejs-ts-vite-preact-tailwind_user-roulette"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src="https://img.shields.io/github/stars/mjgargani/nodejs-ts-vite-preact-tailwind_user-roulette?style=social"
						alt="Repo stars"
					/>
				</a>
			</div>
		</div>
	);
}

export default Shields;
