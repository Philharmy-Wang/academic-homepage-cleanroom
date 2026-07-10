// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://philharmy-wang.github.io',
  base: '/academic-homepage-cleanroom',
  output: 'static',
  trailingSlash: 'always',
});
