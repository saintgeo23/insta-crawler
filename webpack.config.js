const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: path.join(__dirname, './assets'),

  entry: {
    scripts: './scripts/app.js',
    styles: './styles/app.less',
  },

  output: {
    path: path.join(__dirname, '.public'),
    filename: './[name]/app.js',
    publicPath: '',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        loader: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',
            'csso-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    autoprefixer: {
                      browsers: ['last 5 versions', 'ie 10-11'],
                    }
                  }
                }
              }
            },
            'less-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?emitFile=false&name=../[path][name].[ext]',
      },
    ],
  },

  plugins: [
    new ExtractTextWebpackPlugin('styles/app.css'),

    new CopyWebpackPlugin([
      // {
      //   from: {
      //     glob: './vendors/**/*',
      //     dot: false,
      //   },
      // },
      {
        from: {
          glob: './images/**/*',
          dot: false,
        },
      },
      // {
      //   from: {
      //     glob: './fonts/**/*',
      //     dot: false,
      //   },
      // },
      {
        from: './*.txt',
      },
    ]),
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
  },
};
