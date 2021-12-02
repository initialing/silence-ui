import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"


export default defineConfig(()=>{


    return {
        server: {
            host: true,
            port: 6324
        },
        plugins:[
            vue()
        ]
    }
})