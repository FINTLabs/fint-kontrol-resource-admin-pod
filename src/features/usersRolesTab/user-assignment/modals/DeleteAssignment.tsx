import { IUserRole } from "../../../../api/types"
import { Button, Modal } from "@navikt/ds-react"
import React, { useEffect, useRef } from "react"
import { toast } from "react-toastify"

interface DeleteAssignmentsModalProps {
	assignmentToDelete: IUserRole
	modalOpenProp: boolean
	setIsDeleteModalOpen: (isOpen: boolean) => void
}

const DeleteAssignment = ({ setIsDeleteModalOpen, modalOpenProp, assignmentToDelete }: DeleteAssignmentsModalProps) => {
	const deleteRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		if (assignmentToDelete.roleId.length > 0 || modalOpenProp) {
			openModal()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [assignmentToDelete, modalOpenProp])

	const openModal = () => {
		setIsDeleteModalOpen(true)
		deleteRef.current?.showModal()
	}

	const closeModal = () => {
		setIsDeleteModalOpen(false)
		deleteRef.current?.close()
	}

	const handleDeleteAssignmentData = () => {
		// TODO: Fix this when API is ready
		// AssignmentRepository.putAccessRole(basePath, updatedAssignment)
		toast.info("Sletting er foreløpig ikke mulig")
		closeModal()
	}

	return (
		<Modal ref={deleteRef} header={{ heading: `Endre ${assignmentToDelete?.roleName}` }} onClose={closeModal}>
			<Modal.Body>
				Ønsker du å slette brukertilknytningen til {assignmentToDelete.roleName} og de underliggende
				orgenhetene?
			</Modal.Body>
			<Modal.Footer>
				<Button type="button" variant={"danger"} onClick={() => handleDeleteAssignmentData()}>
					Slett
				</Button>
				<Button type="button" variant="secondary" onClick={closeModal}>
					Avbryt
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteAssignment
