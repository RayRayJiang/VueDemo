const baseUrl = process.env.VUE_APP_BASE_URL;
const outputDir = process.env.outputDir;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
console.log('baseUrl:', baseUrl);
console.log('ENV:' + process.env.NODE_ENV);
console.log('outputDir:', outputDir);
module.exports = {
    // 配置html文件中href和src的路径抬头
    publicPath: process.env.NODE_ENV == 'development' ? '/' : '',
    outputDir: outputDir,
    assetsDir: 'static', // 打包后css/js/img文件位置
    devServer: {
        open: true,
        // 配置代理
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    configureWebpack: {
        optimization: {
            minimizer: [
                // 打包时，移除console.log()信息
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            drop_console: true, // 注释console
                            drop_debugger: true,
                            pure_funcs: ['console.log'] //移除console
                        }
                    }
                })
            ]
        }
    }
}