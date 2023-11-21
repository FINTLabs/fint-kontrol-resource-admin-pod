import React, { useEffect, useState } from "react"
import { TableStyled } from "./PermissionsMain"
import { Table } from "@navikt/ds-react"
import { IPermissionData } from "../../api/types"
import PermissionsTableCheckbox from "./PermissionsTableCheckbox"

interface PermissionsTableProps {
	modifiedPermissionDataForRole: IPermissionData
	setModifiedPermissionDataForRole: (updatedPermissionData: IPermissionData) => void
}
export const PermissionsTable = ({
	modifiedPermissionDataForRole,
	setModifiedPermissionDataForRole
}: PermissionsTableProps) => {
	const [currentOperations, setCurrentOperations] = useState<string[][]>([])

	useEffect(() => {
		const operationsList: string[][] = []
		modifiedPermissionDataForRole.features.map((feature) => operationsList.push(feature.operations))
		setCurrentOperations(operationsList)
	}, [modifiedPermissionDataForRole.features])

	// Handles local update of new permissionData
	useEffect(() => {
		let newFeatureOperations: IPermissionData = modifiedPermissionDataForRole
		currentOperations.forEach((featureOperation, index) => {
			newFeatureOperations.features[index].operations = featureOperation
		})
		setModifiedPermissionDataForRole(newFeatureOperations)
	}, [currentOperations, modifiedPermissionDataForRole, setModifiedPermissionDataForRole])

	const notifyOperationsChanged = (indexForOperationsList: number, featureId: number, operationProp: string) => {
		let changedList: string[] = currentOperations[indexForOperationsList]

		if (changedList.includes(operationProp)) {
			changedList = changedList.filter((operation) => operation !== operationProp)
		} else {
			changedList.push(operationProp)
		}
		// Now, replace the featureOperation in the permission's list of operations
		const newOperationsList: string[][] = [
			...currentOperations.slice(0, indexForOperationsList),
			changedList,
			...currentOperations.slice(indexForOperationsList + 1)
		]
		setCurrentOperations(newOperationsList)
	}

	const availableOperations = ["GET", "POST", "PUT", "DELETE"]

	return (
		<TableStyled id={"permissions-table"}>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Feature</Table.HeaderCell>
					{availableOperations.map((operation, index) => (
						<Table.HeaderCell key={operation + index}>{operation}</Table.HeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{modifiedPermissionDataForRole.features.map((feature, indexForFeature) => (
					<Table.Row key={feature.featureName + indexForFeature}>
						<Table.DataCell>{feature.featureName}</Table.DataCell>
						{availableOperations.map((operation: string, index) => (
							<Table.DataCell key={operation}>
								<PermissionsTableCheckbox
									featureId={feature.featureId}
									indexForOperationsList={indexForFeature}
									isCheckedProp={feature.operations.includes(operation)}
									operationProp={operation}
									notifyOperationsChanged={notifyOperationsChanged}
								/>
							</Table.DataCell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</TableStyled>
	)
}
