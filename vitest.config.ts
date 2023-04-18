/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
	define: {
		'import.meta.vitest': 'undefined',
	},
	test: {
		//https://github.com/vitest-dev/vitest/issues/2008
		threads: false,
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/__test__/test-setup.ts'],
		includeSource: ['./src/**/*.{ts,tsx}'],
		coverage: {
			reporter: ['json-summary', 'text'],
			exclude: ['src/**/*d.ts', 'src/index.tsx', 'src/**/types.ts'],
		},
		mockReset: true,
		restoreMocks: true,
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
