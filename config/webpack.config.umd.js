const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");

const { name } = require("../package.json");

module.exports = {
    mode: "development",
    entry: {
        [name]: path.join(process.cwd(), "src/index.jsx")
    },
    output: {
        path: path.join(process.cwd(), "dist"),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    devServer: {
        port: 1234,
        // hot: true,
        // open: true
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /(sc|sa|c)ss$/,
                use: [
                    /*{
                        loader: "style-loader"
                    },*/
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
                        loader: "sass-loader"
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
    resolve: {
        enforceExtension: false,
        extensions: [".js", ".jsx", ".json", ".less", ".css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), "public/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].chunk.css"
        })
    ]
};
