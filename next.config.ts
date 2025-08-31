import type { NextConfig } from 'next'

import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

export default withNextIntl({
  experimental: {
    authInterrupts: true
  }
}) as NextConfig
