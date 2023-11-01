import React, { useEffect, useState } from "react"
import { PermissionsToolbar } from "./permissions-toolbar"
import { PermissionsTable } from "./permissions-table"
import { Table, Checkbox } from "@navikt/ds-react"
import { useRole } from "../../api/RoleContext"
import { IFeature, IRole } from "../../api/types"
import styled from "styled-components"

export interface Availability {
	[key: string]: boolean
}

export const TableStyled = styled(Table)`
	thead {
		th:first-child {
			width: 250px;
		}
	}
	.loading-table {
		td {
			border-bottom: none;
		}
	}
`
export const PermissionsMain = () => {
	const [localSelectedAccessRoleId, setLocalSelectedAccessRoleId] = useState<string>("")
	const { roles, featuresInRole, fetchFeaturesInRole, permissionDataForRole, fetchPermissionDataForRole } = useRole() // Retrieves all roles the user can administer

	useEffect(() => {
		if (localSelectedAccessRoleId) {
			fetchFeaturesInRole(localSelectedAccessRoleId)
			fetchPermissionDataForRole(localSelectedAccessRoleId)
		}
	}, [localSelectedAccessRoleId])

	const filteredPermissions = localSelectedAccessRoleId
		? roles.filter((roles) => roles.accessRoleId === localSelectedAccessRoleId)
		: []

	// Extract unique features and operations
	// const features = Array.from(
	// 	new Set(filteredPermissions.map((item: IRole) => item.name))
	// )
	// const operations = Array.from(
	// 	new Set(filteredPermissions.map((item: IRole) => item.operations))
	// )

	const availableOperationsInFeature = ["GET", "POST", "PUT", "DELETE"]

	// Create an api structure to store availability
	// const availabilityData: { featureName: IFeature; availability: Availability }[] = featuresInRole.map(
	// 	(feature: IFeature) => {
	// 		const availability: Availability = {}
	// 		feature.operations.forEach((operation: string) => {
	// 			availability[operation] = filteredPermissions.some((item: IRole) => item.name === feature)
	// 		})
	//
	// 		return { feature, availability }
	// 	}
	// )

	return (
		<>
			<PermissionsToolbar
				selectedAccessRoleId={localSelectedAccessRoleId}
				setSelectedAccessRoleId={setLocalSelectedAccessRoleId}
			/>
			{
				permissionDataForRole ? (
					<PermissionsTable permissionDataForRole={permissionDataForRole} />
				) : (
					<BlankTable />
				) // Render the blank table when no accessRoleId is selected
			}
		</>
	)
}

const BlankTable = () => {
	// Create an array to generate 4 empty rows and 4 empty cells for user display
	const blankData = Array.from({ length: 4 }, (_, rowIdx) => (
		<Table.Row key={rowIdx}>
			<Table.DataCell key={0}></Table.DataCell>
			{Array.from({ length: 4 }, (_, colIdx) => (
				<Table.DataCell key={colIdx}>
					<Checkbox hideLabel={true} disabled={true}>
						filler
					</Checkbox>
				</Table.DataCell>
			))}
		</Table.Row>
	))

	return (
		<TableStyled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Feature</Table.HeaderCell>
					<Table.HeaderCell>Visning</Table.HeaderCell>
					<Table.HeaderCell>Redigere</Table.HeaderCell>
					<Table.HeaderCell>Opprette</Table.HeaderCell>
					<Table.HeaderCell>Slette</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>{blankData}</Table.Body>
		</TableStyled>
	)
}
