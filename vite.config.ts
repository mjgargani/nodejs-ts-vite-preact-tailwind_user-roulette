/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import postcssPresetEnv from 'postcss-preset-env';
import tailWindCss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(), viteTsconfigPaths()],
	css: {
		postcss: {
			plugins: [postcssPresetEnv({ stage: 4 }), tailWindCss],
		},
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
