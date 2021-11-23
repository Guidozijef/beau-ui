const path = require("path");
module.exports = {
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  devServer: {
    // 指向一个开发服务器的字符串
    proxy: {
      "/": {
        target: "http://www.local.cc",
        ws: false,
        changeOrigin: true
      }
    },
    port: 8000,
    overlay: {
      errors: true
    }
  },
  chainWebpack: config => {
    config.module
      .rule("js")
      .include.add(path.resolve(__dirname, "packages"))
      .end()
      .use("babel")
      .loader("babel-loader");
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    requireModuleExtension: true
  }
};
