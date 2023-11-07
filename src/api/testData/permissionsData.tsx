import { IPermissionData } from "../types"

const initialData: IPermissionData[] = [
	{
		accessRoleId: "ata",
		features: [
			{
				featureId: 1,
				featureName: "users",
				operations: ["GET"]
			},
			{
				featureId: 2,
				featureName: "users-details",
				operations: ["GET", "POST"]
			},
			{
				featureId: 3,
				featureName: "roles",
				operations: ["GET", "POST", "PUT", "DELETE"]
			},
			{
				featureId: 4,
				featureName: "roles-details",
				operations: ["GET"]
			},
			{
				featureId: 5,
				featureName: "resources",
				operations: ["GET", "POST"]
			},
			{
				featureId: 6,
				featureName: "resources-details",
				operations: ["GET", "POST"]
			},
			{
				featureId: 7,
				featureName: "assignments",
				operations: ["GET"]
			},
			{
				featureId: 8,
				featureName: "assignments-details",
				operations: ["GET", "POST"]
			}
		]
	},

	{
		accessRoleId: "aa",
		features: [
			{
				featureId: 1,
				featureName: "assignments",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				featureId: 2,
				featureName: "assignments-details",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				featureId: 3,
				featureName: "resources",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				featureId: 4,
				featureName: "resources-details",
				operations: ["GET", "POST", "PUT", "DELETE"]
			},
			{
				featureId: 5,
				featureName: "orgunits",
				operations: ["GET", "POST"]
			},
			{
				featureId: 6,
				featureName: "orgunits-details",
				operations: ["GET", "POST", "PUT"]
			}
		]
	},

	{
		accessRoleId: "al",
		features: [
			{
				featureId: 1,
				featureName: "assignments",
				operations: ["GET"]
			},
			{
				featureId: 2,
				featureName: "assignments-details",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				featureId: 3,
				featureName: "resources",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				featureId: 4,
				featureName: "resources-details",
				operations: ["GET", "POST", "PUT", "DELETE"]
			},
			{
				featureId: 5,
				featureName: "orgunits",
				operations: ["GET", "POST"]
			},
			{
				featureId: 6,
				featureName: "orgunits-details",
				operations: ["GET", "POST", "PUT"]
			}
		]
	},

	{
		accessRoleId: "sb",
		features: [
			{
				featureId: 1,
				featureName: "assignments",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				featureId: 2,
				featureName: "assignments-details",
				operations: ["GET", "POST"]
			},
			{
				featureId: 3,
				featureName: "resources",
				operations: ["GET", "POST", "DELETE"]
			},
			{
				featureId: 4,
				featureName: "resources-details",
				operations: ["GET", "POST", "PUT", "DELETE"]
			},
			{
				featureId: 5,
				featureName: "orgunits",
				operations: ["GET"]
			},
			{
				featureId: 6,
				featureName: "orgunits-details",
				operations: ["GET", "POST", "PUT"]
			}
		]
	}
]

export default initialData
