// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  vite: {
    // @ts-expect-error Vite version mismatch between @tailwindcss/vite and astro
    plugins: [tailwindcss()],
  },
  output: 'hybrid',
  adapter: netlify(),
});