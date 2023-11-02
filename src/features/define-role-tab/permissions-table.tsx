import React, { useState } from "react"
import { TableStyled } from "./permissions-main"
import { Table } from "@navikt/ds-react"
import { IPermissionData } from "../../api/types"
import PermissionsTableCheckbox from "./permissions-table-checkbox"

interface PermissionsTableProps {
	permissionDataForRole: IPermissionData
}
export const PermissionsTable = ({ permissionDataForRole }: PermissionsTableProps) => {
	const [updatedPermissionDataForRoleToUpdate] = useState<IPermissionData>(permissionDataForRole)
	// const [isUpdated, setIsUpdated] = useState(false)
	// const [listOfChanges, updateListOfChanges] = useState([]) // This is the list of all changes done. Will be displayed on save-prompt

	// useEffect(() => {
	// 	setIsUpdated(!isUpdated)
	// 	console.log(isUpdated)
	// }, [updatedPermissionDataForRoleToUpdate, isUpdated])

	// if (updatedPermissionDataForRoleToUpdate.accessRoleId !== "baaa") {
	// 	setUpdatedPermissionDataForRoleToUpdate(updatedPermissionDataForRoleToUpdate) // Remove later, this is done to ensure allowed publish to beta
	// }

	// const handleCheckboxChange = (featureName: string, operation: string, isChecked: boolean) => {
	// 	const permissionDataForRoleToUpdate = updatedPermissionDataForRoleToUpdate
	// 	let selectedFeatureWithOperations = permissionDataForRoleToUpdate.featureOperations.find(
	// 		(feature) => feature.name === featureName
	// 	)
	//
	// 	// if (selectedFeatureWithOperations) {
	// 	// 		selectedFeatureWithOperations = roleContextDefaultValues.permissionDataForRole.featureOperations
	// 	// }
	//
	// 	if (selectedFeatureWithOperations?.operations.includes(operation)) {
	// 		selectedFeatureWithOperations.operations = selectedFeatureWithOperations.operations.filter(
	// 			(operationElement: string) => operationElement === operation
	// 		)
	// 	}
	//
	// 	permissionDataForRoleToUpdate.featureOperations.map((feature) => {
	// 		if (feature.name === featureName) {
	// 			feature.operations = selectedFeatureWithOperations?.operations ?? []
	// 		}
	//
	// 		return []
	// 	})
	// 	// setUpdatedPermissionDataForRoleToUpdate(featuresToUpdate)
	// }
	const notifyOperationsChanged = (featureName: string, operationProp: string, isChecked: boolean) => {
		console.log("Change notified")
		let permissionDataTemporary = updatedPermissionDataForRoleToUpdate
		let operationsList = permissionDataTemporary.featureOperations.find((feature) => feature.name === featureName)
		if (operationsList) {
			// performUpdateOn
		}
	}

	const availableOperations = ["GET", "POST", "PUT", "DELETE"]

	return (
		<TableStyled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Feature</Table.HeaderCell>
					{availableOperations.map((operation, index) => (
						<Table.HeaderCell key={operation + index}>{operation}</Table.HeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{permissionDataForRole.featureOperations.map((feature, index) => (
					<Table.Row key={feature.name + index}>
						<Table.DataCell>{feature.name}</Table.DataCell>
						{availableOperations.map((operation: string, index) => (
							<Table.DataCell key={operation}>
								{/*TODO: Determine how checkboxes should be visible and editable.*/}
								<PermissionsTableCheckbox
									featureNameProp={feature.name}
									isCheckedProp={feature.operations.includes(operation)}
									operationProp={operation}
									notifyOperationsChanged={notifyOperationsChanged}
								/>
								{/*<Checkbox*/}
								{/*	hideLabel={true}*/}
								{/*	checked={feature.operations.includes(operation)}*/}
								{/*	color={"primary"}*/}
								{/*	onChange={(e) => handleCheckboxChange(feature.name, operation, e.target.checked)}*/}
								{/*>*/}
								{/*	{operation}*/}
								{/*</Checkbox>*/}
							</Table.DataCell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</TableStyled>
	)
}
