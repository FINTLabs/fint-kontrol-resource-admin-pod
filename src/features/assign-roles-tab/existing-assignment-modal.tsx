import React, { useEffect, useRef } from "react"
import { Button, Heading, Modal } from "@navikt/ds-react"
import { IUser } from "../../api/types"

interface ExistingAssignmentModalProps {
	isModalOpen: boolean
	setIsModalOpen: (isModalOpen: boolean) => void
	existingRoleData: IUser | undefined
}
const ExistingAssignmentModal = ({ existingRoleData, isModalOpen, setIsModalOpen }: ExistingAssignmentModalProps) => {
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
			<Modal.Header>
				<Heading size={"small"}>
					Tildelingsinformasjon for {existingRoleData?.firstName} {existingRoleData?.lastName}
				</Heading>
			</Modal.Header>
			<Modal.Body>
				{existingRoleData ? (
					existingRoleData.roles?.map((role) => (
						<div key={role.roleId}>
							{role.roleName}
							<ul>
								{role.scopes.map((scope) =>
									scope.orgUnits.map((orgUnit) => <li key={orgUnit.orgUnitId}>{orgUnit.name}</li>)
								)}
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
		</Modal>
	)
}

export default ExistingAssignmentModal
