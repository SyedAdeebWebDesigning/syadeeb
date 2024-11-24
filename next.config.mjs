const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.aceternity.com",
                port: "",
            }, {
                protocol: "https",
                hostname: "api.microlink.io",
                port: "",
            }, {
                protocol: "https",
                hostname: "example.com",
                port: "",
            },
        ],
    },
};

export default nextConfig;
