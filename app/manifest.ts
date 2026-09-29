import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JOJO - Socios tecnológicos',
    short_name: 'JOJO',
    description: 'Transformamos ideas en soluciones digitales inteligentes.',
    start_url: '/es',
    display: 'standalone',
    background_color: '#0e100f',
    theme_color: '#0e100f',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
