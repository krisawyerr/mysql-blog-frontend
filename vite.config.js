/* import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
}); */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Adjust this based on your deployment path
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['/src/main.jsx'],
    },
  },
});

