const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(
        createProxyMiddleware('/api/orgunits', {
            // target: 'http://localhost:8081/beta/fintlabs-no',
            target: 'http://localhost:8081',
            changeOrigin: true,
            //pathRewrite: {"^/api5": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    //
    // app.use(
    //     createProxyMiddleware('/api/layout/configuration',{
    //     // target: 'http://localhost:8080/beta/fintlabs-no',
    //         target: 'http://localhost:8080',
    //         changeOrigin: true,
    //     })
    // );

};
