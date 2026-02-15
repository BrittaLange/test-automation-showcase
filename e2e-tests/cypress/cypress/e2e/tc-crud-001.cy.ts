describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost/simple-crud-webapp/app/')
    const name = 'John Wayne'
    const location = 'Denver'
    cy.get('[name="name"]').type(name)
    cy.get('[name="location"]').type(location)
    cy.get('[name="save"]').click()
  })
})