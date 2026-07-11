// Su GitHub Pages il sito vive sotto /2Dgallery: in CI (GitHub Actions)
// l'app viene esportata statica con quel basePath; in locale resta su /.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActions ? "/2Dgallery" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  basePath,
  trailingSlash: true,
  // GitHub Pages non ha il server di ottimizzazione immagini di Next
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
