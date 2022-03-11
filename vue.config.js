
module.exports = {
    //webpack配置
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8088',   //代理地址，这里设置的地址会代替axios中设置的baseURL
                // ws: true,
                changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': '/'
                    //路径重写 原接口路径是http://localhost:8088/data 而我们是 http://localhost:8080/api/data
                    //所以先target代替axios的baseurl(http://localhost:8080)为  http://localhost:8088
                    //之后再把/api去掉  变为http://localhost:8088/data
                }
            },
        },
    },
}
