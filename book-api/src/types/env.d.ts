declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: Number;
      DATABASE_URL: string;
    }
  }
}

export {};
