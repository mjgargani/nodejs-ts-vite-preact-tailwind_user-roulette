/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
	define: {
		'import.meta.vitest': 'undefined',
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/__test__/test-setup.ts'],
		includeSource: ['./src/**/*.{ts,tsx}'],
		coverage: {
			reporter: ['json-summary', 'text'],
			exclude: ['src/**/*d.ts', 'src/index.tsx', 'src/**/types.ts'],
		},
		clearMocks: true,
		mockReset: true,
		restoreMocks: true,
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
