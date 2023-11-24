import { Button, Table } from "@navikt/ds-react"
import { IUser, IUserRole } from "../../../api/types"

interface RoleOrgUnitAssociationTableProps {
	user: IUser | undefined
	toggleChangeModal: (assignmentToChange: IUserRole) => void
	toggleDeleteModal: (assignmentToChange: IUserRole) => void
}
const RoleOrgunitAssociationTable = ({
	user,
	toggleChangeModal,
	toggleDeleteModal
}: RoleOrgUnitAssociationTableProps) => {
	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Rolle</Table.HeaderCell>
					<Table.HeaderCell align={"center"}>Tilhørende orgenhet</Table.HeaderCell>
					<Table.HeaderCell align={"center"}>Slett</Table.HeaderCell>
					<Table.HeaderCell align={"center"}>Endre</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{user?.roles?.map((role) => (
					<Table.Row key={role.roleId}>
						<Table.DataCell>{role.roleName}</Table.DataCell>
						<Table.DataCell align={"center"}>
							{role.scopes.length <= 1 ? <>Foreløpig tom</> : <>Foreløpig tom</>}
						</Table.DataCell>
						{role.scopes.map((scope) => (
							<Table.DataCell key={scope.scopeId}>
								{scope.orgUnits.map((orgUnit, index) => {
									if (scope.orgUnits.length === index + 1) {
										return `${orgUnit.shortName}`
									} else return `${orgUnit.shortName}, `
								})}
							</Table.DataCell>
						))}
						<Table.DataCell align={"center"}>
							<Button variant={"danger"} onClick={() => toggleDeleteModal(role)}>
								Slett
							</Button>
						</Table.DataCell>
						<Table.DataCell align={"center"}>
							<Button variant={"tertiary"} onClick={() => toggleChangeModal(role)}>
								Endre
							</Button>
						</Table.DataCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	)
}

export default RoleOrgunitAssociationTable
