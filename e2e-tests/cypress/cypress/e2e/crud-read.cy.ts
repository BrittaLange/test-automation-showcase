describe('Display customers', () => {

    it('[tc-crud-005] shows customer list with existing records', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        // Create new customer to fill the customer list
        const name = 'Buster Keaton'
        const location = 'New York'
        cy.get('[name="name"]').type(name)
        cy.get('[name="location"]').type(location)
        cy.get('[name="save"]').click()
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

    it('[tc-crud-007] shows empty customer list', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        cy.deleteAllEntries()
        cy.get('td').should('contain', 'No customers found.')
    })
})