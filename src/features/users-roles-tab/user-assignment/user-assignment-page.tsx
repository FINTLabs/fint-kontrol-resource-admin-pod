import { useLocation } from "react-router-dom"

const UserAssignmentPage = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	console.log(queryParams)

	const userIdParam = queryParams.get("userId")
	console.log(userIdParam)

	queryParams.forEach((value, key) => {
		console.log(`${key}: ${value}`)
	})

	return <>Yes</>
}

export default UserAssignmentPage
