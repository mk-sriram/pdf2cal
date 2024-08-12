/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "", // Change this if your local server runs on a different port
        pathname: "/**",
      },
    ],
  },
  target: "serverless",
};

export default nextConfig;
