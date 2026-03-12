describe('Create customer', () => {

  before('Table shall not be empty', () => {
    cy.visit('http://localhost/simple-crud-webapp/app/')
    const name = 'Collin Farrell'
    const location = 'Denver'
    cy.get('[name="name"]').type(name)
    cy.get('[name="location"]').type(location)
    cy.get('[name="save"]').click()
  })

  it('[tc-crud-001] creates a customer with valid data', () => {
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

    // Clean up and delete the created customer.
    cy.get('table tbody tr')
      .last()
      .find('td').contains('Delete').click()
  })

  it('[tc-crud-002] creates customer with empty name', () => {
    cy.visit('http://localhost/simple-crud-webapp/app/')
    const location = 'Denver'
    const validationErrorMsg = 'Name is required.'
    cy.get('[name="name"]').clear()
    cy.get('[name="location"]').type(location)
    cy.get('[name="save"]').click()
    // Expect validation error to be displayed.
    cy.get('#nameRequired').should('contain', validationErrorMsg)
    // Expect customer not to be displayed in table.
    cy.get('table tbody tr')
      .last()
      .find('td')
      .eq(0) // First column
      .should('not.be.empty')
  })

  it('[tc-crud-003] creates customer with empty location', () => {
    cy.visit('http://localhost/simple-crud-webapp/app/')
    const name = 'John Wayne'
    const validationErrorMsg = 'Location is required.'
    cy.get('[name="name"]').type(name)
    cy.get('[name="location"]').clear()
    cy.get('[name="save"]').click()
    // Expect validation error to be displayed.
    cy.get('#locationRequired').should('contain', validationErrorMsg)
    // Expect customer not to be displayed in table.
    cy.get('table tbody tr')
      .last()
      .find('td')
      .eq(1) // Second column
      .should('not.be.empty')
  })

  it('[tc-crud-004] creates customer with name exceeding max length', () => {
    cy.visit('http://localhost/simple-crud-webapp/app/')
    const name = 'Dieser Satz ist genau 121 Zeichen lang, einschließlich Leerzeichen, Worte und Satzzeichen, um die Behauptung zu beweisen.'
    const location = 'Denver'
    const validationErrorMsg = 'The name should not be longer than 120 characters.'
    cy.get('[name="name"]').type(name)
    cy.get('[name="location"]').type(location)
    cy.get('[name="save"]').click()
    // Expect validation error to be displayed.
    cy.get('#nameRequired').should('contain', validationErrorMsg)
    // Expect customer name not to be displayed in table.
    cy.get('table tbody tr')
      .last()
      .find('td')
      .eq(0) // First column
      .should('not.contain', validationErrorMsg)
  })

    it('[tc-crud-015] creates customer with location exceeding max length', () => {
    cy.visit('http://localhost/simple-crud-webapp/app/')
    const name = 'John Wayne'
    const location = 'Dieser Satz ist genau 121 Zeichen lang, einschließlich Leerzeichen, Worte und Satzzeichen, um die Behauptung zu beweisen.'
    const validationErrorMsg = 'The location should not be longer than 120 characters.'
    cy.get('[name="name"]').type(name)
    cy.get('[name="location"]').type(location)
    cy.get('[name="save"]').click()
    // Expect validation error to be displayed.
    cy.get('#locationRequired').should('contain', validationErrorMsg)
    // Expect customer location not to be displayed in table.
    cy.get('table tbody tr')
      .last()
      .find('td')
      .eq(1) // Second column
      .should('not.contain', validationErrorMsg)
  })
})