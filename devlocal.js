import path from 'path'
import glob from 'glob'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const front_end = path.resolve(__dirname, 'front_end')
const outputPath = path.resolve(__dirname, 'dist')
const images = path.resolve(__dirname, 'public/images')
const imagePaths = glob.sync(`${images}/**.**`)

console.log(['@babel/polyfill' ,`${front_end}/index.js`].concat(imagePaths))

export default {
  mode: 'production',
  entry: ['@babel/polyfill' ,`${front_end}/index.js`].concat(imagePaths),
  output: {
    filename: 'bundle.js',
    path: outputPath,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/react'
            ]
          }
        },
        exclude: /node_modules/,
      },
      {
        // 拡張子 .ts もしくは .tsx の場合
        // TypeScript をコンパイルする
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url-loader',
        options: {
          // 2KBを超えるファイルならばfile-loaderでフィイルとしてコピーする
          limit: 2048,
          name: 'public/images/[name].[ext]'
        }
      }
    ]
  },

  resolve: {
    modules: [
      "node_modules",
      front_end,
      images
    ],
    alias: {
      'apiEndPoint': path.resolve(__dirname, `${front_end}/.env/apiEndPoint.ts`),
    },
    extensions: ['*', '.ts', '.tsx', 'json', '.js', '.jsx', '.css', '.scss'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: front_end + '/index.html',
      filename: 'index.html'
    })
  ],

  devServer: {
    contentBase: './',
    host: 'moneylog.com',
    port: 8080,
    historyApiFallback: true,
    inline: true
  }
}
