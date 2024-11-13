import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: 'Avenir, Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif'
			},
			borderWidth: {
				'6': '6px'
			}
		},
	},
	plugins: [typography],
}
