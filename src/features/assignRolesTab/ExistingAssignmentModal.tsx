import React, { useEffect, useRef } from "react"
import { Button, Heading, Modal } from "@navikt/ds-react"
import { useAssignments } from "../../api/AssignmentContext"
import { IUserDetailsPage } from "../../api/types"

interface ExistingAssignmentModalProps {
	isModalOpen: boolean
	setIsModalOpen: (isModalOpen: boolean) => void
	userDetailsPage: IUserDetailsPage | null
	userFullName: string
}
const ExistingAssignmentModal = ({
	isModalOpen,
	setIsModalOpen,
	userDetailsPage,
	userFullName
}: ExistingAssignmentModalProps) => {
	const { isLoading } = useAssignments()

	const existingRoleRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		isModalOpen ? handleOpenModal() : handleCloseModal()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalOpen])

	const handleCloseModal = (shouldSave?: boolean) => {
		setIsModalOpen(false)
		existingRoleRef.current?.close()
	}

	const handleOpenModal = () => {
		setIsModalOpen(true)
		existingRoleRef.current?.showModal()
	}

	return (
		<Modal ref={existingRoleRef} onClose={() => handleCloseModal()}>
			{isLoading ? (
				<></>
			) : (
				<>
					<Modal.Header>
						<Heading size={"small"}>Tildelingsinformasjon for {userFullName}</Heading>
					</Modal.Header>
					<Modal.Body>
						{userDetailsPage ? (
							userDetailsPage.accessRoles?.map((role) => (
								<div key={role.accessRoleId}>
									{role.accessRoleName}
									<ul>
										{role.orgUnits.map((orgUnit, i) => (
											<li key={orgUnit.orgUnitId + " " + i}>{orgUnit.name}</li>
										))}
									</ul>
								</div>
							))
						) : (
							<>Det fins ingen gyldig data om rolletildelingen</>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button type="button" onClick={() => handleCloseModal(true)}>
							Lukk
						</Button>
					</Modal.Footer>
				</>
			)}
		</Modal>
	)
}

export default ExistingAssignmentModal
