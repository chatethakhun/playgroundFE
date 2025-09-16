/// <reference types="vitest/config" />
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { resolve } from 'node:path'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import strip from '@rollup/plugin-strip'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    strip({
      include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      functions: ['console.log'],
    }),
    visualizer({
      open: true,
      filename: 'stats.html',
      template: 'sunburst',
    }),
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2,
        drop_console: true,
        drop_debugger: true,
        // ถ้าต้องการเก็บ console.error ให้คอมเมนต์บรรทัดบนแล้วใช้ pure_funcs แทน
        // pure_funcs: ['console.info', 'console.debug', 'console.warn'],
      },
      format: {
        comments: false, // ถ้าต้องการเก็บ console.log ให้คอมเมนต์บรรทัดบนแล้วใช้ pure_funcs แทน
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react') || id.includes('scheduler')) return 'react'
          if (id.includes('i18next')) return 'i18n'
          if (id.includes('react-router')) return 'router'
          if (id.includes('lodash')) return 'lodash'
          if (id.includes('date-fns') || id.includes('dayjs')) return 'date'
        },
      },
    },
  },
  define: {
    __DEV__: true,
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
