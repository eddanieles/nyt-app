module.exports = {
    chainWebpack: config => {
        config.module.rules.delete("svg");
    },
    configureWebpack: {
        module: {
            rules: [{
                test: /\.svg$/,
                loader: 'vue-svg-loader',
            }],
        }
    },
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    prependData: `
                  @import "@/scss/variables.scss";
                  @import "@/scss/mixins.scss";
                  @import "@/scss/functions.scss";
                `
                }
            }
        }
    }
}