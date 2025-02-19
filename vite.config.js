import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig(() => {
  return {
    define: {
      global: 'window',  // Fix missing `global`
    },
    build: {
      outDir: 'build',
    },
    resolve: {
        alias: {
          'sockjs-client': 'sockjs-client/dist/sockjs.min.js',
          '@stomp/stompjs': path.resolve(__dirname, 'node_modules/@stomp/stompjs/esm6/index.js'),
          crypto: 'crypto-browserify',
          stream: 'stream-browserify',
        }},
    plugins: [react()],
  };
});