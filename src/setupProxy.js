const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api/layout/configuration',{
            // target: 'http://localhost:8080/beta/fintlabs-no',
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );

};
