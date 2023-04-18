import React from 'preact/compat';

function Shields() {
	return (
		<div class="absolute right-0 top-0 z-50 flex w-fit flex-col p-1">
			<div class="mb-1 flex justify-end">
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
			<div class="flex justify-end">
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
