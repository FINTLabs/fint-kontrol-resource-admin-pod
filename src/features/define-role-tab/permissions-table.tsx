import React, { useState } from "react"
import { Availability, TableStyled } from "./permissions-main"
import { Checkbox, Table } from "@navikt/ds-react"
import { IFeature, IFeatureOperation, IPermissionData, roleContextDefaultValues } from "../../api/types"

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
		// 	selectedFeatureWithOperations = roleContextDefaultValues.permissionDataForRole.featureOperations
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

	if (!permissionDataForRole) {
		return <>permissionData is empty.</>
	}

	return (
		<TableStyled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Feature</Table.HeaderCell>
					{permissionDataForRole.featureOperations.map((operation) => (
						<Table.HeaderCell key={operation.name}>{operation.name}</Table.HeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{permissionDataForRole.featureOperations.map((feature, index) => (
					<Table.Row key={feature.name + index}>
						<Table.DataCell>{feature.name}</Table.DataCell>
						{feature.operations.map((operation: string) => (
							<Table.DataCell key={operation}>
								{feature.operations.includes(operation) && (
									// TODO: Determine how checkboxes should be visible and editable.
									<Checkbox
										hideLabel={true}
										checked={feature.operations.includes(operation)}
										color={"primary"}
										onChange={(e) =>
											handleCheckboxChange(feature.name, operation, e.target.checked)
										}
									>
										{operation}
									</Checkbox>
								)}
							</Table.DataCell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</TableStyled>
	)
}
