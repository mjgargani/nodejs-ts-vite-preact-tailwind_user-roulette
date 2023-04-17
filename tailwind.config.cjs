/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
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
