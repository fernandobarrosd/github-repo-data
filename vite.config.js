import path from "path";
import { defineConfig } from "vite";


export default defineConfig({
    root: path.resolve("./"),
    server: {
        port: 8081,
        
    }
});