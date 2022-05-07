const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPLugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                // regex test for finding images to pre-process
                test: /\.jpg$/i,
                use: [
                    // file-loader to load images, not reduce size
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name (file) {
                                return '[path][name].[ext]'
                            },
                            publicPath: function(url) {
                                return url.replace('../', '/assets/')
                            }
                        }
                    },
                    // file-loader to compress loaded images
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new BundleAnalyzerPLugin({ 
            analyzerMode: 'static', // the report outputs to an HTML file in the dist folder
        })
    ],
    mode: 'development'
};