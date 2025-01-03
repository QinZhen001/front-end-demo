const isProduction = process.env.NODE_ENV === "production"

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProduction ? "/front-end-demo" : "",
  reactStrictMode: false,
  output: "export",
  // output: "standalone",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
