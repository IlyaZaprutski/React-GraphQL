const ExtractTextPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');
const WebpackBaseConfig = require('./webpack.config');

module.exports = {
    ...WebpackBaseConfig,
    module: {
        ...WebpackBaseConfig.module,
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-2', 'react'],
                        plugins: [
                            'transform-decorators-legacy',
                            'transform-class-properties',
                            // new compress feature
                            'transform-react-constant-elements',
                            'transform-react-inline-elements',
                            'transform-react-remove-prop-types',
                        ],
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 },
                        },
                        {
                            loader: 'sass-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [autoprefixer()],
                            },
                        },
                    ],
                }),
            },
        ],
    },

    plugins: [...WebpackBaseConfig.plugins, new ExtractTextPlugin('styles/styles.css')],
};
