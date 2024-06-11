/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __package = createRequire(__filename)('./package.json');

const nextConfig = {
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Add the node_modules directory to webpack's module resolution
    config.resolve.alias['cldr$'] = path.resolve(
      __dirname,
      'node_modules',
      'cldrjs'
    );
    config.resolve.alias['cldr/event$'] = path.resolve(
      __dirname,
      'node_modules',
      'cldrjs'
    );
    config.resolve.alias['cldr/supplemental$'] = path.resolve(
      __dirname,
      'node_modules',
      'cldrjs'
    );
    config.resolve.alias['tailwindcss/defaultTheme$'] = path.resolve(
      __dirname,
      'node_modules',
      'tailwindcss'
    );

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/manifest.json',
        destination: '/manifest.webmanifest',
      },
    ];
  },
  env: {
    version: __package.version,
  },
};

export default nextConfig;
