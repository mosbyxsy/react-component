const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const postcssPresetEnv = require("postcss-preset-env");
const webpack = require("webpack");

const { name } = require("../package.json");

module.exports = {
    mode: "development",
    entry: {
        [name]: path.join(process.cwd(), "src/index.jsx")
    },
    devServer: {
        port: 1234,
        hot: true,
        open: true
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
                    ],
                    plugins: [
                        "react-refresh/babel"
                    ]
                }
            },
            {
                test: /(sc|sa|c)ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
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
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ogg|mp3)$/,
                use: [
                    {
                        loader: "url-loader",
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
    resolve: {
        enforceExtension: false,
        extensions: [".js", ".jsx", ".json", ".less", ".css"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), "public/index.html")
        })
    ]
};
