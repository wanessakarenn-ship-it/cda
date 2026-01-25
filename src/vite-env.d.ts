/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 🔗 URL base para as chamadas da API Express/NestJS */
  readonly VITE_API_URL: string;

  /** 📝 Nome da aplicação (ex: "CDA 2026 - Gestão de Performance") */
  readonly VITE_APP_NAME: string;

  /** 🔑 Chave pública caso use algum serviço externo (ex: Sentry, Firebase) */
  readonly VITE_EXTERNAL_KEY?: string;

  /** 🚀 Ambiente atual: 'development' | 'production' | 'staging' */
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}