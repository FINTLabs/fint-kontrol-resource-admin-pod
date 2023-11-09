/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import { Method } from "cypress/types/net-stubbing"

declare global {
	namespace Cypress {
		interface Chainable {
			goToHome: typeof goToHome
			interceptAndReturnFile: typeof interceptAndReturnFile
		}
	}
}

export function interceptAndReturnFile(method: Method, url: string, fixturePath: string) {
	cy.intercept(method, url, {
		fixture: fixturePath
	}).as(fixturePath)
}
Cypress.Commands.add("interceptAndReturnFile", interceptAndReturnFile)

export function goToHome() {
	return cy.visit("http://localhost:3000/ressurser-admin")
}
Cypress.Commands.add("goToHome", goToHome)
