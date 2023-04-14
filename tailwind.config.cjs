/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				roulette: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			animation: {
				roulette: 'roulette 1s ease',
			},
			rotate: {
				0: '0deg',
				30: '30deg',
				60: '60deg',
				90: '90deg',
				120: '120deg',
				150: '150deg',
				180: '180deg',
				210: '210deg',
				240: '240deg',
				270: '270deg',
				300: '300deg',
				330: '330deg',
			},
			minHeight: {
				0: '0',
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%',
				'9/10': '90%',
				full: '100%',
			},
			width: {
				'1/8': '12.5%',
				'1/16': '6.25%',
			},
		},
	},
	plugins: [],
};
