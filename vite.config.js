import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        cleanupOutdatedCaches: false,
        globPatterns: ['**/*.{js,scss,html,ico,png,svg,json,vue,txt,woff2}']
      },
      server: {
        host: '0.0.0.0',
      },
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Nome della tua app',
        short_name: 'Short Name',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/path/to/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});