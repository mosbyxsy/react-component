const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const postcssPresetEnv = require("postcss-preset-env");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { name, version, description } = require("../package.json");
const distDir = path.join(process.cwd(), "dist");

//https://webpack.docschina.org/configuration/
//https://www.webpackjs.com/中文网

module.exports = {
    mode: "production",
    entry: {
        [name]: path.join(process.cwd(), "components/index.jsx")
    },
    output: {
        path: distDir,
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        libraryTarget: "umd",
        library: "ReactComponent",
        libraryExport: "default" //定义直接暴露的属性
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    babelrc: false,
                    presets: [
                        ["@babel/preset-env"],
                        "@babel/preset-react"
                    ]
                }
            },
            {
                test: /(sc|sa|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2 //设置在这这之前有多少个loader，默认0
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            plugins: () => [
                                postcssPresetEnv({
                                    stage: 2, //默认是2
                                    features: {
                                        "custom-properties": true,
                                        "nesting-rules": true
                                    }
                                })
                            ]
                        }
                    },
                    {
                        loader: "sass-loader"// fast-sass-loader
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ogg|mp3)$/,
                use: [
                    {
                        loader: "url-loader",//base64转化
                        options: {
                            limit: 10 * 1024
                        }
                    }
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: ["file-loader"]
            }
        ]
    },
    //react 和 react-dom 不打包
    externals: {
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    },
    resolve: {
        enforceExtension: false,
        extensions: [".js", ".jsx", ".json", ".less", ".css"]
    },
    //代码压缩
    optimization: {
        minimizer: [
            //压缩js
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                extractComments: false //不要单独提取版权信息到单独文件
            }),
            //压缩css,去重
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)/g, //注意不要写成 /\.css$/g
                cssProcessorOptions: {
                    //生成.css.map 文件
                    map: true,
                    discardComments: { removeAll: true },
                    autoprefixer: false //关闭cssnano带的autoprefixer功能，使用postcss的autoprefixer功能
                },
                canPrint: true
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [distDir]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].chunk.css"
        }),
        new webpack.BannerPlugin(` \n ${name} v${version} \n ${description} ${fs.readFileSync(path.join(process.cwd(), "LICENSE"))}`),
        new ProgressBarPlugin(),//显示打包进度
    ]
};
