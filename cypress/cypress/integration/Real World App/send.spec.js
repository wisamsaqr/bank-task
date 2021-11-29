/// <reference types="cypress" />

describe("Testing sending operation", ()=>
{
    let username = 'sender'
    let password = '0000'
    let firstName = 'Wisam'
    let lastName = 'Saqr'
    
    let corrUsername = 'receiver'


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

    context('Money Transfer', ()=>
    {
        it('Verify clicking new button', ()=>
        {
            // click new button
            cy.get('[data-test=nav-top-new-transaction]').click()

            // Select Contact pane must appear
            cy.url().should('include', '/transaction/new')
        })

        it('Verify searching for user', ()=>
        {
            // type receiver username
            cy.get('[data-test=user-list-search-input]').type(corrUsername)
                .should('have.value', corrUsername)
            
            ////////////////////////////////////////////////////
            /////////// Problem: no users appear////////////////
            ////////////////////////////////////////////////////


            cy.get('ul[data-test=users-list] > li').should('have.length.greaterThan', 0)
            // cy.get('ul[data-test=users-list]>li').should('exist')
            
            cy.get('ul[data-test=users-list] > li').contains('U: ' + corrUsername).click()
            

            // Payment pane must appear
            // cy.get('.MuiBox-root > .MuiGrid-container > :nth-child(2) > .MuiTypography-root')
            cy.get('.MuiBox-root > .MuiGrid-container > .MuiGrid-root > h2.MuiTypography-root').should('be.visible')
            
            cy.get('.MuiBox-root > .MuiGrid-container > .MuiGrid-root > h2.MuiTypography-root')
                .should('have.text', firstName + ' ' + lastName)
        })

        it('Verify filling payment data', ()=>
        {
            let amount = '100'

            // type amount
            cy.get('#amount').type(amount).should('have.value', amount)
            
            // type note
            cy.get('#transaction-create-description-input')
                .type(amount + ' dollar has been sent.')
                .should('have.value', amount + ' dollar has been sent.')
            
                // click request button
                cy.get('[data-test=transaction-create-submit-request]').click()

                // Complete pane 
                cy.get('.MuiBox-root-80 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
                    .should('be.visible')
        })

        it('Verify new user logout', ()=>
        {
            // cy.logout()
        })
    })
})