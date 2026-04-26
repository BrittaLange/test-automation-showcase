describe('Display customers', () => {
    
    before('Empty table', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        cy.deleteAllEntries()
    })

    it('[tc-crud-005] shows customer list with existing records', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        // Create new customer to fill the customer list
        const name = 'Buster Keaton'
        const location = 'New York'
        cy.get('[name="name"]').type(name)
        cy.get('[name="location"]').type(location)
        cy.get('[name="save"]').click()
        // Expect customer to be displayed in table.
        cy.findLatestEntryAndCheckContent(name, location)
        // Clean up and delete the created customer.
        cy.findLatestEntryAndDeleteIt()
    })

    it('[tc-crud-007] shows empty customer list', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        cy.deleteAllEntries()
        cy.get('td').should('contain', 'No customers found.')
    })
})