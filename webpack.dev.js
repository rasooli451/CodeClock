


let {merge} = require("webpack-merge");


let common = require("./webpack.common");



module.exports = merge(common, {
    mode : "development",
    devtool : "inline-source-map",
    devServer : {
        static : "./dist"
    }
})