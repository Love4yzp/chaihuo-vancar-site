// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';

const BUILD_TARGET = process.env.BUILD_TARGET || 'cloudflare';

const adapters = {
  cloudflare: cloudflare(),
  node: node({ mode: 'standalone' }),
};

if (!adapters[BUILD_TARGET]) {
  throw new Error(`Invalid BUILD_TARGET: ${BUILD_TARGET}. Use 'cloudflare' or 'node'.`);
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: adapters[BUILD_TARGET],
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },
  // 注意：不添加 server 配置！保持 Astro 默认行为。
  // - `astro dev` 使用 Astro 默认端口 4321，host: localhost
  // - `node dist/server/entry.mjs` (生产) 由运行时 HOST/PORT 环境变量控制
});