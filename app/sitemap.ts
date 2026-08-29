import { MetadataRoute } from 'next'

const baseUrl = 'https://jojo.ar'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const languages = {
    'es-AR': `${baseUrl}/es`,
    'en-US': `${baseUrl}/en`,
    'x-default': `${baseUrl}/es`,
  }

  return [
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages },
    },
  ]
}
