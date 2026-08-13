import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000
      },
      includeAssets: ['favicon.svg', 'pwa-192x192.png', 'pwa-512x512.png', 'assets/**/*'],
      manifest: {
        name: 'Ficha 3DeT',
        short_name: '3DeT',
        description: 'Ficha interativa para 3DeT Victory com rolagens em 3D',
        theme_color: '#0f0f12',
        background_color: '#0f0f12',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/3detficha/',
})
