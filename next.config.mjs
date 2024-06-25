/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.jsonc$/,
            use: [
                {
                    loader: "jsonc-loader",
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
