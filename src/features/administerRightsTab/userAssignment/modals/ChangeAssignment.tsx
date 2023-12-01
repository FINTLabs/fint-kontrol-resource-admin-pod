import { IUserRole } from "../../../../api/types"
import { Button, Modal } from "@navikt/ds-react"
import React, { useEffect, useRef, useState } from "react"
import EditUserAssignment from "../EditUserAssignment"
import { toast } from "react-toastify"

interface ChangeAssignmentsModalProps {
	assignmentToChange: IUserRole
	modalOpenProp: boolean
	setIsModalOpen: (isOpen: boolean) => void
}
const ChangeAssignment = ({ assignmentToChange, modalOpenProp, setIsModalOpen }: ChangeAssignmentsModalProps) => {
	const ref = useRef<HTMLDialogElement>(null)
	// const { basePath } = useGeneral()
	const [updatedAssignment, setUpdatedAssignment] = useState<IUserRole>(assignmentToChange)

	useEffect(() => {
		if (assignmentToChange.roleId.length > 0 || modalOpenProp) {
			openModal()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [assignmentToChange, modalOpenProp])

	const openModal = () => {
		setIsModalOpen(true)
		ref.current?.showModal()
	}

	const closeModal = () => {
		setIsModalOpen(false)
		ref.current?.close()
	}

	const handleSubmitChangesToRole = () => {
		// TODO: Fix this when API is ready
		// AssignmentRepository.putAccessRole(basePath, updatedAssignment)
		toast.info("Endring er foreløpig ikke mulig")
		closeModal()
	}

	return (
		<div className="py-16">
			<Modal ref={ref} header={{ heading: `Endre ${assignmentToChange?.roleName}` }} onClose={closeModal}>
				<Modal.Body>
					<EditUserAssignment
						assignmentDetails={updatedAssignment}
						setUpdateAssignmentWhenDeletingOrgUnit={setUpdatedAssignment}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={() => handleSubmitChangesToRole()}>
						Lagre
					</Button>
					<Button type="button" variant="secondary" onClick={closeModal}>
						Avbryt
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ChangeAssignment
