const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
      clean: true
   },
   devServer: {
      static: {
         directory: path.join(__dirname, 'src'),
      },
      hot: true,
      port: 3000,
      open: true
   },
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "src/index.html"
      })
   ],
};