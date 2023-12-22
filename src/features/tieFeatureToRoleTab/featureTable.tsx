import { Button, Table } from "@navikt/ds-react"
import React from "react"
import { IFeature, IPermissionData } from "../../api/types"

interface FeatureTableProps {
	allFeatures: IFeature[]
	handleUpdatePermissionData: (feature: IFeature) => void
	updatedPermissionData: IPermissionData
}

const FeatureTable = ({ allFeatures, handleUpdatePermissionData, updatedPermissionData }: FeatureTableProps) => {
	const flatListOfIds = updatedPermissionData.features.flatMap((feature) => String(feature.featureId))

	return (
		<Table id={"features-table"}>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Featurenavn</Table.HeaderCell>
					<Table.HeaderCell align={"center"}>Knytt til rolle</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{allFeatures.map((feature) => (
					<Table.Row key={feature.id}>
						<Table.DataCell>{feature.name}</Table.DataCell>
						<Table.DataCell align={"center"}>
							{!flatListOfIds.includes(String(feature.id)) ? (
								<Button variant={"secondary"} onClick={() => handleUpdatePermissionData(feature)}>
									Lag knytning til bruker
								</Button>
							) : (
								<Button variant={"danger"} onClick={() => handleUpdatePermissionData(feature)}>
									Fjern knytning
								</Button>
							)}
						</Table.DataCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	)
}

export default FeatureTable
