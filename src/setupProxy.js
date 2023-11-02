const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
	app.use(
		createProxyMiddleware("/api/orgunits", {
			// Target port number must be equal to the port forwarded
			target: "http://localhost:8081/beta/fintlabs-no",
			changeOrigin: true,
			headers: {
				Connection: "keep-alive"
			}
		})
	)

	app.use(
		createProxyMiddleware("/api/accessmanagement/v1/user", {
			// Target port number must be equal to the port forwarded
			target: "http://localhost:53989/beta/fintlabs-no",
			changeOrigin: true,
			headers: {
				Connection: "keep-alive"
			}
		})
	)

	app.use(
		createProxyMiddleware("/api/accessmanagement/v1/accessrole", {
			// Target port number must be equal to the port forwarded
			target: "http://localhost:53989/beta/fintlabs-no",
			changeOrigin: true,
			headers: {
				Connection: "keep-alive"
			}
		})
	)

	app.use(
		createProxyMiddleware("/api/accessmanagement/v1/feature", {
			// Target port number must be equal to the port forwarded
			target: "http://localhost:53989/beta/fintlabs-no",
			changeOrigin: true,
			headers: {
				Connection: "keep-alive"
			}
		})
	)

	app.use(
		createProxyMiddleware("/api/accessmanagement/v1/accessrole/:id", {
			// Target port number must be equal to the port forwarded
			target: "http://localhost:53989/beta/fintlabs-no",
			changeOrigin: true,
			headers: {
				Connection: "keep-alive"
			}
		})
	)
}
