const path = require('path');

module.exports =
{
    entry: "./src/App.js",
    output:
    {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: "url-loader"
            }
        ]
    }
};