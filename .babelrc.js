module.exports = {
    presets: [
        ["@babel/preset-env", {
            modules,
            loose,
            corejs: 3, //2/3，3增加了部分新功能
            useBuiltIns: "usage" //全局加载不兼容且使用到的API，由于使用@babel/runtime-corejs3，所以可以去除
        }],
        "@babel/preset-react"
    ],
    plugins: [
        ["@babel/plugin-transform-runtime", { //不会污染全局
            useESModules,
            corejs: 3 //支持新特性Map等，以及实例方法include等(2版本不支持)
        }],
    ]
};
