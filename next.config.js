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
    webpack: (config) => {
        config.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];
        return config;
    },
}

module.exports = nextConfig
