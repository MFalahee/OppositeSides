const path = require('path');
const HTMLWebPlugin = require('html-webpack-plugin');

module.export = {
    // where webpack starts looking for bundled JS
    entry : path.join(__dirname, "src", "index.js"),
    // where webpack spits out bundled js
    output: {
        path:path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
        }
        ]
    }
    // tells webpack to inject <script> tags
    plugins: [
        new HTMLWebPlugin({
            template: path.join(__dirname, "src", "index.html"),
        })
    ]
}