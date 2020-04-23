"use strict";
module.exports = {
  publicPath: './',
  productionSourceMap:true,
	css: {
		extract: true,
		sourceMap: true,
		loaderOptions: {
			sass: {
				prependData: `@import "~@/assets/style/extend.scss";`
			}
		}
	},
  // productionSourceMap:true,
  devServer: {
    overlay: {
      warning: false,
      errors: false
    },
    proxy: {
      "/yuyuetrip": {
        target: "http://192.168.0.161:8184/",
        // target: "http://test2.yuyuetrip.com.cn/",
        pathRewrite: { "^/yuyuetrip": "/yuyuetrip" },
        changeOrigin: true, // 是域名的话，需要这个参数，
        secure: false // 设置支持https协议的代理
      }
    }
  },
  lintOnSave: false,
};
