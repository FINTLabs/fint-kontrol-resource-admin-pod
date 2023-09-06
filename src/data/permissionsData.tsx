import Data from "./types";

const initialData: Data[] = [
    {
        Id: 1,
        Feature: "/api/users",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 2,
        Feature: "/api/users/{id}",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 3,
        Feature: "/api/roles",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 4,
        Feature: "/api/roles/{id}",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 5,
        Feature: "/api/roles/{id}/members",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 6,
        Feature: "/api/resources",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 7,
        Feature: "/api/resources/{id}",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 8,
        Feature: "/api/assignments",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 9,
        Feature: "/api/assignments/{id}",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 10,
        Feature: "/api/assignments",
        Operation: "POST",
        AccessRoleId: "ata"
    },
    {
        Id: 11,
        Feature: "/api/assignments/{id}",
        Operation: "PUT",
        AccessRoleId: "ata"
    },
    {
        Id: 12,
        Feature: "/api/assignments/{id}",
        Operation: "DELETE",
        AccessRoleId: "ata"
    },
    {
        Id: 13,
        Feature: "/api/resources",
        Operation: "GET",
        AccessRoleId: "aa"
    },
    {
        Id: 14,
        Feature: "/api/resources/{id}",
        Operation: "GET",
        AccessRoleId: "aa"
    },
    {
        Id: 15,
        Feature: "/api/resources",
        Operation: "POST",
        AccessRoleId: "aa"
    },
    {
        Id: 16,
        Feature: "/api/resources/{id}",
        Operation: "PUT",
        AccessRoleId: "aa"
    },
    {
        Id: 17,
        Feature: "/api/resources/{id}",
        Operation: "DELETE",
        AccessRoleId: "aa"
    },
    {
        Id: 18,
        Feature: "/api/orgunits",
        Operation: "GET",
        AccessRoleId: "aa"
    },
    {
        Id: 19,
        Feature: "/api/orgunits{id}",
        Operation: "GET",
        AccessRoleId: "aa"
    },
    {
        Id: 20,
        Feature: "/api/orgunits",
        Operation: "GET",
        AccessRoleId: "ata"
    },
    {
        Id: 21,
        Feature: "/api/orgunits{id}",
        Operation: "GET",
        AccessRoleId: "ata"
    }
];

export default initialData;
