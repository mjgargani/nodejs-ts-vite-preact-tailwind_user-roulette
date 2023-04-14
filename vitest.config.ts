/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
	define: {
		'import.meta.vitest': 'undefined',
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./src/__test__/test-setup.ts'],
		includeSource: ['./src/**/*.{ts,tsx}'],
		coverage: {
			reporter: ['json-summary', 'text'],
			exclude: ['src/**/*d.ts', 'src/index.tsx', 'src/**/types.ts'],
		},
		mockReset: true,
		restoreMocks: true,
	},
});
