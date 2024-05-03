// vite.config.ts
import { rmSync } from "node:fs";
import svgLoader from "file:///Users/gabaldon/Witnet/sheikah/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.4.21/node_modules/vite-svg-loader/index.js";
import { defineConfig } from "file:///Users/gabaldon/Witnet/sheikah/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.12_sass@1.77.2/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/gabaldon/Witnet/sheikah/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import electron from "file:///Users/gabaldon/Witnet/sheikah/node_modules/.pnpm/vite-plugin-electron@0.28.7_vite-plugin-electron-renderer@0.14.5/node_modules/vite-plugin-electron/dist/simple.mjs";
import renderer from "file:///Users/gabaldon/Witnet/sheikah/node_modules/.pnpm/vite-plugin-electron-renderer@0.14.5/node_modules/vite-plugin-electron-renderer/dist/index.mjs";

// package.json
var package_default = {
  name: "sheikah-witnet-wallet",
  version: "1.12.1",
  type: "module",
  private: true,
  description: "A Witnet compatible desktop wallet interface and data requests development environment.",
  author: "Witnet Foundation <info@witnet.foundation>",
  debug: {
    env: {
      VITE_DEV_SERVER_URL: "http://127.0.0.1:3344"
    }
  },
  scripts: {
    dev: "vite",
    build: "vue-tsc --noEmit && vite build && electron-builder",
    preview: "vite preview",
    test: "yarn test:unit",
    lint: "yarn lint:fix:eslint && yarn lint:fix:prettier",
    ci: "yarn lint:check && yarn test && yarn electron:build --publish=never",
    clean: "yarn clean-deps && rm -rf dist_electron",
    "clean-deps": "rm -rf node_modules",
    "electron:build": "vue-cli-service electron:build",
    "electron:generate-icons": "electron-icon-builder --input=./public/icon.png --output=build --flatten",
    "electron:serve": "vue-cli-service electron:serve",
    "electron:serve:wallet": "vue-cli-service electron:serve --wallet",
    "i18n:report": "vue-cli-service i18n:report --src './src/**/*.?(js|ts|vue)' --locales './src/locales/**/*.json'",
    "lint:check": "yarn lint:check:eslint && yarn lint:check:prettier",
    "lint:check:eslint": "yarn lint:eslint --ext .js,.ts,.vue .",
    "lint:check:prettier": 'yarn lint:prettier --check "**/*.{ts,js,json,css,scss,vue,html}"',
    "lint:eslint": "eslint",
    "lint:fix:eslint": "yarn lint:eslint --fix --ext .js,.ts,.vue .",
    "lint:fix:prettier": 'yarn lint:prettier --write "**/*.{ts,js,json,css,scss,vue,html}"',
    "lint:prettier": "prettier --loglevel warn",
    postinstall: "electron-builder install-app-deps",
    postuninstall: "electron-builder install-app-deps",
    reinstall: "yarn clean-deps && yarn",
    "test:unit": "vitest"
  },
  main: "dist-electron/main/index.js",
  bugs: {
    url: "https://github.com/witnet/sheikah/issues"
  },
  license: "GPL-3.0",
  productName: "Sheikah-Witnet-wallet",
  repository: {
    type: "git",
    url: "git+https://github.com/witnet/sheikah.git"
  },
  volta: {
    node: "20.9.0"
  },
  devDependencies: {
    "@fortawesome/fontawesome-svg-core": "^6.5.2",
    "@fortawesome/free-solid-svg-icons": "^6.5.2",
    "@electron/notarize": "^2.3.0",
    "@fortawesome/vue-fontawesome": "^3.0.6",
    "@intlify/unplugin-vue-i18n": "^3.0.1",
    "@rushstack/eslint-patch": "^1.10.1",
    "@types/node": "^20.12.3",
    "@typescript-eslint/parser": "^7.5.0",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vue/eslint-config-prettier": "^9.0.0",
    "@vue/eslint-config-typescript": "^13.0.0",
    "@vue/test-utils": "^2.4.5",
    "@vueuse/core": "^10.9.0",
    autoprefixer: "^10.4.19",
    axios: "^1.6.8",
    "big.js": "^6.2.1",
    cbor2: "^1.2.2",
    "date-fns": "^3.6.0",
    electron: "^29.1.6",
    "electron-builder": "^24.13.3",
    "electron-devtools-installer": "^3.2.0",
    "electron-updater": "^6.1.8",
    "element-plus": "^2.6.3",
    eslint: "^8.57.0",
    "eslint-import-resolver-alias": "1.1.2",
    "eslint-plugin-import": "2.29.1",
    "eslint-plugin-node": "11.1.0",
    "eslint-plugin-vue": "9.24.0",
    "fs-extra": "^11.2.0",
    jsdom: "^24.0.0",
    "lint-staged": "^15.2.2",
    postcss: "^8.4.38",
    prettier: "3.2.5",
    "progress-stream": "^2.0.0",
    "qrcode-vue3": "^1.6.8",
    "rpc-websockets": "^7.9.0",
    sass: "^1.72.0",
    semver: "^7.6.0",
    tar: "^6.2.1",
    "tree-kill": "^1.2.2",
    typescript: "^5.4.3",
    "unplugin-auto-import": "^0.17.5",
    "unplugin-vue-components": "^0.26.0",
    uuid: "^9.0.1",
    vite: "^5.2.7",
    "vite-plugin-electron": "^0.28.4",
    "vite-plugin-electron-renderer": "^0.14.5",
    "vite-svg-loader": "^5.1.0",
    vitest: "^1.4.0",
    vue: "3.4.21",
    "vue-i18n": "^9.10.2",
    "vue-json-tree": "^0.4.3",
    "vue-observe-visibility": "^1.0.0",
    "vue-router": "^4.3.0",
    "vue-tsc": "^2.0.7",
    vuex: "^4.1.0",
    "witnet-radon-js": "^0.11.0",
    "witnet-requests": "^0.9.12"
  }
};

