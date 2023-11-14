import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Button } from "@navikt/ds-react"
import { ArrowBack } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useUser } from "../../../api/UserContext"
import { IUser } from "../../../api/types"
import UsersRepository from "../../../repositories/users-repository"
import { AxiosError } from "axios/index"
import { LoaderStyled } from "../../index"

const UserAssignmentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`

interface UserAssignmentPageProps {
	basePath: string
}
const UserAssignmentPage = ({ basePath }: UserAssignmentPageProps) => {
	const { userId } = useParams()
	const { setIsLoading, isLoading } = useUser()
	const [user, setUser] = useState<IUser>()
	const navigate = useNavigate()

	useEffect(() => {
		const getUserById = async () => {
			if (userId) {
				setIsLoading(true)
				await UsersRepository.getSpecificUserById(basePath, userId)
					.then((response) => setUser(response.data))
					.catch((err: AxiosError) => console.error(err))
					.finally(() => setIsLoading(false))
			}
		}
		getUserById()
	}, [userId])

	const goBack = () => {
		navigate(-1) // Navigate back in the history
	}

	return (
		<UserAssignmentContainer>
			<div>
				<Button icon={<ArrowBack aria-hidden />} variant={"secondary"} onClick={goBack}>
					Gå tilbake
				</Button>
			</div>
			{isLoading ? (
				<LoaderStyled size="3xlarge" title="Laster inn brukerdata..." />
			) : (
				<div>
					<span>
						Navn: {user?.firstName} {user?.lastName}
					</span>
					<div>wrapper for tildelingstabell</div>
				</div>
			)}
		</UserAssignmentContainer>
	)
}

export default UserAssignmentPage
