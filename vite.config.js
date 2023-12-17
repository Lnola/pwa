import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [mkcert()],
  root: './client',
  server: {
    port: 3000,
  },
  build: {
    assetsInlineLimit: 0,
  },
});
