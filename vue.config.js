"use strict";
module.exports = {
  // configureWebpack: config => {
  //     require('vux-loader').merge(config, {
  //         options: {},
  //         plugins: ['vux-ui']
  //     })
  // },
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
    // https: true,
    overlay: {
      warning: false,
      errors: false
    },
    proxy: {
      "/yuyuetrip": {
        // target: "http://192.168.0.160:8189/",
        target: "http://test2.yuyuetrip.com.cn/wash/official",
        pathRewrite: { "^/yuyuetrip": "/yuyuetrip" },
        changeOrigin: true, // 是域名的话，需要这个参数，
        secure: true // 设置支持https协议的代理
      }
    }
  },
  lintOnSave: false,
};
