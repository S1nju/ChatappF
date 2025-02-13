import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    resolve: {
        alias: {
          'sockjs-client': 'sockjs-client/dist/sockjs.min.js',
          '@stomp/stompjs': path.resolve(__dirname, 'node_modules/@stomp/stompjs/esm6/index.js'),
        }},
    plugins: [react()],
  };
});