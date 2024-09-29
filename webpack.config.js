const path = require('path');

module.exports = {
    entry: './index.js', 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        static: path.join(__dirname, 'dist'), // Changed from contentBase to static
        compress: true,
        port: 9000,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

