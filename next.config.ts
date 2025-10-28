import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default withNextIntl(nextConfig)
