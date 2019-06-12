const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require("./package.json");

const resolve = (...args) => path.resolve(__dirname, ...args);

const env =
  process.env.NODE_ENV === "production" ? "production" : "development";

const version = process.env.VERSION || pkg.version;

const outputPath = resolve("dist");
const publicPath = "/";

module.exports = {
  entry: resolve("src"),
  context: resolve(),
  output: {
    path: outputPath,
    filename: "bundle.js",
    publicPath
  },
  mode: env,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: "babel-loader",
        include: resolve("src")
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: env === "development"
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"]
  },
  devServer: {
    clientLogLevel: "warning",
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8080,
    publicPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"' + process.env.NODE_ENV + '"',
        VERSION: '"' + version + '"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve("index.html"),
      inject: true,
      chunksSortMode: "dependency"
    }),
    new CopyPlugin([
      {
        from: "copies"
      }
    ])
  ].concat(
    env !== "production" ? [new webpack.HotModuleReplacementPlugin()] : []
  ),
  node: {
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
