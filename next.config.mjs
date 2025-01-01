/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/front-end-demo",
  reactStrictMode: false,
  output: "export",
  // output: "standalone",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
