import { Checkbox } from "@navikt/ds-react"
import React, { useState } from "react"

interface IPermissionTableCheckbox {
	indexForOperationsList: number
	isCheckedProp: boolean
	featureId: number
	operationProp: string
	notifyOperationsChanged: (indexForOperationsList: number, featureId: number, operationProp: string) => void
}
const PermissionsTableCheckbox = ({
	indexForOperationsList,
	isCheckedProp,
	featureId,
	operationProp,
	notifyOperationsChanged
}: IPermissionTableCheckbox) => {
	const [isChecked, setIsChecked] = useState(isCheckedProp)
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
		notifyOperationsChanged(indexForOperationsList, featureId, operationProp)
	}

	return (
		<Checkbox hideLabel={true} checked={isChecked} color={"primary"} onChange={handleCheckboxChange}>
			{operationProp}
		</Checkbox>
	)
}

export default PermissionsTableCheckbox
