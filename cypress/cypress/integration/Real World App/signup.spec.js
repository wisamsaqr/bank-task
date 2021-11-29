/// <reference types="cypress" />

describe("Testing signup", ()=>
{
    before('Visisting login page', ()=>
    {
        cy.visit("http://localhost:3000/signin")
        cy.url().should('include', '/signin')
    })

    it('Verify clicking on "Dont have an account? Sign Up" link', ()=>
    {
        cy.get('[data-test=signup]').click()
        cy.url().should('include', '/signup')
    })

    context('Signup', ()=>
    {
        let username = 'sami'
        let password = '0000'
        let firstName = 'Sami'
        let lastName = 'Saqr'
        
        it('Verify filling text inputs', ()=>
        {
            // bug: signup button should be disabled
            cy.get('[data-test=signup-title]').click()
            /////////////////


            // signup button should be disabled
            cy.get('[data-test=signup-submit]').should('be.disabled')
            cy.get('#firstName').type(firstName).should('have.value', firstName)

            cy.get('[data-test=signup-submit]').should('be.disabled')
            cy.get('#lastName').type(lastName).should('have.value', lastName)
            
            cy.get('[data-test=signup-submit]').should('be.disabled')
            cy.get('#username').type(username).should('have.value', username)
            
            cy.get('[data-test=signup-submit]').should('be.disabled')
            cy.get('#password').type(password).should('have.value', password)
            
            cy.get('[data-test=signup-submit]').should('be.disabled')
            cy.get('#confirmPassword').type(password).should('have.value', password)
        })

        it('Verify clicking on "Sign Up" button', ()=>
        {
            cy.get('[data-test=signup-submit]').should('not.be.disabled')
            cy.get('[data-test=signup-submit]').click()
            cy.url().should('include', '/signin')
        })

        it('Verify new user login', ()=>
        {
            // bug: signin button should be disabled
            cy.get('.MuiTypography-h5').click()
            /////////////////

            cy.login(username, password, firstName, lastName)
        })

        it('Verify creating bank accoutn', ()=>
        {
            // creating bank accoutn
            cy.get('[data-test=user-onboarding-dialog-title] > .MuiTypography-root').should('be.visible')
            cy.get('[data-test=user-onboarding-next]').click()

            // bug: save button should be disabled
            cy.get('#bankaccount-bankName-input').focus()
            cy.get('[data-test=user-onboarding-dialog-title] > .MuiTypography-root').click()
            /////////////////

            let bankName = 'Test Bank'
            let routingNumber = '888888888'
            let accountNumber = '999999999'

            cy.get('[data-test=bankaccount-submit]').should('be.disabled')
            cy.get('#bankaccount-bankName-input').type(bankName).should('have.value', bankName)
            
            cy.get('[data-test=bankaccount-submit]').should('be.disabled')
            cy.get('#bankaccount-routingNumber-input').type(routingNumber).should('have.value', routingNumber)
            
            cy.get('[data-test=bankaccount-submit]').should('be.disabled')
            cy.get('#bankaccount-accountNumber-input').type(accountNumber).should('have.value', accountNumber)

            cy.get('[data-test=bankaccount-submit]').should('not.be.disabled')
            cy.get('[data-test=bankaccount-submit]').click()

            cy.get('[data-test=user-onboarding-next]').click()
            cy.get('[data-test=user-onboarding-dialog-title]').should('not.exist')

            // authenticated user
            cy.get('[data-test=sidenav-user-full-name]').should('have.text', firstName + ' ' +lastName.substr(0, 1))
            cy.get('[data-test=sidenav-username]').should('have.text', '@' + username)
        })

        it('Verify new user logout', ()=>
        {
            cy.logout()
        })
    })
})