describe('Update customers', () => {

    before('Empty table', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        cy.deleteAllEntries()
    })

    it('[tc-crud-008] updates customer with valid data', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        // Create new customer to fill the customer list
        const name = 'Buster Keaton'
        const location = 'New York'
        const nameEdited = 'Johnny Wayne'
        const locationEdited = 'Boulder'
        cy.get('[name="name"]').type(name)
        cy.get('[name="location"]').type(location)
        cy.get('[name="save"]').click()
        
        // Edit the customer.
        cy.get('.btn-info').click()
        cy.get('[name="name"]').clear()
        cy.get('[name="name"]').type(nameEdited)
        cy.get('[name="location"]').clear()
        cy.get('[name="location"]').type(locationEdited)
        cy.get('[name="update"]').click()
        
        // Expect success message
        cy.get('.alert').should("contain", "Your changes have been saved.")
        // Expect to find edited customer in list.
        cy.findLatestEntryAndCheckContent(nameEdited, locationEdited)

        // Clean up and delete the created customer.
        cy.findLatestEntryAndDeleteIt()
    })

    it('[tc-crud-009] updates customer with empty name', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        // Create new customer to fill the customer list
        const name = 'John Wayne'
        const location = 'Denver'
        cy.get('[name="name"]').type(name)
        cy.get('[name="location"]').type(location)
        cy.get('[name="save"]').click()

        // Edit new customer.
        cy.get('.btn-info').click()
        cy.get('[name="name"]').clear()
        cy.get('[name="update"]').click()

        // Expect empty name not to be displayed in table.
        cy.getLatestEntry().then((entry) => {
            if (!entry) throw new Error('Expected latest entry to exist')
            expect(entry.name).not.to.be.empty
        })
    })

    it('[tc-crud-010] updates customer with empty location', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        const name = 'John Wayne'
        const location = 'Denver'
        cy.get('[name="name"]').type(name)
        cy.get('[name="location"]').type(location)
        cy.get('[name="save"]').click()

        // Edit new customer.
        cy.get('.btn-info').click()
        cy.get('[name="location"]').clear()
        cy.get('[name="update"]').click()

        // Expect empty location not to be displayed in table.
        cy.getLatestEntry().then((entry) => {
            if (!entry) throw new Error('Expected latest entry to exist')
            expect(entry.location).not.to.be.empty
        })
    })

    it('[tc-crud-011] cancels customer update', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        // Create new customer to fill the customer list
        const name = 'John Wayne'
        const location = 'Denver'
        const nameEdited = 'Clint Eastwood'
        const locationEdited = 'Colorado'
        cy.get('[name="name"]').type(name)
        cy.get('[name="location"]').type(location)
        cy.get('[name="save"]').click()

        // Edit new customer.
        cy.get('.btn-info').click()
        cy.get('[name="name"]').clear()
        cy.get('[name="name"]').type(nameEdited)
        cy.get('[name="location"]').clear()
        cy.get('[name="location"]').type(locationEdited)
        cy.get('[name="update"]').click()
        // Handle confirm dialog - click cancel.
        cy.once('window:confirm', (text) => {
            expect(text).to.contains('Are you sure you want to update?');
            return false; // simulates "Cancel"
        })

        // Expect customer not to be displayed in table.
        cy.getLatestEntry().then((entry) => {
            if (!entry) throw new Error('Expected latest entry to exist')
            expect(entry.name).to.not.be.equal(nameEdited)
            expect(entry.location).to.not.be.equal(locationEdited)
        })
    })

    after('Clean up and empty the table', () => {
        cy.visit('http://localhost/simple-crud-webapp/app/')
        cy.deleteAllEntries()
    })
})