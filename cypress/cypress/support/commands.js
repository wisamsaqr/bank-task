Cypress.Commands.add('login', (username, password, firstName, lastName)=>
{
    cy.get('[data-test=signin-submit]').should('be.disabled')
    cy.get('#username').type(username).should('have.value', username)

    cy.get('[data-test=signin-submit]').should('be.disabled')
    cy.get('#password').type(password).should('have.value', password)

    cy.get('[data-test=signin-submit]').should('not.be.disabled')
    cy.get('[data-test=signin-submit]').click()

    // Assertions
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('[data-test=sidenav-user-full-name]').should('have.text', firstName + ' ' + lastName.substr(0, 1))
    cy.get('[data-test=sidenav-username]').should('have.text', '@' + username)
})

Cypress.Commands.add('logout', ()=>
{
    cy.get('[data-test=sidenav-signout] > .MuiListItemText-root > .MuiTypography-root').click()
    cy.url().should('include', '/signin')
})