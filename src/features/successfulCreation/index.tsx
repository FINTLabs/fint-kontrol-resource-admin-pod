import { AlertComponent } from "../alert"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AlertContainer = styled.div`
	display: flex;
	justify-content: center;
`
const SuccessfulCreation = () => {
	const [timeLeft, setTimeLeft] = useState(5)
	const navigate = useNavigate()
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setTimeLeft(timeLeft - 1)
			if (timeLeft === 0) {
				navigate("/ressurser-admin")
			}
		}, 1000)
		return () => clearTimeout(timeoutId) // Cleanup to avoid memory leaks
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeLeft])

	return (
		<AlertContainer>
			<AlertComponent
				variantProp={"success"}
				messageProp={"Opprettelse gjennomført. Omdirigerer om " + String(timeLeft) + "..."}
			/>
		</AlertContainer>
	)
}

export default SuccessfulCreation
