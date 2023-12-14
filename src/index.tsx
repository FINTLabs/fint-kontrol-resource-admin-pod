import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from "./global-styles"
import { ToastContainer } from "react-toastify"
import { GeneralProvider } from "./api/GeneralContext"

const root = ReactDOM.createRoot(document.getElementById("fint-kontroll-resource-admin-pod") as HTMLElement)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<GeneralProvider>
				<ToastContainer autoClose={5000} newestOnTop={true} role="alert" />
				<GlobalStyle />
				<App />
			</GeneralProvider>
		</BrowserRouter>
	</React.StrictMode>
)
