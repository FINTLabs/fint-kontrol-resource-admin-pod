import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Button, Heading, Panel, Table } from "@navikt/ds-react"
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
		const getUserById = () => {
			if (userId) {
				setIsLoading(true)
				UsersRepository.getSpecificUserById(basePath, userId)
					.then((response) => setUser(response.data))
					.catch((err: AxiosError) => console.error(err))
					.finally(() => setIsLoading(false))
			}
		}
		getUserById()
	}, [setIsLoading, userId, basePath])

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
					<Panel>
						<Heading size={"small"}>Brukerinfo</Heading>
						Navn: {user?.firstName} {user?.lastName}
					</Panel>

					<Panel>
						<Table></Table>
						wrapper for tildelingstabell
					</Panel>
				</div>
			)}
		</UserAssignmentContainer>
	)
}

export default UserAssignmentPage