// vite.config.ts
import path from "path";
import VueI18nPlugin from "file:///Users/gabaldon/Witnet/sheikah/node_modules/.pnpm/@intlify+unplugin-vue-i18n@3.0.1_vue-i18n@9.13.1/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, URL } from "url";
import { ElementPlusResolver } from "file:///Users/gabaldon/Witnet/sheikah/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import AutoImport from "file:///Users/gabaldon/Witnet/sheikah/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@10.9.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/gabaldon/Witnet/sheikah/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
var __vite_injected_original_import_meta_url = "file:///Users/gabaldon/Witnet/sheikah/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var pathSrc = path.resolve(__dirname, "src");
var vite_config_default = defineConfig(({ command }) => {
  rmSync("dist-electron", { recursive: true, force: true });
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  return {
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "~/styles/element-variables.scss" as *;`,
          additionalData: `@use "~/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass"
          })
        ],
        dts: "src/components.d.ts"
      }),
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                  cleanupIds: false
                }
              }
            }
          ]
        }
      }),
      VueI18nPlugin({
        compositionOnly: false,
        include: resolve(
          dirname(fileURLToPath(__vite_injected_original_import_meta_url)),
          "./src/locales/**"
        )
      }),
      // svgLoader(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: "electron/main/index.ts",
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */
                "[startup] Electron App"
              );
            } else {
              startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron/main",
              rollupOptions: {
                // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                // we can use `external` to exclude them to ensure they work correctly.
                // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                // Of course, this is not absolute, just this way is relatively simple. :)
                external: Object.keys(
                  "dependencies" in package_default ? package_default.dependencies : {}
                )
              }
            }
          }
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : void 0,
              // #332
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys(
                  "dependencies" in package_default ? package_default.dependencies : {}
                )
              }
            }
          }
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer: {}
      }),
      // Use Node.js API in the Renderer process
      renderer()
    ],
    define: {
      __APP_VERSION__: JSON.stringify(package_default.version)
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
        },
        { find: "~/", replacement: `${pathSrc}/` }
      ]
    },
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(package_default.debug.env.VITE_DEV_SERVER_URL);
      return {
        host: url.hostname,
        port: +url.port
      };
    })(),
    clearScreen: false
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2dhYmFsZG9uL1dpdG5ldC9zaGVpa2FoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZ2FiYWxkb24vV2l0bmV0L3NoZWlrYWgvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2dhYmFsZG9uL1dpdG5ldC9zaGVpa2FoL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcm1TeW5jIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IGVsZWN0cm9uIGZyb20gJ3ZpdGUtcGx1Z2luLWVsZWN0cm9uL3NpbXBsZSdcbmltcG9ydCByZW5kZXJlciBmcm9tICd2aXRlLXBsdWdpbi1lbGVjdHJvbi1yZW5kZXJlcidcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuLy8gaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXG5pbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJ1xuaW1wb3J0IHsgcmVzb2x2ZSwgZGlybmFtZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ3VybCdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKVxuY29uc3QgX19kaXJuYW1lID0gcGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpXG5cbmNvbnN0IHBhdGhTcmMgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcbiAgcm1TeW5jKCdkaXN0LWVsZWN0cm9uJywgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pXG5cbiAgY29uc3QgaXNTZXJ2ZSA9IGNvbW1hbmQgPT09ICdzZXJ2ZSdcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcbiAgY29uc3Qgc291cmNlbWFwID0gaXNTZXJ2ZSB8fCAhIXByb2Nlc3MuZW52LlZTQ09ERV9ERUJVR1xuXG4gIHJldHVybiB7XG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJ+L3N0eWxlcy9lbGVtZW50LXZhcmlhYmxlcy5zY3NzXCIgYXMgKjtgLFxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIn4vc3R5bGVzL2VsZW1lbnQvaW5kZXguc2Nzc1wiIGFzICo7YCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgfSksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgLy8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC4vc3JjL2NvbXBvbmVudHMvYFxuICAgICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgICAvLyBhbGxvdyBhdXRvIGltcG9ydCBhbmQgcmVnaXN0ZXIgY29tcG9uZW50cyB1c2VkIGluIG1hcmtkb3duXG4gICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoe1xuICAgICAgICAgICAgaW1wb3J0U3R5bGU6ICdzYXNzJyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXG4gICAgICB9KSxcbiAgICAgIHN2Z0xvYWRlcih7XG4gICAgICAgIHN2Z29Db25maWc6IHtcbiAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICdwcmVzZXQtZGVmYXVsdCcsXG4gICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIG92ZXJyaWRlczoge1xuICAgICAgICAgICAgICAgICAgcmVtb3ZlVmlld0JveDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBjbGVhbnVwSWRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBWdWVJMThuUGx1Z2luKHtcbiAgICAgICAgY29tcG9zaXRpb25Pbmx5OiBmYWxzZSxcbiAgICAgICAgaW5jbHVkZTogcmVzb2x2ZShcbiAgICAgICAgICBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICAgJy4vc3JjL2xvY2FsZXMvKionLFxuICAgICAgICApLFxuICAgICAgfSksXG5cbiAgICAgIC8vIHN2Z0xvYWRlcigpLFxuXG4gICAgICBlbGVjdHJvbih7XG4gICAgICAgIG1haW46IHtcbiAgICAgICAgICAvLyBTaG9ydGN1dCBvZiBgYnVpbGQubGliLmVudHJ5YFxuICAgICAgICAgIGVudHJ5OiAnZWxlY3Ryb24vbWFpbi9pbmRleC50cycsXG4gICAgICAgICAgb25zdGFydCh7IHN0YXJ0dXAgfSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52LlZTQ09ERV9ERUJVRykge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAvKiBGb3IgYC52c2NvZGUvLmRlYnVnLnNjcmlwdC5tanNgICovICdbc3RhcnR1cF0gRWxlY3Ryb24gQXBwJyxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RhcnR1cCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB2aXRlOiB7XG4gICAgICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgICBzb3VyY2VtYXAsXG4gICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcbiAgICAgICAgICAgICAgb3V0RGlyOiAnZGlzdC1lbGVjdHJvbi9tYWluJyxcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIC8vIFNvbWUgdGhpcmQtcGFydHkgTm9kZS5qcyBsaWJyYXJpZXMgbWF5IG5vdCBiZSBidWlsdCBjb3JyZWN0bHkgYnkgVml0ZSwgZXNwZWNpYWxseSBgQy9DKytgIGFkZG9ucyxcbiAgICAgICAgICAgICAgICAvLyB3ZSBjYW4gdXNlIGBleHRlcm5hbGAgdG8gZXhjbHVkZSB0aGVtIHRvIGVuc3VyZSB0aGV5IHdvcmsgY29ycmVjdGx5LlxuICAgICAgICAgICAgICAgIC8vIE90aGVycyBuZWVkIHRvIHB1dCB0aGVtIGluIGBkZXBlbmRlbmNpZXNgIHRvIGVuc3VyZSB0aGV5IGFyZSBjb2xsZWN0ZWQgaW50byBgYXBwLmFzYXJgIGFmdGVyIHRoZSBhcHAgaXMgYnVpbHQuXG4gICAgICAgICAgICAgICAgLy8gT2YgY291cnNlLCB0aGlzIGlzIG5vdCBhYnNvbHV0ZSwganVzdCB0aGlzIHdheSBpcyByZWxhdGl2ZWx5IHNpbXBsZS4gOilcbiAgICAgICAgICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoXG4gICAgICAgICAgICAgICAgICAnZGVwZW5kZW5jaWVzJyBpbiBwa2cgPyBwa2cuZGVwZW5kZW5jaWVzIDoge30sXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJlbG9hZDoge1xuICAgICAgICAgIC8vIFNob3J0Y3V0IG9mIGBidWlsZC5yb2xsdXBPcHRpb25zLmlucHV0YC5cbiAgICAgICAgICAvLyBQcmVsb2FkIHNjcmlwdHMgbWF5IGNvbnRhaW4gV2ViIGFzc2V0cywgc28gdXNlIHRoZSBgYnVpbGQucm9sbHVwT3B0aW9ucy5pbnB1dGAgaW5zdGVhZCBgYnVpbGQubGliLmVudHJ5YC5cbiAgICAgICAgICBpbnB1dDogJ2VsZWN0cm9uL3ByZWxvYWQvaW5kZXgudHMnLFxuICAgICAgICAgIHZpdGU6IHtcbiAgICAgICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICAgIHNvdXJjZW1hcDogc291cmNlbWFwID8gJ2lubGluZScgOiB1bmRlZmluZWQsIC8vICMzMzJcbiAgICAgICAgICAgICAgbWluaWZ5OiBpc0J1aWxkLFxuICAgICAgICAgICAgICBvdXREaXI6ICdkaXN0LWVsZWN0cm9uL3ByZWxvYWQnLFxuICAgICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKFxuICAgICAgICAgICAgICAgICAgJ2RlcGVuZGVuY2llcycgaW4gcGtnID8gcGtnLmRlcGVuZGVuY2llcyA6IHt9LFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIC8vIFBsb3lmaWxsIHRoZSBFbGVjdHJvbiBhbmQgTm9kZS5qcyBBUEkgZm9yIFJlbmRlcmVyIHByb2Nlc3MuXG4gICAgICAgIC8vIElmIHlvdSB3YW50IHVzZSBOb2RlLmpzIGluIFJlbmRlcmVyIHByb2Nlc3MsIHRoZSBgbm9kZUludGVncmF0aW9uYCBuZWVkcyB0byBiZSBlbmFibGVkIGluIHRoZSBNYWluIHByb2Nlc3MuXG4gICAgICAgIC8vIFNlZSBcdUQ4M0RcdURDNDkgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cm9uLXZpdGUvdml0ZS1wbHVnaW4tZWxlY3Ryb24tcmVuZGVyZXJcbiAgICAgICAgcmVuZGVyZXI6IHt9LFxuICAgICAgfSksXG5cbiAgICAgIC8vIFVzZSBOb2RlLmpzIEFQSSBpbiB0aGUgUmVuZGVyZXIgcHJvY2Vzc1xuICAgICAgcmVuZGVyZXIoKSxcbiAgICBdLFxuICAgIGRlZmluZToge1xuICAgICAgX19BUFBfVkVSU0lPTl9fOiBKU09OLnN0cmluZ2lmeShwYWNrYWdlSnNvbi52ZXJzaW9uKSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgfSxcblxuICAgICAgICB7IGZpbmQ6ICd+LycsIHJlcGxhY2VtZW50OiBgJHtwYXRoU3JjfS9gIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgc2VydmVyOlxuICAgICAgcHJvY2Vzcy5lbnYuVlNDT0RFX0RFQlVHICYmXG4gICAgICAoKCkgPT4ge1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBrZy5kZWJ1Zy5lbnYuVklURV9ERVZfU0VSVkVSX1VSTClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBob3N0OiB1cmwuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogK3VybC5wb3J0LFxuICAgICAgICB9XG4gICAgICB9KSgpLFxuICAgIGNsZWFyU2NyZWVuOiBmYWxzZSxcbiAgfVxufSlcbiIsICJ7XG4gIFwibmFtZVwiOiBcInNoZWlrYWgtd2l0bmV0LXdhbGxldFwiLFxuICBcInZlcnNpb25cIjogXCIxLjEyLjFcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBXaXRuZXQgY29tcGF0aWJsZSBkZXNrdG9wIHdhbGxldCBpbnRlcmZhY2UgYW5kIGRhdGEgcmVxdWVzdHMgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnQuXCIsXG4gIFwiYXV0aG9yXCI6IFwiV2l0bmV0IEZvdW5kYXRpb24gPGluZm9Ad2l0bmV0LmZvdW5kYXRpb24+XCIsXG4gIFwiZGVidWdcIjoge1xuICAgIFwiZW52XCI6IHtcbiAgICAgIFwiVklURV9ERVZfU0VSVkVSX1VSTFwiOiBcImh0dHA6Ly8xMjcuMC4wLjE6MzM0NFwiXG4gICAgfVxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ2dWUtdHNjIC0tbm9FbWl0ICYmIHZpdGUgYnVpbGQgJiYgZWxlY3Ryb24tYnVpbGRlclwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwidGVzdFwiOiBcInlhcm4gdGVzdDp1bml0XCIsXG4gICAgXCJsaW50XCI6IFwieWFybiBsaW50OmZpeDplc2xpbnQgJiYgeWFybiBsaW50OmZpeDpwcmV0dGllclwiLFxuICAgIFwiY2lcIjogXCJ5YXJuIGxpbnQ6Y2hlY2sgJiYgeWFybiB0ZXN0ICYmIHlhcm4gZWxlY3Ryb246YnVpbGQgLS1wdWJsaXNoPW5ldmVyXCIsXG4gICAgXCJjbGVhblwiOiBcInlhcm4gY2xlYW4tZGVwcyAmJiBybSAtcmYgZGlzdF9lbGVjdHJvblwiLFxuICAgIFwiY2xlYW4tZGVwc1wiOiBcInJtIC1yZiBub2RlX21vZHVsZXNcIixcbiAgICBcImVsZWN0cm9uOmJ1aWxkXCI6IFwidnVlLWNsaS1zZXJ2aWNlIGVsZWN0cm9uOmJ1aWxkXCIsXG4gICAgXCJlbGVjdHJvbjpnZW5lcmF0ZS1pY29uc1wiOiBcImVsZWN0cm9uLWljb24tYnVpbGRlciAtLWlucHV0PS4vcHVibGljL2ljb24ucG5nIC0tb3V0cHV0PWJ1aWxkIC0tZmxhdHRlblwiLFxuICAgIFwiZWxlY3Ryb246c2VydmVcIjogXCJ2dWUtY2xpLXNlcnZpY2UgZWxlY3Ryb246c2VydmVcIixcbiAgICBcImVsZWN0cm9uOnNlcnZlOndhbGxldFwiOiBcInZ1ZS1jbGktc2VydmljZSBlbGVjdHJvbjpzZXJ2ZSAtLXdhbGxldFwiLFxuICAgIFwiaTE4bjpyZXBvcnRcIjogXCJ2dWUtY2xpLXNlcnZpY2UgaTE4bjpyZXBvcnQgLS1zcmMgJy4vc3JjLyoqLyouPyhqc3x0c3x2dWUpJyAtLWxvY2FsZXMgJy4vc3JjL2xvY2FsZXMvKiovKi5qc29uJ1wiLFxuICAgIFwibGludDpjaGVja1wiOiBcInlhcm4gbGludDpjaGVjazplc2xpbnQgJiYgeWFybiBsaW50OmNoZWNrOnByZXR0aWVyXCIsXG4gICAgXCJsaW50OmNoZWNrOmVzbGludFwiOiBcInlhcm4gbGludDplc2xpbnQgLS1leHQgLmpzLC50cywudnVlIC5cIixcbiAgICBcImxpbnQ6Y2hlY2s6cHJldHRpZXJcIjogXCJ5YXJuIGxpbnQ6cHJldHRpZXIgLS1jaGVjayBcXFwiKiovKi57dHMsanMsanNvbixjc3Msc2Nzcyx2dWUsaHRtbH1cXFwiXCIsXG4gICAgXCJsaW50OmVzbGludFwiOiBcImVzbGludFwiLFxuICAgIFwibGludDpmaXg6ZXNsaW50XCI6IFwieWFybiBsaW50OmVzbGludCAtLWZpeCAtLWV4dCAuanMsLnRzLC52dWUgLlwiLFxuICAgIFwibGludDpmaXg6cHJldHRpZXJcIjogXCJ5YXJuIGxpbnQ6cHJldHRpZXIgLS13cml0ZSBcXFwiKiovKi57dHMsanMsanNvbixjc3Msc2Nzcyx2dWUsaHRtbH1cXFwiXCIsXG4gICAgXCJsaW50OnByZXR0aWVyXCI6IFwicHJldHRpZXIgLS1sb2dsZXZlbCB3YXJuXCIsXG4gICAgXCJwb3N0aW5zdGFsbFwiOiBcImVsZWN0cm9uLWJ1aWxkZXIgaW5zdGFsbC1hcHAtZGVwc1wiLFxuICAgIFwicG9zdHVuaW5zdGFsbFwiOiBcImVsZWN0cm9uLWJ1aWxkZXIgaW5zdGFsbC1hcHAtZGVwc1wiLFxuICAgIFwicmVpbnN0YWxsXCI6IFwieWFybiBjbGVhbi1kZXBzICYmIHlhcm5cIixcbiAgICBcInRlc3Q6dW5pdFwiOiBcInZpdGVzdFwiXG4gIH0sXG4gIFwibWFpblwiOiBcImRpc3QtZWxlY3Ryb24vbWFpbi9pbmRleC5qc1wiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3dpdG5ldC9zaGVpa2FoL2lzc3Vlc1wiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIkdQTC0zLjBcIixcbiAgXCJwcm9kdWN0TmFtZVwiOiBcIlNoZWlrYWgtV2l0bmV0LXdhbGxldFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS93aXRuZXQvc2hlaWthaC5naXRcIlxuICB9LFxuICBcInZvbHRhXCI6IHtcbiAgICBcIm5vZGVcIjogXCIyMC45LjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIjogXCJeNi41LjJcIixcbiAgICBcIkBmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29uc1wiOiBcIl42LjUuMlwiLFxuICAgIFwiQGVsZWN0cm9uL25vdGFyaXplXCI6IFwiXjIuMy4wXCIsXG4gICAgXCJAZm9ydGF3ZXNvbWUvdnVlLWZvbnRhd2Vzb21lXCI6IFwiXjMuMC42XCIsXG4gICAgXCJAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4blwiOiBcIl4zLjAuMVwiLFxuICAgIFwiQHJ1c2hzdGFjay9lc2xpbnQtcGF0Y2hcIjogXCJeMS4xMC4xXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xMi4zXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuNS4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjRcIixcbiAgICBcIkB2dWUvZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjAuMFwiLFxuICAgIFwiQHZ1ZS9lc2xpbnQtY29uZmlnLXR5cGVzY3JpcHRcIjogXCJeMTMuMC4wXCIsXG4gICAgXCJAdnVlL3Rlc3QtdXRpbHNcIjogXCJeMi40LjVcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC45LjBcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXG4gICAgXCJheGlvc1wiOiBcIl4xLjYuOFwiLFxuICAgIFwiYmlnLmpzXCI6IFwiXjYuMi4xXCIsXG4gICAgXCJjYm9yMlwiOiBcIl4xLjIuMlwiLFxuICAgIFwiZGF0ZS1mbnNcIjogXCJeMy42LjBcIixcbiAgICBcImVsZWN0cm9uXCI6IFwiXjI5LjEuNlwiLFxuICAgIFwiZWxlY3Ryb24tYnVpbGRlclwiOiBcIl4yNC4xMy4zXCIsXG4gICAgXCJlbGVjdHJvbi1kZXZ0b29scy1pbnN0YWxsZXJcIjogXCJeMy4yLjBcIixcbiAgICBcImVsZWN0cm9uLXVwZGF0ZXJcIjogXCJeNi4xLjhcIixcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjYuM1wiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxuICAgIFwiZXNsaW50LWltcG9ydC1yZXNvbHZlci1hbGlhc1wiOiBcIjEuMS4yXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIjIuMjkuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1ub2RlXCI6IFwiMTEuMS4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXZ1ZVwiOiBcIjkuMjQuMFwiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXG4gICAgXCJqc2RvbVwiOiBcIl4yNC4wLjBcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuMlwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzhcIixcbiAgICBcInByZXR0aWVyXCI6IFwiMy4yLjVcIixcbiAgICBcInByb2dyZXNzLXN0cmVhbVwiOiBcIl4yLjAuMFwiLFxuICAgIFwicXJjb2RlLXZ1ZTNcIjogXCJeMS42LjhcIixcbiAgICBcInJwYy13ZWJzb2NrZXRzXCI6IFwiXjcuOS4wXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNzIuMFwiLFxuICAgIFwic2VtdmVyXCI6IFwiXjcuNi4wXCIsXG4gICAgXCJ0YXJcIjogXCJeNi4yLjFcIixcbiAgICBcInRyZWUta2lsbFwiOiBcIl4xLjIuMlwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjQuM1wiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNy41XCIsXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI2LjBcIixcbiAgICBcInV1aWRcIjogXCJeOS4wLjFcIixcbiAgICBcInZpdGVcIjogXCJeNS4yLjdcIixcbiAgICBcInZpdGUtcGx1Z2luLWVsZWN0cm9uXCI6IFwiXjAuMjguNFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZWxlY3Ryb24tcmVuZGVyZXJcIjogXCJeMC4xNC41XCIsXG4gICAgXCJ2aXRlLXN2Zy1sb2FkZXJcIjogXCJeNS4xLjBcIixcbiAgICBcInZpdGVzdFwiOiBcIl4xLjQuMFwiLFxuICAgIFwidnVlXCI6IFwiMy40LjIxXCIsXG4gICAgXCJ2dWUtaTE4blwiOiBcIl45LjEwLjJcIixcbiAgICBcInZ1ZS1qc29uLXRyZWVcIjogXCJeMC40LjNcIixcbiAgICBcInZ1ZS1vYnNlcnZlLXZpc2liaWxpdHlcIjogXCJeMS4wLjBcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4zLjBcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4wLjdcIixcbiAgICBcInZ1ZXhcIjogXCJeNC4xLjBcIixcbiAgICBcIndpdG5ldC1yYWRvbi1qc1wiOiBcIl4wLjExLjBcIixcbiAgICBcIndpdG5ldC1yZXF1ZXN0c1wiOiBcIl4wLjkuMTJcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRRLFNBQVMsY0FBYztBQUNuUyxPQUFPLGVBQWU7QUFDdEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sY0FBYztBQUNyQixPQUFPLGNBQWM7OztBQ0xyQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsUUFBVTtBQUFBLEVBQ1YsT0FBUztBQUFBLElBQ1AsS0FBTztBQUFBLE1BQ0wscUJBQXVCO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxTQUFXO0FBQUEsSUFDWCxNQUFRO0FBQUEsSUFDUixNQUFRO0FBQUEsSUFDUixJQUFNO0FBQUEsSUFDTixPQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUEsSUFDZCxrQkFBa0I7QUFBQSxJQUNsQiwyQkFBMkI7QUFBQSxJQUMzQixrQkFBa0I7QUFBQSxJQUNsQix5QkFBeUI7QUFBQSxJQUN6QixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsSUFDZCxx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
