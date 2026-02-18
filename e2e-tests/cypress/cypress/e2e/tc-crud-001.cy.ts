import { contains } from "../../node_modules/cypress/types/jquery/index"

describe('Create customer with valid data', () => {

  afterEach(() => {
    // Clean up and delete the created customer.
    cy.get('table tbody tr')
      .last()
      .find('td').contains('Delete').click()
  })

  it('creates a customer with valid data', () => {
    cy.visit('http://localhost/simple-crud-webapp/app/')
    const name = 'John Wayne'
    const location = 'Denver'
    cy.get('[name="name"]').type(name)
    cy.get('[name="location"]').type(location)
    cy.get('[name="save"]').click()

    // Expect success message
    cy.get('.alert').should("contain", "New customer has been saved.")
    // Expect customer to be displayed in table.
    cy.get('table tbody tr')
      .last()
      .find('td')
      .eq(0) // First column
      .should('contain', name)

    cy.get('table tbody tr')
      .last()
      .find('td')
      .eq(1) // Second column
      .should('contain', location)
  })
})