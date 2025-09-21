/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
// import { visualizer } from 'rollup-plugin-visualizer'
// import strip from '@rollup/plugin-strip'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // strip({
    //   include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    //   functions: ['console.log'],
    // }),
    // visualizer({
    //   open: true,
    //   filename: 'stats.html',
    //   template: 'sunburst',
    // }),
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
        // pure_funcs: ['console.log'],
        // ถ้าต้องการเก็บ console.error ให้คอมเมนต์บรรทัดบนแล้วใช้ pure_funcs แทน
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
      },
      format: {
        comments: false, // ถ้าต้องการเก็บ console.log ให้คอมเมนต์บรรทัดบนแล้วใช้ pure_funcs แทน
      },
    },
    rollupOptions: {
      output: {
        // ชื่อไฟล์แบบแฮช พร้อมแคชดี ๆ
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',

        manualChunks: {
          react: ['react', 'react-dom'],
          tanstack: [
            '@tanstack/react-query',
            '@tanstack/react-router',
            '@tanstack/react-router-devtools',
          ],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-http-backend',
            'i18next-browser-languagedetector',
          ],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          radix: [
            '@radix-ui/react-checkbox',
            '@radix-ui/react-select',
            '@radix-ui/react-switch',
          ],
          ui: [
            'react-modal',
            'react-toastify',
            'react-confirm',
            '@uiw/react-color',
          ],
          net: ['axios', 'socket.io-client'],
          icons: ['lucide-react', 'omoo-icons'],
          utils: ['tailwind-merge', 'react-scan', 'clsx'],
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
  optimizeDeps: {
    // preload deps ที่ใช้ตอน dev เท่านั้น (prod จะใช้ rollup)
    include: ['react', 'react-dom'],
  },
})
