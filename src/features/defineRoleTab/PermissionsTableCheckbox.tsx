import { Checkbox } from "@navikt/ds-react"
import React, { useState } from "react"
import { useSafeTabChange } from "../../api/SafeTabChangeContext"
import { IFeatureOperation } from "../../api/types"

interface IPermissionTableCheckbox {
	indexForOperationsList: number
	isCheckedProp: boolean
	feature: IFeatureOperation
	operationProp: string
	notifyOperationsChanged: (indexForOperationsList: number, featureId: number, operationProp: string) => void
}
const PermissionsTableCheckbox = ({
	indexForOperationsList,
	isCheckedProp,
	feature,
	operationProp,
	notifyOperationsChanged
}: IPermissionTableCheckbox) => {
	const [isChecked, setIsChecked] = useState(isCheckedProp)
	const { isTabModified, setIsTabModified } = useSafeTabChange()
	const handleCheckboxChange = () => {
		if (operationProp !== "GET") {
			setIsChecked(!isChecked)
			if (!isTabModified) {
				setIsTabModified(true)
			}
			notifyOperationsChanged(indexForOperationsList, feature.featureId, operationProp)
		}
	}

	return (
		<Checkbox
			hideLabel={true}
			checked={isChecked}
			color={"primary"}
			onChange={handleCheckboxChange}
			disabled={operationProp === "GET"}
		>
			`${feature.featureName}: ${operationProp}`
		</Checkbox>
	)
}

export default PermissionsTableCheckbox
