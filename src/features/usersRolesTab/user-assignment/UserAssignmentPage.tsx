import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Box, Button, Heading } from "@navikt/ds-react"
import { ArrowBack } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useUser } from "../../../api/UserContext"
import { IUser, IUserRole } from "../../../api/types"
import { LoaderStyled } from "../../index"
import RoleOrgunitAssociationTable from "./RoleOrgunitAssociationTable"
import ChangeAssignment from "./modals/ChangeAssignment"
import DeleteAssignment from "./modals/DeleteAssignment"

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
	const { isLoading, setIsLoading, getSpecificUserById } = useUser()
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

				getSpecificUserById(userId)
					.then((user) => {
						setUser(user)
					})
					.catch((error) => {
						console.error("Error fetching user:", error)
					})
					.finally(() => {
						setIsLoading(false)
					})
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
					<Box>
						<Heading size={"small"}>Brukerinfo</Heading>
						Navn: {user?.firstName} {user?.lastName}
					</Box>

					<Box>
						<RoleOrgunitAssociationTable
							user={user}
							toggleChangeModal={toggleChangeModal}
							toggleDeleteModal={toggleDeleteModal}
						/>
					</Box>
				</div>
			)}

			{isModalOpen && (
				<ChangeAssignment
					assignmentToChange={assignmentToChange}
					modalOpenProp={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
			{isDeleteModalOpen && assignmentToDelete && (
				<DeleteAssignment
					assignmentToDelete={assignmentToDelete}
					modalOpenProp={isDeleteModalOpen}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
				/>
			)}
		</UserAssignmentContainer>
	)
}

export default UserAssignmentPage
