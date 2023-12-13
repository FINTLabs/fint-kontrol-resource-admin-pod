import { Button, Modal } from "@navikt/ds-react"
import React, { useEffect, useRef } from "react"
import { IOrgUnitDetail } from "../../../../api/types"
import styled from "styled-components"
import { useAssignments } from "../../../../api/AssignmentContext"

const ModalBodyStyled = styled(Modal.Body)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

interface DeleteOrgUnitsInAssignmentProps {
	modalOpenProp: boolean
	setIsDeleteModalOpen: (isOpen: boolean) => void
	roleToDeleteFrom: string
	scopeId: string
	orgUnitToDelete: IOrgUnitDetail
	userId: string
}

const DeleteOrgUnitInAssignment = ({
	modalOpenProp,
	orgUnitToDelete,
	roleToDeleteFrom,
	setIsDeleteModalOpen,
	scopeId,
	userId
}: DeleteOrgUnitsInAssignmentProps) => {
	const { deleteOrgUnitFromAssignment } = useAssignments()
	const deleteRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		modalOpenProp ? openModal() : closeModal()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalOpenProp])
	const openModal = () => {
		setIsDeleteModalOpen(true)
		deleteRef.current?.showModal()
	}

	const closeModal = () => {
		setIsDeleteModalOpen(false)
		deleteRef.current?.close()
	}

	const handleDeleteAssignmentData = () => {
		deleteOrgUnitFromAssignment(userId, scopeId, orgUnitToDelete.orgUnitId)
		closeModal()
	}

	return (
		<Modal
			ref={deleteRef}
			header={{ heading: `Slett ${orgUnitToDelete.name}?` }}
			onAbort={closeModal}
			onClose={closeModal}
			onCancel={closeModal}
		>
			<ModalBodyStyled>
				Ønsker du å slette orgenhetknytning {orgUnitToDelete.name} til {roleToDeleteFrom}?
			</ModalBodyStyled>
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

export default DeleteOrgUnitInAssignment
