import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getSiteSettings() {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'site-setting',
  })

  return settings
}
