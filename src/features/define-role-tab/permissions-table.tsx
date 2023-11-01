import React, { useState } from "react"
import { TableStyled } from "./permissions-main"
import { Checkbox, Table } from "@navikt/ds-react"
import { IPermissionData } from "../../api/types"

interface PermissionsTableProps {
	permissionDataForRole: IPermissionData
}
export const PermissionsTable = ({ permissionDataForRole }: PermissionsTableProps) => {
	const [updatedPermissionDataForRoleToUpdate, setUpdatedPermissionDataForRoleToUpdate] =
		useState<IPermissionData>(permissionDataForRole)
	const handleCheckboxChange = (featureName: string, operation: string, isChecked: boolean) => {
		const permissionDataForRoleToUpdate = updatedPermissionDataForRoleToUpdate
		let selectedFeatureWithOperations = permissionDataForRoleToUpdate.featureOperations.find(
			(feature) => feature.name === featureName
		)

		// if (selectedFeatureWithOperations) {
		// 		selectedFeatureWithOperations = roleContextDefaultValues.permissionDataForRole.featureOperations
		// }

		if (selectedFeatureWithOperations?.operations.includes(operation)) {
			selectedFeatureWithOperations.operations = selectedFeatureWithOperations.operations.filter(
				(operationElement: string) => operationElement === operation
			)
		}

		permissionDataForRoleToUpdate.featureOperations.map((feature) => {
			if (feature.name === featureName) {
				feature.operations = selectedFeatureWithOperations?.operations ?? []
			}

			return []
		})

		// setUpdatedPermissionDataForRoleToUpdate(featuresToUpdate)
	}

	const availableOperations = ["GET", "PUT", "POST", "DELETE"]
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
								<Checkbox
									hideLabel={true}
									checked={feature.operations.includes(operation)}
									color={"primary"}
									onChange={(e) => handleCheckboxChange(feature.name, operation, e.target.checked)}
								>
									{operation}
								</Checkbox>
							</Table.DataCell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</TableStyled>
	)
}
