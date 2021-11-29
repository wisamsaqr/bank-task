/// <reference types="cypress" />

describe("Testing sending operation", ()=>
{
    let username = 'receiver'
    let password = '0000'
    let firstName = 'Alma'
    let lastName = 'Saqr'
    
    let corrUsername = 'sender'
    let corrFirstName = 'Wisam'
    let corrLastName = 'Saqr'


    before('Visisting login page', ()=>
    {
        cy.visit("http://localhost:3000/signin")
        cy.url().should('include', '/signin')
    })

    it('Verify user login', ()=>
    {
        // bug
        cy.get('.MuiTypography-h5').click()
        /////////////////

        cy.login(username, password, firstName, lastName)
    })

    context('Money Receiving', ()=>
    {
        it('Verify received notification', ()=>
        {
            // new notification should be shown
            // go to notifications page
            cy.get('[data-test=nav-top-notifications-link]').click()
            
            // notifications screen
            cy.url().should('include', '/notifications')


            cy.get('[data-test^=notification-list-item] > .MuiListItemText-root > .MuiTypography-root')
                .should('be.visible')
                .should('have.text', corrFirstName + ' ' + corrLastName + ' requested payment.')


            // go to homepage
            cy.get('[data-test=sidenav-home] > .MuiListItemText-root > .MuiTypography-root').click()
            cy.url().should('eq', 'http://localhost:3000/')
        })

        it('Verify accepting money', ()=>
        {
            // go to MINE page
            cy.get('[data-test=nav-personal-tab] > .MuiTab-wrapper').click()
            cy.url().should('include', '/personal')

            // assert that there is a transaction
            cy.get('div[data-test=transaction-list] > div > div > div > li').should('have.length.greaterThan', 0)
  
            // go to transaction
            cy.get('div[data-test=transaction-list] > div > div > div > li[data-test^=transaction-item]')
                .contains(corrFirstName + ' ' + corrLastName + ' requested ' + firstName + ' ' + lastName)
                .click()
            
            // assert navigation to transaction
            cy.url().should('include', '/transaction')

            // click accept button
            cy.get('[data-test^=transaction-accept-request] > .MuiButton-label').click()


            // assert showing 
            cy.get('div.MuiGrid-root > p.MuiTypography-colorTextSecondary > span[data-test^=transaction-sender]')
                .should('have.text', corrFirstName + ' ' + corrLastName)

            cy.get('div.MuiGrid-root > p.MuiTypography-colorTextSecondary > span[data-test^=transaction-action]')
                .should('have.text', ' charged ')

            cy.get('div.MuiGrid-root > p.MuiTypography-colorTextSecondary > span[data-test^=transaction-receiver]')
                .should('have.text', firstName + ' ' + lastName)
            
            
            // click like button
            cy.get('[data-test^=transaction-like-button]').click()

            // write a comment
            cy.get('[data-test^=transaction-comment-input]').type('Thank you.').should('have.value', 'Thank you.')
                .type('{enter}')
        })

        it('Verify new user logout', ()=>
        {
            // cy.logout()
        })
    })
})