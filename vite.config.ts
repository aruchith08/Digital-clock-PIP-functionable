import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY. 
      // We use || '' to ensure it's a string, preventing "undefined" injection if the var is missing.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});