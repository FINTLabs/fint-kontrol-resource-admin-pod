import React, { useEffect, useRef } from "react"
import { Button, Heading, Modal } from "@navikt/ds-react"
import { IUser } from "../../api/types"

interface ExistingAssignmentModalProps {
	isModalOpen: boolean
	setIsModalOpen: (isModalOpen: boolean) => void
	existingRoleData: IUser | undefined
}
const ExistingAssignmentModal = ({ existingRoleData, isModalOpen, setIsModalOpen }: ExistingAssignmentModalProps) => {
	const ref = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		if (existingRoleData) {
			isModalOpen ? handleOpenModal() : handleCloseModal()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalOpen])

	const handleCloseModal = (shouldSave?: boolean) => {
		setIsModalOpen(false)
		ref.current?.close()
	}

	const handleOpenModal = () => {
		setIsModalOpen(true)
		ref.current?.showModal()
	}

	if (!existingRoleData) {
		return <>Det fins ingen gyldig data om rolletildelingen</>
	}

	return (
		<Modal ref={ref} onClose={() => handleCloseModal()}>
			<Modal.Header>
				<Heading size={"small"}>
					Tildelingsinformasjon for {existingRoleData.firstName} {existingRoleData.lastName}
				</Heading>
			</Modal.Header>
			<Modal.Body>
				{existingRoleData.roles?.map((role) => (
					<>
						{role.roleName}
						<ul>{role.scopes.map((scope) => scope.orgUnits.map((orgUnit) => <li>{orgUnit.name}</li>))}</ul>
					</>
				))}
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
