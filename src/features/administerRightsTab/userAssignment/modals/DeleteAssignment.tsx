import { Button, Modal, Select, Switch } from "@navikt/ds-react"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { IRole, IUser } from "../../../../api/types"
import styled from "styled-components"

const ModalBodyStyled = styled(Modal.Body)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

interface DeleteAssignmentsModalProps {
	selectedRoleToDeleteFrom: IRole
	modalOpenProp: boolean
	setIsDeleteModalOpen: (isOpen: boolean) => void
	userData: IUser
}

const DeleteAssignment = ({
	setIsDeleteModalOpen,
	modalOpenProp,
	selectedRoleToDeleteFrom,
	userData
}: DeleteAssignmentsModalProps) => {
	const deleteRef = useRef<HTMLDialogElement>(null)
	const [completeDelete, setCompleteDelete] = useState(false)

	useEffect(() => {
		if (selectedRoleToDeleteFrom.accessRoleId.length > 0 || modalOpenProp) {
			openModal()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRoleToDeleteFrom, modalOpenProp])

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
		// AssignmentRepository. (basePath, assignmentId, orgUnitsToInclude[], booleanForJustDeleteEverything)
		toast.info("Sletting er foreløpig ikke mulig.")
		closeModal()
	}

	const objectTypesInUser = userData.roles?.flatMap((role) => role.scopes.map((scope) => scope.objectType))
	// Use Set to get unique values
	const uniqueObjectTypes = Array.from(new Set(objectTypesInUser))

	return (
		<Modal ref={deleteRef} header={{ heading: `Slett ${selectedRoleToDeleteFrom.name}?` }} onClose={closeModal}>
			<ModalBodyStyled>
				Ønsker du å slette brukertilknytningen til {selectedRoleToDeleteFrom.name} og de underliggende
				orgenhetene?
				<Switch onClick={() => setCompleteDelete(!completeDelete)} checked={completeDelete}>
					Fjern hele knytningen uavhengig objekttyper?{" "}
				</Switch>
				{!completeDelete && (
					<Select label={"Velg objekttype å inkludere i sletting"}>
						{uniqueObjectTypes.map((objectType, index) => (
							<option key={index}>{objectType}</option>
						))}
					</Select>
				)}
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

export default DeleteAssignment
