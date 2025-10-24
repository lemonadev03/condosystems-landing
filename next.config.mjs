/** @type {import('next').NextConfig} */
const nextConfig = {
  // MIGRATED: Removed 'eslint' config (no longer supported in Next.js 16)
  // ESLint configuration should now be in .eslintrc.json or eslint.config.js
  // If you want to ignore ESLint during builds, use: npm run build --no-lint
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig