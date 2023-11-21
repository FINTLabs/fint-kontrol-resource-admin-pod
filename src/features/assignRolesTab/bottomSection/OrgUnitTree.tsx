import { IOrgUnit } from "../../../api/types"
import { useOrgUnits } from "../../../api/OrgUnitContext"
import React from "react"
import { Accordion } from "@navikt/ds-react"
import { Checkbox } from "@mui/material"
import styled from "styled-components"

const StyledAccordion = styled(Accordion)`
	* {
		border-bottom: none;
		box-shadow: none !important;
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}
`

interface OrgUnitTreeProps {
	orgUnitsForUser: IOrgUnit[]
	nodes?: IOrgUnit
	setOrgUnitsForUser: (newSelected: any) => void
	aggregated: boolean
}
const OrgUnitTree = ({ orgUnitsForUser, nodes: IOrgUnit, setOrgUnitsForUser, aggregated }: OrgUnitTreeProps) => {
	const { orgUnitsData } = useOrgUnits()

	const toggleOrgUnit = (orgUnit: IOrgUnit) => {
		const isSelected = orgUnitsForUser.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)
		let newSelected: IOrgUnit[]

		if (isSelected) {
			newSelected = orgUnitsForUser.filter((unit) => unit.organisationUnitId !== orgUnit.organisationUnitId)
		} else {
			if (!orgUnitsForUser.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)) {
				newSelected = [...orgUnitsForUser, orgUnit]
			} else {
				newSelected = orgUnitsForUser
			}
		}

		setOrgUnitsForUser(newSelected) // Updates list of selected org units
	}

	const toggleOrgUnitAndChildren = (orgUnit: IOrgUnit) => {
		const isSelected = orgUnitsForUser.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)
		let newSelected = [...orgUnitsForUser]

		if (isSelected) {
			newSelected = orgUnitsForUser.filter((unit) => unit.organisationUnitId !== orgUnit.organisationUnitId)
		} else {
			if (!orgUnitsForUser.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)) {
				newSelected.push(orgUnit)
			}
		}

		const childrenOrgUnits = findChildrenOrgUnits(orgUnit)
		for (const childOrgUnit of childrenOrgUnits) {
			if (isSelected) {
				newSelected = newSelected.filter((unit) => unit.organisationUnitId !== childOrgUnit.organisationUnitId)
			} else {
				if (!newSelected.some((unit) => unit.organisationUnitId === childOrgUnit.organisationUnitId)) {
					newSelected.push(childOrgUnit)
				}
			}
		}

		setOrgUnitsForUser(newSelected) // Updates list of selected org units
	}

	const findChildrenOrgUnits = (orgUnit: IOrgUnit): IOrgUnit[] => {
		const childrenOrgUnits: IOrgUnit[] = []

		const findChildren = (node: IOrgUnit) => {
			if (Array.isArray(node.childrenRef)) {
				for (const nodeId of node.childrenRef) {
					const childNode = orgUnitsData?.orgUnits.find((n) => n.organisationUnitId === nodeId)
					if (childNode) {
						childrenOrgUnits.push(childNode)
						findChildren(childNode)
					}
				}
			}
		}

		findChildren(orgUnit)
		return childrenOrgUnits
	}

	const handleCheckboxClick = (orgUnit: IOrgUnit) => {
		if (aggregated) {
			toggleOrgUnitAndChildren(orgUnit)
		} else {
			toggleOrgUnit(orgUnit)
		}
	}

	const renderTree = (nodes: IOrgUnit) => {
		return (
			<StyledAccordion key={nodes.organisationUnitId}>
				<Accordion.Item>
					<Accordion.Header>
						<Checkbox
							id={`node-${nodes.organisationUnitId}`}
							checked={orgUnitsForUser.some(
								(unit) => unit.organisationUnitId === nodes.organisationUnitId
							)}
							onClick={(event) => {
								event.stopPropagation()
								handleCheckboxClick(nodes)
							}}
						/>
						{nodes.name}
					</Accordion.Header>
					<Accordion.Content>
						{Array.isArray(nodes.childrenRef)
							? nodes.childrenRef.map((nodeId: string) => {
									const node = orgUnitsData?.orgUnits.find((n) => n.organisationUnitId === nodeId)
									if (node) {
										return renderTree(node)
									}
									return null
							  })
							: null}
					</Accordion.Content>
				</Accordion.Item>
			</StyledAccordion>
		)
	}

	return (
		<>
			{orgUnitsData?.orgUnits?.map((node: any) => {
				if (node.parentRef !== node.organisationUnitId) {
					return null
				}
				return renderTree(node)
			})}
		</>
	)
}

export default OrgUnitTree
