import { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'site-setting',
  label: 'Site Settings',
  fields: [
    {
      name: 'adsenseEnabled',
      label: 'Enable AdSense',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'adsenseClientId',
      label: 'AdSense Client ID',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.adsenseEnabled,
      },
    },
    {
      name: 'gaEnabled',
      label: 'Enable Google Analytics',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'gaMeasurementId',
      label: 'GA4 Measurement ID',
      type: 'text',
      admin: {
        placeholder: 'G-XXXXXXXXXX',
        condition: (_, siblingData) => siblingData.gaEnabled,
      },
    },
  ],
}

export default SiteSettings
