import React, { useEffect, useState } from "react"
import { PermissionsToolbar } from "./PermissionsToolbar"
import { PermissionsTable } from "./PermissionsTable"
import { Table, Checkbox, Button } from "@navikt/ds-react"
import { useRole } from "../../api/RoleContext"
import styled from "styled-components"
import { IPermissionData } from "../../api/types"
import { LoaderStyled } from "../index"
import { useSafeTabChange } from "../../api/SafeTabChangeContext"
import { ConfirmSaveModal } from "./confirmSaveRoleModal"

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

	.navds-checkbox {
		margin: 0 auto;
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
	const { setIsTabModified } = useSafeTabChange()

	useEffect(() => {
		setIsTabModified(false)
		if (localSelectedAccessRoleId && localSelectedAccessRoleId.length > 0) {
			fetchPermissionDataForRole(localSelectedAccessRoleId)
		} else {
			resetPermissionData()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localSelectedAccessRoleId])

	const handleUpdatePermissionData = () => {
		updatePermissionDataForRole(modifiedPermissionDataObject)
		setIsTabModified(false)
	}

	return (
		<>
			<ConfirmSaveModal modifiedPermissionDataObject={modifiedPermissionDataObject} />
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
					<Button onClick={handleUpdatePermissionData}>Lagre rolle</Button>
				</PermissionDataContainer>
			) : (
				<BlankTable /> // Render the blank table when no accessRoleId is selected
			)}
		</>
	)
}

const BlankTable = () => {
	const readableOperations = ["Kan hente", "Kan lage ny", "Kan oppdatere", "Kan slette"]
	return (
		<TableStyled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Feature</Table.HeaderCell>
					{readableOperations.map((ele) => (
						<Table.HeaderCell key={ele} align={"center"}>
							{ele}
						</Table.HeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{Array.from({ length: 4 }, (_, rowIdx) => (
					<Table.Row key={rowIdx}>
						<Table.DataCell key={0}></Table.DataCell>
						{Array.from({ length: 4 }, (_, colIdx) => (
							<Table.DataCell key={colIdx}>
								<Checkbox hideLabel={true} disabled={true}>
									{rowIdx + " " + colIdx}
								</Checkbox>
							</Table.DataCell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</TableStyled>
	)
}
