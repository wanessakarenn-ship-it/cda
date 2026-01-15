import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    // Aponta para o arquivo que inicia o seu React
    entry: {
      index: './src/cda-frontend/main.tsx',
    },
    // Resolve o erro 'process is not defined' que trava a tela no navegador
    define: {
      'process.env': {},
    },
  },
  html: {
    // Localiza o seu arquivo HTML base
    template: './index.html',
  },
  server: {
    // Mantém a porta padrão do seu frontend
    port: 5173,
  },
});