import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig({
  base: "/",
  plugins: [svgr(), react(), dynamicImport()],
  build : {
    rollupOptions: {
      output : {
        assetFileNames: (assetInfo) => {
          let info = assetInfo.name.split(".");
          let extType = info[info.length-1];
          if(/png|jpe?g|svg|gif|tiff|bmp|jsx|ico/i.test(extType)) {
            extType="img"
          } else if(/ttf|TTF/.test(extType)) {
            extType = "font"
          } else if(/webm/.test(extType)) {
            extType = "music"
          }
          return `assets/${extType}/[name].[ext]`;
        }
        // preserveModules: true,
        // dir: "./dist"
      },
      // preserveEntrySignatures: "strict"
    }
  }
});