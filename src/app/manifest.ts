import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Scryven',
    short_name: 'Scryven',
    description: 'Planejar menos. Executar mais.',
    start_url: '/app/today',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FAF9F7',
    theme_color: '#4A8A4A',
    icons: [
      {
        src: '/pwa-icon-512.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
