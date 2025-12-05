/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true, // si realmente lo necesitas
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',   // permite todos los dominios con HTTPS
    },
  ],
}

};

export default nextConfig;
