import { Button, Modal, Select, Switch } from "@navikt/ds-react"
import React, { useRef, useState } from "react"
import OrgUnitTree from "./OrgUnitTree"
import { IOrgUnit } from "../../../api/types"
import { Buldings3Icon } from "@navikt/aksel-icons"
import { useRole } from "../../../api/RoleContext"

interface OrgUnitModalProps {
	handleModalMapping: (scopeAccessRoleId: string, scopeOrgUnits: IOrgUnit[]) => void
}

const OrgUnitModal = ({ handleModalMapping }: OrgUnitModalProps) => {
	const { roles } = useRole()
	const ref = useRef<HTMLDialogElement>(null)
	const [aggregated, setAggregated] = useState(false)
	const [scopeAccessRoleId, setScopeAccessRoleId] = useState<string>("")
	const [scopeOrgUnits, setScopeOrgUnits] = useState<IOrgUnit[]>([])

	const handleOpen = () => {
		ref.current?.showModal()
	}
	const handleClose = () => {
		ref.current?.close()
	}

	const handleSubmit = () => {
		handleModalMapping(scopeAccessRoleId, scopeOrgUnits)
		ref.current?.close()
		reset()
	}

	const reset = () => {
		setAggregated(false)
		setScopeAccessRoleId("")
		setScopeOrgUnits([])
	}

	return (
		<div className="py-16">
			<Button
				variant={"secondary"}
				iconPosition="right"
				icon={<Buldings3Icon aria-hidden />}
				onClick={handleOpen}
			>
				Klargjør tildeling
			</Button>

			<Modal
				ref={ref}
				header={{ heading: "Knytt brukerrollen til orgenhet" }}
				onAbort={handleClose}
				onCancel={handleClose}
			>
				<Modal.Body>
					<Select
						size={"medium"}
						value={scopeAccessRoleId}
						onChange={(e) => setScopeAccessRoleId(e.target.value)}
						id={"tildel-rolle"}
						label={"Tildel rolle"}
					>
						<option value="" disabled={true}>
							Velg rolle
						</option>
						{roles.map((role) => (
							<option value={role.accessRoleId} key={role.accessRoleId}>
								{role.name}
							</option>
						))}
					</Select>

					<Switch onClick={() => setAggregated(!aggregated)} checked={aggregated}>
						Inkluder underliggende enheter
					</Switch>
					<OrgUnitTree
						orgUnitsForUser={scopeOrgUnits}
						setOrgUnitsForUser={setScopeOrgUnits}
						aggregated={aggregated}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={handleSubmit}>
						Velg orgenhet
					</Button>
					<Button type="button" variant="secondary" onClick={handleClose}>
						Lukk
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default OrgUnitModal
