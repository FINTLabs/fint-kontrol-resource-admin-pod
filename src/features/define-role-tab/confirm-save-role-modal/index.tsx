import { IPermissionData } from "../../../api/types"
import { useRole } from "../../../api/RoleContext"
import React, { useEffect, useRef } from "react"
import { useSafeTabChange } from "../../../api/safe-tab-change-context"
import { Button, Modal } from "@navikt/ds-react"

interface ConfirmSaveModalProps {
	modifiedPermissionDataObject: IPermissionData
}

export const ConfirmSaveModal = ({ modifiedPermissionDataObject }: ConfirmSaveModalProps) => {
	const { updatePermissionDataForRole } = useRole()
	const ref = useRef<HTMLDialogElement>(null)
	const { tabToRouteTo, setCurrentTab, setIsTabModified, isModalVisible, setIsModalVisible } = useSafeTabChange()

	useEffect(() => {
		isModalVisible ? handleOpenModal() : handleCloseModal()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalVisible])

	const handleCloseModal = (shouldSave?: boolean) => {
		if (shouldSave) {
			updatePermissionDataForRole(modifiedPermissionDataObject)
			setIsTabModified(false)
			setIsModalVisible(false)
			setCurrentTab(tabToRouteTo)
		}
		ref.current?.close()
	}

	const handleOpenModal = () => {
		ref.current?.showModal()
	}

	const handleDiscardChanges = () => {
		setIsTabModified(false)
		setIsModalVisible(false)
		ref.current?.close()
		setCurrentTab(tabToRouteTo)
	}

	return (
		<div className="py-16">
			<Modal ref={ref} header={{ heading: "Lagre endringer" }} onClose={() => handleCloseModal()}>
				<Modal.Body>Du har data som ikke er lagret. Ønsker du å forkaste endringene?</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={() => handleCloseModal(true)}>
						Lagre endringer
					</Button>
					<Button type="button" variant="secondary" onClick={() => handleDiscardChanges()}>
						Forkast endringer
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
