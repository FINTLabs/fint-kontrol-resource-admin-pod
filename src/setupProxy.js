const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
	// For getting orgunits
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

	// For getting users
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

	// For getting accessRoles in access-role-controller
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

	// For getting feature data
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

	// For getting accessRoles with permissionData
	app.use(
		createProxyMiddleware("/api/accessmanagement/v1/accesspermission/accessrole/", {
			// Target port number must be equal to the port forwarded
			target: "http://localhost:53989/beta/fintlabs-no",
			changeOrigin: true,
			headers: {
				Connection: "keep-alive"
			}
		})
	)

	// For posting permissionData
	app.use(
		createProxyMiddleware("/api/accessmanagement/v1/accesspermission", {
			// Target port number must be equal to the port forwarded
			target: "http://localhost:53989/beta/fintlabs-no",
			changeOrigin: true,
			headers: {
				Connection: "keep-alive"
			}
		})
	)

	// For posting assignments
	app.use(
		createProxyMiddleware("/api/accessmanagement/v1/accessassignment", {
			// Target port number must be equal to the port forwarded
			target: "http://localhost:53989/beta/fintlabs-no",
			changeOrigin: true,
			headers: {
				Connection: "keep-alive"
			}
		})
	)
}
