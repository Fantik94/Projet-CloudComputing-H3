import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Listen on all local IPs
    port: 3001, // Set the server port to 3001
  },
  plugins: [react()],
});
