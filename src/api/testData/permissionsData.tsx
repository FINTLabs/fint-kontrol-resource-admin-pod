import { IPermissionData } from "../types"

const initialData: IPermissionData[] = [
	{
		accessRoleId: "ata",
		name: "Applikasjonstilgangadministrator",
		featureOperations: [
			{
				name: "users",
				operations: ["GET"]
			},
			{
				name: "users-details",
				operations: ["GET", "POST"]
			},
			{
				name: "roles",
				operations: ["GET", "POST", "PUT", "DELETE"]
			},
			{
				name: "roles-details",
				operations: ["GET"]
			},
			{
				name: "resources",
				operations: ["GET", "POST"]
			},
			{
				name: "resources-details",
				operations: ["GET", "POST"]
			},
			{
				name: "assignments",
				operations: ["GET"]
			},
			{
				name: "assignments-details",
				operations: ["GET", "POST"]
			}
		]
	},

	{
		accessRoleId: "aa",
		name: "Applikasjonsadministrator",
		featureOperations: [
			{
				name: "assignments",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				name: "assignments-details",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				name: "resources",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				name: "resources-details",
				operations: ["GET", "POST", "PUT", "DELETE"]
			},
			{
				name: "orgunits",
				operations: ["GET", "POST"]
			},
			{
				name: "orgunits-details",
				operations: ["GET", "POST", "PUT"]
			}
		]
	},

	{
		accessRoleId: "al",
		name: "Enhetsleder",
		featureOperations: [
			{
				name: "assignments",
				operations: ["GET"]
			},
			{
				name: "assignments-details",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				name: "resources",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				name: "resources-details",
				operations: ["GET", "POST", "PUT", "DELETE"]
			},
			{
				name: "orgunits",
				operations: ["GET", "POST"]
			},
			{
				name: "orgunits-details",
				operations: ["GET", "POST", "PUT"]
			}
		]
	},

	{
		accessRoleId: "sb",
		name: "Sluttbruker",
		featureOperations: [
			{
				name: "assignments",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				name: "assignments-details",
				operations: ["GET", "POST"]
			},
			{
				name: "resources",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				name: "resources-details",
				operations: ["GET", "POST", "PUT", "DELETE"]
			},
			{
				name: "orgunits",
				operations: ["GET"]
			},
			{
				name: "orgunits-details",
				operations: ["GET", "POST", "PUT"]
			}
		]
	}
]

export default initialData
