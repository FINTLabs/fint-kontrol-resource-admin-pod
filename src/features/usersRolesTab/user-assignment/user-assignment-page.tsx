import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Button, Heading, Panel } from "@navikt/ds-react"
import { ArrowBack } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useUser } from "../../../api/UserContext"
import { IUser, IUserRole } from "../../../api/types"
import UsersRepository from "../../../repositories/UsersRepository"
import { AxiosError } from "axios"
import { LoaderStyled } from "../../index"
import RoleOrgunitAssociationTable from "./role-orgunit-association-table"
import ChangeAssignmentsModal from "./ChangeAssignmentsModal"
import DeleteAssignmentsModal from "./DeleteAssignmentsModal"

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
	const { isLoading, setIsLoading } = useUser()
	const [user, setUser] = useState<IUser>()
	const [assignmentToChange, setAssignmentToChange] = useState<IUserRole>({
		roleId: "",
		roleName: "",
		scopes: []
	})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [assignmentToDelete, setAssignmentToDelete] = useState<IUserRole | undefined>()
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
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

	const toggleChangeModal = (assignmentToChange: IUserRole) => {
		setAssignmentToChange(assignmentToChange)
		setIsModalOpen(true)
	}

	const toggleDeleteModal = (assignmentToChange: IUserRole) => {
		setAssignmentToDelete(assignmentToChange)
		setIsDeleteModalOpen(true)
	}

	if (isLoading) {
		return <LoaderStyled size={"3xlarge"} />
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
						<RoleOrgunitAssociationTable
							user={user}
							toggleChangeModal={toggleChangeModal}
							toggleDeleteModal={toggleDeleteModal}
						/>
					</Panel>
				</div>
			)}

			{isModalOpen && (
				<ChangeAssignmentsModal
					assignmentToChange={assignmentToChange}
					modalOpenProp={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
			{isDeleteModalOpen && assignmentToDelete && (
				<DeleteAssignmentsModal
					assignmentToDelete={assignmentToDelete}
					modalOpenProp={isDeleteModalOpen}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
				/>
			)}
		</UserAssignmentContainer>
	)
}

export default UserAssignmentPage
