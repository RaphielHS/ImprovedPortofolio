const { DeleteSourceMapsPlugin } = require('webpack-delete-sourcemaps-plugin');

module.exports = {
    webpack: (config, { isServer }) => {
        devtool: 'hidden-source-map', // optional, see the #hidden-source-map section for 
        config.plugins.push(new DeleteSourceMapsPlugin({ isServer, keepServerSourcemaps: true }))
        return config
    }
}    