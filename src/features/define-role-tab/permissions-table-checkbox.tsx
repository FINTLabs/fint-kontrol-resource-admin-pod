import { Checkbox } from "@navikt/ds-react"
import React, { useState } from "react"
import { IFeatureOperation } from "../../api/types"

interface IPermissionTableCheckbox {
	featureNameProp: string
	isCheckedProp: boolean
	operationProp: string
	notifyOperationsChanged: (featureName: string, operationProp: string, isChecked: boolean) => void
}
const PermissionsTableCheckbox = ({
	featureNameProp,
	isCheckedProp,
	operationProp,
	notifyOperationsChanged
}: IPermissionTableCheckbox) => {
	const [isChecked, setIsChecked] = useState(isCheckedProp)
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
		notifyOperationsChanged(featureNameProp, operationProp, isChecked)
	}

	return (
		<Checkbox hideLabel={true} checked={isChecked} color={"primary"} onChange={handleCheckboxChange}>
			{operationProp}
		</Checkbox>
	)
}

export default PermissionsTableCheckbox
