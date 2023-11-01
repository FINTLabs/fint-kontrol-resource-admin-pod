import { Button, Modal } from "@navikt/ds-react"
import React, { useRef } from "react"
import OrgUnitTree from "./org-unit-tree"

interface OrgUnitModal {
	setOrgUnitsForUser: (newSelected: any) => void
}

const OrgUnitModal = ({ setOrgUnitsForUser }: OrgUnitModal) => {
	const ref = useRef<HTMLDialogElement>(null)

	return (
		<div className="py-16">
			<Button onClick={() => ref.current?.showModal()}>Velg orgenhet</Button>

			<Modal ref={ref} header={{ heading: "Knytt brukerrollen til orgenhet" }}>
				<Modal.Body>
					<OrgUnitTree setOrgUnitsForUser={setOrgUnitsForUser} />
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={() => ref.current?.close()}>
						Velg orgenhet
					</Button>
					<Button type="button" variant="secondary" onClick={() => ref.current?.close()}>
						Lukk
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default OrgUnitModal
