import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";
import path from "path"

const __dirname=path.resolve();
dotenv.config({path: path.resolve(__dirname,"../.env")})


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0"
  },
})
