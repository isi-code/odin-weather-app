import path from 'node:path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import { loadEnvFile } from 'node:process';

loadEnvFile();

export default (env) => {
  return {
    mode: env.NODE_ENV || 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(import.meta.dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.html$/i,
          use: 'html-loader',
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      watchFiles: ['./src/index.html'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.EnvironmentPlugin(['WEATHER_API_KEY']),
      new ESLintWebpackPlugin({
        extensions: ['js', 'mjs', 'cjs'],
        fix: true,
      }),
    ],
  };
};
