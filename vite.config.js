import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv'; // Import dotenv

// Explicitly load environment variables from the .env file
dotenv.config(); 

// Access environment variable using process.env


export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG'],
  server: {
    proxy: 'https://conbeckend.onrender.com/'
     
       
     
  
  },
});
