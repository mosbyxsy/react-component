# 说明

## webpack.config.dev.js

应用开发调试配置；  
- 启动热更新(fast-refresh)
- 启动source-map

执行命令：npm start
页面查看地址：http://localhost:1234/  

## webpack.config.umd.js

生产打包配置(不包含css打包，为了实现按需加载)；  
- 代码压缩
- 使用UMD规范打包

执行命令：npm run build:umd  
文件生成在dist目录下

## 其他可选插件

```javascript
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const nodeExternals = require("webpack-node-externals"); 
// externals: [nodeExternals()] node环境配置

new ProgressBarPlugin(),//显示打包进度
new BundleAnalyzerPlugin(),//打包文件分析
new webpack.LoaderOptionsPlugin({//所有loader共享配置
    minimize: true
})
```

## gulpfile

css打包相关配置；