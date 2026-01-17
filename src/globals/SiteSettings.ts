import { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'site-setting',
  label: 'Site Settings',
  fields: [
    {
      name: 'code',
      type: 'code',
      label: 'Head Code Snippet',
      admin: {
        language: 'html',
      },
    },
    // {
    //   name: 'isActive',
    //   type: 'checkbox',
    //   defaultValue: true,
    // },
  ],
}

export default SiteSettings
