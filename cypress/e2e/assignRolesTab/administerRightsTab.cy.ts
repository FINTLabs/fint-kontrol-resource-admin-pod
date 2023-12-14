import { wait } from "@testing-library/user-event/dist/utils"

beforeEach(() => {
	const baseUrl = "http://localhost:3000/api"
	cy.interceptAndReturnFile("GET", `${baseUrl}/accessmanagement/v1/user*`, "users.json")
	cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits`, "orgunits.json")
	cy.interceptAndReturnFile("GET", `${baseUrl}/accessmanagement/v1/accessrole`, "allAccessRoles.json")
	cy.interceptAndReturnFile(
		"GET",
		`${baseUrl}/accessmanagement/v1/accesspermission/accessrole/*`,
		"singleAccessRole.json"
	)
})

describe("Test suite for 'Se brukere med roller'", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	it("can see navigation-tab", () => {
		cy.get("#navigation-bar").should("be.visible")
	})

	it("Click into a 'Se brukere med roller'", () => {
		cy.get("#see-users-tab").click()
		wait(1000)
	})

	it("Can see a table with at least one example user", () => {
		cy.get("#users-table").should("be.visible")
		cy.get("#users-table td").contains("Petter Pettersen").should("exist")
	})
})
