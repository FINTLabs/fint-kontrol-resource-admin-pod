import {Role} from "./types";

const initialData: Role[] = [
    {
        Id: 1,
        Feature: "users",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 2,
        Feature: "users-details",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 3,
        Feature: "roles",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 4,
        Feature: "roles-details",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 5,
        Feature: "roles-members",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 6,
        Feature: "resources",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 7,
        Feature: "resources-details",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 8,
        Feature: "assignments",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 9,
        Feature: "assignments-details",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 10,
        Feature: "assignments",
        Operation: "REDIGERE",
        AccessRoleId: "ata"
    },
    {
        Id: 11,
        Feature: "assignments-details",
        Operation: "LAGE",
        AccessRoleId: "ata"
    },
    {
        Id: 12,
        Feature: "assignments-details",
        Operation: "SLETTE",
        AccessRoleId: "ata"
    },
    {
        Id: 13,
        Feature: "resources",
        Operation: "VISNING",
        AccessRoleId: "aa"
    },
    {
        Id: 14,
        Feature: "resources-details",
        Operation: "VISNING",
        AccessRoleId: "aa"
    },
    {
        Id: 15,
        Feature: "resources",
        Operation: "REDIGERE",
        AccessRoleId: "aa"
    },
    {
        Id: 16,
        Feature: "resources-details",
        Operation: "LAGE",
        AccessRoleId: "aa"
    },
    {
        Id: 17,
        Feature: "resources-details",
        Operation: "SLETTE",
        AccessRoleId: "aa"
    },
    {
        Id: 18,
        Feature: "orgunits",
        Operation: "VISNING",
        AccessRoleId: "aa"
    },
    {
        Id: 19,
        Feature: "orgunits-details",
        Operation: "VISNING",
        AccessRoleId: "aa"
    },
    {
        Id: 20,
        Feature: "orgunits",
        Operation: "VISNING",
        AccessRoleId: "ata"
    },
    {
        Id: 21,
        Feature: "orgunits-details",
        Operation: "VISNING",
        AccessRoleId: "ata"
    }
];

export default initialData;
