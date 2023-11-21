import { Button, Heading, Select, Table } from "@navikt/ds-react"
import styled from "styled-components"
import { IFeature, IFeatureOperation, IPermissionData } from "../../api/types"
import React, { useEffect, useState } from "react"
import { useRole } from "../../api/RoleContext"
import { useFeatures } from "../../api/FeatureContext"
import { LoaderStyled } from "../index"

const ConnectionContainer = styled.div`
	display: flex;
	flex-direction: column;

	gap: 2rem;

	.select-wrapper {
		width: fit-content;
	}

	.access-role-changes-container {
		display: flex;
		gap: 2rem;

		table,
		.summary {
			width: 50%;
		}
	}
`

const FeaturesToRolesTab = () => {
	const { roles, fetchPermissionDataForRole, permissionDataForRole, isLoading, resetPermissionData } = useRole()
	const { allFeatures, putFeaturesToRole } = useFeatures()
	const [updatedPermissionData, setUpdatedPermissionData] = useState<IPermissionData>(permissionDataForRole)

	useEffect(() => {
		resetPermissionData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		setUpdatedPermissionData(permissionDataForRole)
	}, [permissionDataForRole])
	const getPermissionDataForRoleChange = (accessRoleId: string) => {
		fetchPermissionDataForRole(accessRoleId)
	}

	const handleUpdatePermissionData = (feature: IFeature) => {
		const featureIds: string[] = updatedPermissionData.features.flatMap((feature) => String(feature.featureId))

		if (!featureIds.includes(String(feature.id))) {
			const featureConverted: IFeatureOperation = {
				featureId: Number(feature.id),
				featureName: feature.name,
				operations: ["GET"]
			}
			const newFeatureList = updatedPermissionData.features
			newFeatureList.push(featureConverted)
			setUpdatedPermissionData({ ...updatedPermissionData, features: newFeatureList })
		}
	}

	const handleUpdateSelectedRole = (param: string) => {
		const newPermissionData: IPermissionData = { ...updatedPermissionData, accessRoleId: param }
		setUpdatedPermissionData(newPermissionData)
		getPermissionDataForRoleChange(param)
	}

	const handlePutFeaturesToRole = () => {
		putFeaturesToRole(updatedPermissionData)
	}

	const flatListOfIds = updatedPermissionData.features.flatMap((feature) => String(feature.featureId))

	return (
		<>
			<Heading size={"small"}>Knytt features til roller</Heading>
			<ConnectionContainer>
				<div className={"select-wrapper"}>
					<Select
						label={"Velg rolle"}
						onChange={(e) => handleUpdateSelectedRole(e.target.value)}
						defaultValue={""}
					>
						<option value="" disabled={true}>
							Velg rolle
						</option>
						{roles.map((role) => (
							<option key={role.accessRoleId} value={role.accessRoleId}>
								{role.name}
							</option>
						))}
					</Select>
				</div>

				<div className={"access-role-changes-container"}>
					{updatedPermissionData.accessRoleId === "" ? (
						<></>
					) : isLoading ? (
						<LoaderStyled size={"3xlarge"} />
					) : (
						<>
							<Table>
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
													<Button
														variant={"secondary"}
														onClick={() => handleUpdatePermissionData(feature)}
													>
														Lag knytning til bruker
													</Button>
												) : (
													<span>Lagt til</span>
												)}
											</Table.DataCell>
										</Table.Row>
									))}
								</Table.Body>
							</Table>

							<div className={"summary"}>
								<Heading size={"small"}>Features lagt til</Heading>
								<ul>
									{updatedPermissionData.features.map((feature) => (
										<li key={feature.featureId}>{feature.featureName}</li>
									))}
								</ul>
								<Button variant={"primary"} onClick={() => handlePutFeaturesToRole()}>
									Lagre rolle
								</Button>
							</div>
						</>
					)}
				</div>
			</ConnectionContainer>
		</>
	)
}

export default FeaturesToRolesTab
