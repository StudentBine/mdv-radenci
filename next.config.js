/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
    },
    // Webpack configuration for module resolution
    webpack: (config, { isServer }) => {
        config.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];
        return config;
    },
}

module.exports = nextConfig
