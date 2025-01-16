





const path = require("path");

let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry : "./source/index.js",
    output : {
        filename : "bundle.js",
        path : path.resolve(__dirname, "dist")
    },

    plugins : [
        new HtmlWebpackPlugin({
            title : "CodeClock",
            template : "./source/index.html",
            inject : "body"
        })
    ],

    module : {
        rules : [
            {
                test : /\.css$/i,
                use : ["style-loader", "css-loader"]
            },
            {
                test : /\.(png|svg|jpg|jpeg|gif)$/i,
                type : "asset/resource",
            },
            {
                test : /\.html$/i,
                loader : "html-loader"
            },
            {
                test : /\.(woff|woff2|eot|ttf|otf)$/i,
                type : "asset/resource"
            }
        ]
    }
}