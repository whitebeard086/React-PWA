import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import dynamicImport from "vite-plugin-dynamic-import";
import eslint from "vite-plugin-eslint";
import envCompatible from 'vite-plugin-env-compatible';
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig({
    plugins: [
        react(),
        envCompatible(),
        macrosPlugin(),
        dynamicImport(),
        eslint(),
    ],
    assetsInclude: ['**/*.md'],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    build: {
        outDir: 'build',
    },
});
