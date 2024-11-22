// vite.config.js
import { defineConfig } from "file:///D:/Coding/EdenfellWebsite/edenfell/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Coding/EdenfellWebsite/edenfell/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///D:/Coding/EdenfellWebsite/edenfell/node_modules/vite-plugin-svgr/dist/index.js";
import dynamicImport from "file:///D:/Coding/EdenfellWebsite/edenfell/node_modules/vite-plugin-dynamic-import/dist/index.mjs";
var vite_config_default = defineConfig({
  base: "/",
  plugins: [svgr(), react(), dynamicImport()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let info = assetInfo.name.split(".");
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|jsx|ico/i.test(extType)) {
            extType = "img";
          } else if (/ttf|TTF/.test(extType)) {
            extType = "font";
          } else if (/webm/.test(extType)) {
            extType = "music";
          }
          return `assets/${extType}/[name].[ext]`;
        }
        // preserveModules: true,
        // dir: "./dist"
      }
      // preserveEntrySignatures: "strict"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RpbmdcXFxcRWRlbmZlbGxXZWJzaXRlXFxcXGVkZW5mZWxsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDb2RpbmdcXFxcRWRlbmZlbGxXZWJzaXRlXFxcXGVkZW5mZWxsXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Db2RpbmcvRWRlbmZlbGxXZWJzaXRlL2VkZW5mZWxsL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XHJcbmltcG9ydCBkeW5hbWljSW1wb3J0IGZyb20gJ3ZpdGUtcGx1Z2luLWR5bmFtaWMtaW1wb3J0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogXCIvXCIsXHJcbiAgcGx1Z2luczogW3N2Z3IoKSwgcmVhY3QoKSwgZHluYW1pY0ltcG9ydCgpXSxcclxuICBidWlsZCA6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0IDoge1xyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XHJcbiAgICAgICAgICBsZXQgaW5mbyA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICAgIGxldCBleHRUeXBlID0gaW5mb1tpbmZvLmxlbmd0aC0xXTtcclxuICAgICAgICAgIGlmKC9wbmd8anBlP2d8c3ZnfGdpZnx0aWZmfGJtcHxqc3h8aWNvL2kudGVzdChleHRUeXBlKSkge1xyXG4gICAgICAgICAgICBleHRUeXBlPVwiaW1nXCJcclxuICAgICAgICAgIH0gZWxzZSBpZigvdHRmfFRURi8udGVzdChleHRUeXBlKSkge1xyXG4gICAgICAgICAgICBleHRUeXBlID0gXCJmb250XCJcclxuICAgICAgICAgIH0gZWxzZSBpZigvd2VibS8udGVzdChleHRUeXBlKSkge1xyXG4gICAgICAgICAgICBleHRUeXBlID0gXCJtdXNpY1wiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gYGFzc2V0cy8ke2V4dFR5cGV9L1tuYW1lXS5bZXh0XWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHByZXNlcnZlTW9kdWxlczogdHJ1ZSxcclxuICAgICAgICAvLyBkaXI6IFwiLi9kaXN0XCJcclxuICAgICAgfSxcclxuICAgICAgLy8gcHJlc2VydmVFbnRyeVNpZ25hdHVyZXM6IFwic3RyaWN0XCJcclxuICAgIH1cclxuICB9XHJcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1MsU0FBUyxvQkFBb0I7QUFDN1QsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFBQSxFQUMxQyxPQUFRO0FBQUEsSUFDTixlQUFlO0FBQUEsTUFDYixRQUFTO0FBQUEsUUFDUCxnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGNBQUksT0FBTyxVQUFVLEtBQUssTUFBTSxHQUFHO0FBQ25DLGNBQUksVUFBVSxLQUFLLEtBQUssU0FBTyxDQUFDO0FBQ2hDLGNBQUcsc0NBQXNDLEtBQUssT0FBTyxHQUFHO0FBQ3RELHNCQUFRO0FBQUEsVUFDVixXQUFVLFVBQVUsS0FBSyxPQUFPLEdBQUc7QUFDakMsc0JBQVU7QUFBQSxVQUNaLFdBQVUsT0FBTyxLQUFLLE9BQU8sR0FBRztBQUM5QixzQkFBVTtBQUFBLFVBQ1o7QUFDQSxpQkFBTyxVQUFVO0FBQUEsUUFDbkI7QUFBQTtBQUFBO0FBQUEsTUFHRjtBQUFBO0FBQUEsSUFFRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
