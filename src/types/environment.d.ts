export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTRACT_ADDRESS: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
