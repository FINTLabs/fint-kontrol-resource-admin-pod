const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {


    let baseUrl = 'http://localhost:8081';

    // when using lens for a backend
    if (process.env.NODE_ENV === 'development') {
        const devUrl = '/beta/fintlabs-no';
        baseUrl += devUrl;
    }

    app.use(
        createProxyMiddleware('/api/orgunits', {
            target: baseUrl, // Use the updated baseUrl
            changeOrigin: true,
            headers: {
                Connection: 'keep-alive',
            },
        })
    );

};
