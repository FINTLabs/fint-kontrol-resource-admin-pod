import { Button, Modal, Switch } from "@navikt/ds-react"
import React, { useRef, useState } from "react"
import OrgUnitTree from "./OrgUnitTree"
import { IOrgUnit } from "../../../api/types"
import { Buldings3Icon } from "@navikt/aksel-icons"

interface OrgUnitModalProps {
	setOrgUnitsForUser: (newSelected: any) => void
	orgUnitsForUser: IOrgUnit[]
}

const OrgUnitModal = ({ orgUnitsForUser, setOrgUnitsForUser }: OrgUnitModalProps) => {
	const ref = useRef<HTMLDialogElement>(null)
	const [aggregated, setAggregated] = useState(false)

	return (
		<div className="py-16">
			<Button
				variant={"secondary"}
				iconPosition="right"
				icon={<Buldings3Icon aria-hidden />}
				onClick={() => ref.current?.showModal()}
			>
				Velg orgenhet
			</Button>

			<Modal ref={ref} header={{ heading: "Knytt brukerrollen til orgenhet" }}>
				<Modal.Body>
					<Switch onClick={() => setAggregated(!aggregated)} checked={aggregated}>
						Inkluder underliggende enheter
					</Switch>
					<OrgUnitTree
						orgUnitsForUser={orgUnitsForUser}
						setOrgUnitsForUser={setOrgUnitsForUser}
						aggregated={aggregated}
					/>
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
