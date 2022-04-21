const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = env => {
    let plugins = [
        new MiniCssExtractPlugin( {
            filename: './css/main.css'
        } ),
        new CopyPlugin( {
            patterns: [
                {
                    from: 'src/vendor',
                    to: 'vendor',
                    noErrorOnMissing: true
                }
            ],
        } )
    ];

    if ( env.watchmode != 1 ) {
        plugins.push( new CleanWebpackPlugin( {
            dangerouslyAllowCleanPatternsOutsideProject: true,
            cleanOnceBeforeBuildPatterns: [ '../**/*', '!../uploads/**' ],
            dry: false
        } ) );
    }

    return {
        entry: './src/index.js',

        output: {
            filename: 'main.js',
            path: path.resolve( __dirname, 'dist/assets' ),
            clean: true
        },
    
        plugins: plugins,
    
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'img/[name].[ext]'
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name].[ext]'
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ],
                }
            ]
        }
    }
};