import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const front_end  = path.resolve(__dirname, 'front_end')
const dist = path.resolve(__dirname, 'dist')

export default {
  mode: 'none',
  devtool: 'eval-source-map',
  entry: ['@babel/polyfill' ,`${front_end}/index.js`],

  output: {
    path: dist,
    filename: 'bundle.js',
    publicPath: '/'
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
      }
    ]
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'front_end')
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
    }),
  ],

  devServer: {
    contentBase: './',
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    inline: true,
    // before(app) {
      // デフォルトだと、url末尾にスラッシュがないときに追加しリダイレクトするため、それを防ぐ
      // app.set('strict routing', true);

      // /public/ 以下の画像等の配信
      // app.use(express.static(path.resolve('public')))
    // }
  }
}
