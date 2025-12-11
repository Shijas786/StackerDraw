/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("stream-browserify"),
                vm: require.resolve("vm-browserify"),
                buffer: require.resolve("buffer/"),
            };
        }
        return config;
    },
};

export default nextConfig;
