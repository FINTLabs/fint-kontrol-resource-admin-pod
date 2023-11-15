import { IUserRole } from "../../../api/types"
import { Button, Modal } from "@navikt/ds-react"
import React, { useEffect, useRef } from "react"

interface ChangeAssignmentsModalProps {
	assignmentToChange: IUserRole | undefined
}
const ChangeAssignmentsModal = ({ assignmentToChange }: ChangeAssignmentsModalProps) => {
	const ref = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		ref.current?.showModal()
	}, [assignmentToChange])

	console.log("omegalul", assignmentToChange)

	const handleSubmitChangesToRole = () => {}

	return (
		<div className="py-16">
			<Modal ref={ref} header={{ heading: `Endre ${assignmentToChange?.roleName}` }}>
				<Modal.Body>Ønsker du å endre?</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={() => handleSubmitChangesToRole()}>
						Lagre endringer
					</Button>
					<Button type="button" variant="secondary" onClick={() => ref.current?.close()}>
						Forkast endringer
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ChangeAssignmentsModal
