const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./config.common');
const autoprefixer = require('autoprefixer');
const DashboardPlugin = require('webpack-dashboard/plugin');
const SSICompileWebpackplugin = require('ssi-webpack-plugin');
const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    plugins: function () {
      return [autoprefixer];
    }
  }
};

const devConfig = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',

  output: {
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          postcssConfig,
          'sass-loader'
        ]
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          postcssConfig,
          'less-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
    new DashboardPlugin(),
    new SSICompileWebpackplugin({
        ext: '.html|.shtml',
        publicPath: '',
        localBaseDir: './views',
        minify: false,
        // remoteBasePath:"http://baidu.com",//如果传了此参数，则表示从远程http请求中获取ssi文件的内容 
        variable:{
            'QUERY_STRING':"test=1",//如果ssi文件地址里有引用变量,如${QUERY_STRING}，则会用此参数里的对应key的值替换 
        }
    })
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    // inline: true,  // 已默认开启
    // hot: true,  // 已默认开启
    historyApiFallback: true
  }
});

module.exports = devConfig;
