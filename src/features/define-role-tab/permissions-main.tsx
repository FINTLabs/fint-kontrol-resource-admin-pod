import React, { useEffect, useState } from "react"
import { PermissionsToolbar } from "./permissions-toolbar"
import { PermissionsTable } from "./permissions-table"
import { Table, Checkbox, Button } from "@navikt/ds-react"
import { useRole } from "../../api/RoleContext"
import styled from "styled-components"
import { IPermissionData } from "../../api/types"
import { LoaderStyled } from "../index"

export const TableStyled = styled(Table)`
	thead {
		th:first-child {
			width: 250px;
		}
		td {
		}
	}
	.loading-table {
		td {
			border-bottom: none;
		}
	}
`

const PermissionDataContainer = styled.div`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	align-items: flex-end;
`
export const PermissionsMain = () => {
	const [localSelectedAccessRoleId, setLocalSelectedAccessRoleId] = useState<string>("")
	const {
		isLoading,
		roles,
		permissionDataForRole,
		fetchPermissionDataForRole,
		getRoleNameFromId,
		resetPermissionData,
		updatePermissionDataForRole
	} = useRole()
	const [modifiedPermissionDataObject, setModifiedPermissionDataObject] =
		useState<IPermissionData>(permissionDataForRole)

	useEffect(() => {
		if (localSelectedAccessRoleId && localSelectedAccessRoleId.length > 0) {
			fetchPermissionDataForRole(localSelectedAccessRoleId)
		} else {
			resetPermissionData()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localSelectedAccessRoleId])

	return (
		<>
			<PermissionsToolbar
				roleName={getRoleNameFromId(localSelectedAccessRoleId)}
				roles={roles}
				selectedAccessRoleId={localSelectedAccessRoleId}
				setSelectedAccessRoleId={setLocalSelectedAccessRoleId}
			/>
			{isLoading ? (
				<LoaderStyled size={"3xlarge"} />
			) : permissionDataForRole.accessRoleId ? (
				<PermissionDataContainer>
					<PermissionsTable
						modifiedPermissionDataForRole={permissionDataForRole}
						setModifiedPermissionDataForRole={setModifiedPermissionDataObject}
					/>
					<Button onClick={() => updatePermissionDataForRole(modifiedPermissionDataObject)}>
						Lagre rolle
					</Button>
				</PermissionDataContainer>
			) : (
				<BlankTable /> // Render the blank table when no accessRoleId is selected
			)}
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
					<Table.HeaderCell>GET</Table.HeaderCell>
					<Table.HeaderCell>POST</Table.HeaderCell>
					<Table.HeaderCell>PUT</Table.HeaderCell>
					<Table.HeaderCell>DELETE</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>{blankData}</Table.Body>
		</TableStyled>
	)
}
