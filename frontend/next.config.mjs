/** @type {import('next').NextConfig} */
const nextConfig = {
	// self-contained server bundle for the Docker image
	output: 'standalone',
	// SWC minify peaks above ~1.5GB RSS and gets OOM-killed in small Docker VMs; terser is slower but lighter
	swcMinify: process.env.LOW_MEMORY_BUILD !== '1',
};

export default nextConfig;
