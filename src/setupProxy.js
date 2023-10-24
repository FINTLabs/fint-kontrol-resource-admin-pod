const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api/orgunits', {
            target: 'http://localhost:8081/beta/fintlabs-no',
            changeOrigin: true,
            headers: {
                Connection: 'keep-alive',
            },
        })
    );

    app.use(
        createProxyMiddleware('/api/accessmanagement/v1/user', {
            target: 'http://localhost:53989/beta/fintlabs-no',
            changeOrigin: true,
            headers: {
                Connection: 'keep-alive',
            },
        })
    );

};
