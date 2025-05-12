
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import dotenv from 'dotenv';

// Define the type for our environment variables
interface EnvVariables {
  NATURAL_LANGUAGE_UNDERSTANDING_APIKEY?: string;
  NATURAL_LANGUAGE_UNDERSTANDING_URL?: string;
  NATURAL_LANGUAGE_UNDERSTANDING_AUTH_TYPE?: string;
  OPENAI_API_KEY?: string;
  [key: string]: string | undefined;
}

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '') as EnvVariables;
  
  // Try to load from ibm-credentials.env if it exists
  let ibmCredentials: EnvVariables = {};
  if (fs.existsSync('./ibm-credentials.env')) {
    ibmCredentials = dotenv.parse(fs.readFileSync('./ibm-credentials.env')) as EnvVariables;
  }
  
  // Merge environment variables (Vercel env vars take precedence)
  const finalEnv: EnvVariables = {
    ...ibmCredentials,
    ...env
  };
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Support both formats
      'import.meta.env.NATURAL_LANGUAGE_UNDERSTANDING_APIKEY': JSON.stringify(finalEnv.NATURAL_LANGUAGE_UNDERSTANDING_APIKEY),
      'import.meta.env.NATURAL_LANGUAGE_UNDERSTANDING_URL': JSON.stringify(finalEnv.NATURAL_LANGUAGE_UNDERSTANDING_URL),
      'import.meta.env.NATURAL_LANGUAGE_UNDERSTANDING_AUTH_TYPE': JSON.stringify(finalEnv.NATURAL_LANGUAGE_UNDERSTANDING_AUTH_TYPE || 'iam'),
      'import.meta.env.OPENAI_API_KEY': JSON.stringify(finalEnv.OPENAI_API_KEY),
      // VITE_ prefixed versions
      'import.meta.env.VITE_NATURAL_LANGUAGE_UNDERSTANDING_APIKEY': JSON.stringify(finalEnv.NATURAL_LANGUAGE_UNDERSTANDING_APIKEY),
      'import.meta.env.VITE_NATURAL_LANGUAGE_UNDERSTANDING_URL': JSON.stringify(finalEnv.NATURAL_LANGUAGE_UNDERSTANDING_URL),
      'import.meta.env.VITE_NATURAL_LANGUAGE_UNDERSTANDING_AUTH_TYPE': JSON.stringify(finalEnv.NATURAL_LANGUAGE_UNDERSTANDING_AUTH_TYPE || 'iam'),
      'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(finalEnv.OPENAI_API_KEY),
    },
  };
});
