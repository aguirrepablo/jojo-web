import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const SERVICE_SLUGS = ['software-a-medida', 'automatizacion', 'asistente-whatsapp-ia', 'paginas-web']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
