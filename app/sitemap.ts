import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const languages = {
    'es-AR': `${SITE_URL}/es`,
    'en-US': `${SITE_URL}/en`,
    'x-default': `${SITE_URL}/es`,
  }

  return [
    {
      url: `${SITE_URL}/es`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages },
    },
  ]
}
