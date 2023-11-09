import { wait } from "@testing-library/user-event/dist/utils"

// before(() => {
// 	const baseUrl = "http://localhost:3000/api"
// 	cy.interceptAndReturnFile("GET", `${baseUrl}/accessmanagement/v1/user`, "users.json")
// 	cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits`, "orgunits.json")
// 	cy.interceptAndReturnFile("GET", `${baseUrl}/accessmanagement/v1/accessrole`, "allAccessRoles.json")
// })

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

describe("Check resources-admin", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	it("can see navigation-tab", () => {
		cy.get("#navigation-bar-id").should("be.visible")
	})

	it("can click 'Tildel rettigheter'", () => {
		cy.get("#assign-role-tab-id").click()
		wait(1000)
	})

	it("Check toolbar", () => {
		cy.get("#toolbar-id").should("be.visible")
	})

	it("Pagination (change count, change page, new lists)", () => {
		cy.get("#pagination").should("be.visible")
	})

	it("Check tildel-rettigheter-table", () => {
		cy.get("#rettigheter-table-delegation").should("be.visible")
	})

	it("Can see the Lagre-button", () => {
		cy.get("#save-button-id").should("be.visible")
	})

	// })
	//
	// describe('Check that user can reach info-page', () => {
	//     beforeEach(() => {
	//         const baseUrl = "http://localhost:3000/api";
	//             cy.interceptAndReturnFile("GET", `${baseUrl}/resources`, "resources.json");
	//             cy.interceptAndReturnFile("GET", `${baseUrl}/resources/1`, "resources.json");
	//         }
	//     );
	//
	//     it('Click into a resource', () => {
	//         cy.get('#resource-0').click()
	//     });
	//
	//   it('Members tab (exits, title, table, search)', () => {
	//     // cy.goToHome();
	//     cy.get('#tableTitle').should('have.text','Members')
	//   });
	//
	//   it('Resrouces tab (exits, title, table, search)', () => {
	//     // cy.goToHome();
	//     cy.get('.MuiTabs-flexContainer > [tabindex="-1"]').should('have.text','Resources')
	//   });
})

describe("Test suite for 'Definer rolle'", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	it("can see navigation-tab", () => {
		cy.get("#navigation-bar-id").should("be.visible")
	})

	it("Click into a 'Definer rolle'", () => {
		cy.get("#define-role-tab-id").click()
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

describe("Test suite for 'Se brukere med roller'", () => {
	it("can render home page", () => {
		cy.goToHome()
		cy.wait(1000)
	})

	it("can see navigation-tab", () => {
		cy.get("#navigation-bar-id").should("be.visible")
	})

	it("Click into a 'Se brukere med roller'", () => {
		cy.get("#see-users-tab-id").click()
		wait(1000)
	})

	it("Can see a table with at least one example user", () => {
		cy.get("#users-table-id").should("be.visible")
		cy.get("#users-table-id td").contains("Petter Pettersen").should("exist")
	})
})
