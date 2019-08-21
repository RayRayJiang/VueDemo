module.exports = {
    // 配置html文件中href和src的路径抬头
    publicPath: process.env.NODE_ENV == 'development' ? '/' : '',
    devServer: {
        // 配置反向代理
        proxy: {
            '/api': {
                /* 
                如果你的原始请求是/api/goods/swiper
                会自动转换成http://localhost:8888/api/goods/swiper
                再把/api改成空
                最后的结果就是http://localhost:8888/goods/swiper
                */ 
                target: 'http://localhost:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }            
        }
    }
}