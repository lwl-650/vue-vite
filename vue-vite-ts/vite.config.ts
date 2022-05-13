import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],
  server: {
    //服务器主机名
    host: "localhost",
    //端口号
    port: 3003,// 不知为何更改会有问题
    //设为 true 时若端口已被占用则会直接退出，
    //而不是尝试下一个可用端口
    strictPort: true,
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //https.createServer()配置项
    https: false,
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        target: 'http://localhost:86',   //代理接口
        // target: 'http://go.lwlsl.top:8088', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: "bb", //指定打包文件
    brotliSize: false,

    minify: 'terser',//去掉所有console.log()
    terserOptions: {
      compress: {
        //生产环境时移除console.log()
        drop_console: true,
        drop_debugger: true,
      },
    },

  },
})
