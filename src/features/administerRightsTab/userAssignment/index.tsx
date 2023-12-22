import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Box, Button, Heading, HStack, Select, VStack } from "@navikt/ds-react"
import { ArrowBack } from "@mui/icons-material"
import React, { useEffect, useState } from "react"
import { useUser } from "../../../api/UserContext"
import { IRole } from "../../../api/types"
import { LoaderStyled } from "../../index"
import RoleOrgunitAssociationTable from "./RoleOrgunitAssociationTable"
import DeleteAssignment from "./modals/DeleteAssignment"
import { useRole } from "../../../api/RoleContext"
import ResetUserModal from "./modals/ResetUserModal"
import { TrashIcon } from "@navikt/aksel-icons"
import Toolbar from "./Toolbar"
import { useAssignments } from "../../../api/AssignmentContext"
import { log } from "util"
import { toast } from "react-toastify"

const UserAssignmentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`

interface UserAssignmentPageProps {
	basePath: string
}

const Index = ({ basePath }: UserAssignmentPageProps) => {
	const { isLoading, setIsLoading, getSpecificUserById, getObjectTypesForUser, specificUser, setSpecificUser } =
		useUser()
	const { roles } = useRole()
	const {
		currentPage,
		itemsPerPage,
		selectedRoleFilter,
		objectTypeFilter,
		orgUnitSearchString,
		getUserAssignmentDetailsPage,
		setSelectedRoleFilter
	} = useAssignments()

	const { userId } = useParams()
	const navigate = useNavigate()

	const [selectedRole, setSelectedRole] = useState<IRole>({ accessRoleId: "", name: "" })
	const [objectTypesForUser, setObjectTypesForUser] = useState<string[]>([])

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isResetRolesModalOpen, setIsResetRolesModalOpen] = useState(false)

	useEffect(() => {
		const fetchObjectTypesForUser = async () => {
			if (userId) {
				await getObjectTypesForUser(userId)
					.then((res) => setObjectTypesForUser(res))
					.catch((e) => toast.error("Henting av objekttyper på brukeren feilet"))
			}
		}
		fetchObjectTypesForUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (userId) {
			getUserAssignmentDetailsPage(userId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, itemsPerPage, selectedRoleFilter, objectTypeFilter, orgUnitSearchString])

	useEffect(() => {
		setSpecificUser(null)
	}, [setSpecificUser])

	useEffect(() => {
		setSelectedRoleFilter(selectedRole.accessRoleId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRole])

	useEffect(() => {
		const getUserById = () => {
			if (userId) {
				getSpecificUserById(userId)
			}
		}
		getUserById()
		// Must add the eslint disable in order to avoid infinite loops cause by adding getUserById as a dependency.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setIsLoading, userId, basePath])

	const goBack = () => {
		navigate(-1) // Navigate back in the history
	}

	const handleChangeRole = (selectedRoleParam: string) => {
		const paramMappedToAccessRoleType: IRole | undefined = roles.find(
			(role) => role.accessRoleId === selectedRoleParam
		)
		if (paramMappedToAccessRoleType === undefined) {
			setSelectedRole({ accessRoleId: "", name: "" })
		} else {
			setSelectedRole(paramMappedToAccessRoleType)
		}
	}

	const toggleRolesResetModal = (value: boolean) => {
		setIsResetRolesModalOpen(value)
	}

	const toggleDeleteModal = () => {
		setIsDeleteModalOpen(true)
	}

	if (isLoading) {
		return <LoaderStyled size={"3xlarge"} />
	}

	if (!specificUser || !userId) {
		return <></>
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
				<VStack gap={"4"}>
					<HStack justify={"space-between"}>
						<div>
							<Heading level={"2"} size={"small"}>
								Brukerinfo
							</Heading>
							Navn: {specificUser?.firstName} {specificUser?.lastName}
						</div>
						<Button
							variant={"danger"}
							onClick={() => toggleRolesResetModal(true)}
							icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
							iconPosition={"right"}
						>
							Nullstill brukerroller
						</Button>
					</HStack>

					<HStack justify={"space-between"} align={"end"}>
						<Select
							label={"Velg rolle"}
							value={selectedRole.accessRoleId}
							onChange={(event) => handleChangeRole(event.target.value)}
						>
							<option value={""}>Alle</option>
							{specificUser?.roles?.map((role) => (
								<option key={role.roleId} value={role.roleId}>
									{role.roleName}
								</option>
							))}
						</Select>
						<div>
							{selectedRole.accessRoleId !== "" && (
								<Button
									variant={"danger"}
									onClick={toggleDeleteModal}
									icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
									iconPosition={"right"}
								>
									Slett rolleobjekt
								</Button>
							)}
						</div>
					</HStack>

					<Box>
						{specificUser?.roles?.length === 0 ? (
							<>Brukeren har ingen roller</>
						) : (
							<>
								<Toolbar objectTypesForUser={objectTypesForUser} />
								<RoleOrgunitAssociationTable selectedRole={selectedRole} userId={userId} />
							</>
						)}
					</Box>
				</VStack>
			)}

			{isResetRolesModalOpen && (
				<ResetUserModal
					isResetRolesModalOpen={isResetRolesModalOpen}
					setIsResetRolesModalOpen={(value) => setIsResetRolesModalOpen(value)}
					user={specificUser}
				/>
			)}
			{isDeleteModalOpen && selectedRole && (
				<DeleteAssignment
					userData={specificUser}
					selectedRoleToDeleteFrom={selectedRole}
					modalOpenProp={isDeleteModalOpen}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					objectTypesForUser={objectTypesForUser}
				/>
			)}
		</UserAssignmentContainer>
	)
}

export default Index
