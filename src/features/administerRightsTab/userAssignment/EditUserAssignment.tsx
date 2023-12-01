import styled from "styled-components"
import { IUserRole } from "../../../api/types"
import { Button } from "@navikt/ds-react"
import { useState } from "react"

const EditUserContainer = styled.div`
	display: flex;
	flex-direction: column;

	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	button {
		margin-left: 1rem;
		float: right;
	}
`

interface EditUserAssignmentProps {
	assignmentDetails: IUserRole
	setUpdateAssignmentWhenDeletingOrgUnit: (updatedAssignment: IUserRole) => void
}
const EditUserAssignment = ({ assignmentDetails, setUpdateAssignmentWhenDeletingOrgUnit }: EditUserAssignmentProps) => {
	const [updatedAssignment] = useState<IUserRole>(assignmentDetails)
	const handleDeleteOrgUnitInAssignment = (indexOfScope: number, indexOfOrgUnitInScope: number) => {
		const orgUnitFiltered = updatedAssignment.scopes[indexOfScope].orgUnits.filter(
			(orgUnit, orgUnitIndex) => orgUnitIndex !== indexOfOrgUnitInScope
		)

		let assignmentAfterDeletion: IUserRole = { ...updatedAssignment }
		assignmentAfterDeletion.scopes[indexOfScope].orgUnits = orgUnitFiltered
		setUpdateAssignmentWhenDeletingOrgUnit(assignmentAfterDeletion)
	}

	return (
		<EditUserContainer>
			<ul>
				{assignmentDetails.scopes.map((scope, indexOfScope) =>
					scope.orgUnits.map((orgUnit, indexOfOrgUnit) => {
						return (
							<li key={indexOfOrgUnit}>
								Slett rolletilhørighet mot {orgUnit.shortName}
								<Button
									variant={"danger"}
									size={"small"}
									value={orgUnit.orgUnitId}
									onClick={(event) => handleDeleteOrgUnitInAssignment(indexOfScope, indexOfOrgUnit)}
								>
									Slett
								</Button>
							</li>
						)
					})
				)}
			</ul>
		</EditUserContainer>
	)
}

export default EditUserAssignment
