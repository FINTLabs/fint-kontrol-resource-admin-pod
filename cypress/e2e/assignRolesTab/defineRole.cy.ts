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

describe("Test suite for 'Definer rolle'", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	it("can see navigation-tab", () => {
		cy.get("#navigation-bar").should("be.visible")
	})

	it("Click into a 'Definer rolle'", () => {
		cy.get("#define-role-tab").click()
		wait(1000)
	})

	it("Can see Select and option of roles", () => {
		cy.get("select").should("be.visible")
		cy.get("select")
			.find("option")
			.each((option) => {
				cy.log(`Option Text: ${option.text()}`)
			})
		cy.get("select").select("accessRole1")
		wait(1000)
	})

	it("Can see table of features from the selected access role", () => {
		cy.get("#permissions-table td").contains("featureName1").should("exist")
	})
})
