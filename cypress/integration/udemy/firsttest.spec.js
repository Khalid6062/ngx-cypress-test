/// <reference types="cypress"/>

// const { Button } = require("bootstrap")

describe('my first test suite', () => {
    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#exampleInputEmail1')

        //by Class Name
        cy.get('.input-full-width')

        //by Attribute Name
        cy.get('[placeholder]')

        //by attribute name and value
        cy.get('[placeholder="Email"]')

        //by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tagname and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attribute name
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"].input-full-width#exampleInputEmail1')

        //The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')



    })

    it('second test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]');

        cy.contains('Sign in')

        cy.contains('[status="warning"]', 'Sign in')

        cy.get('#inputEmail3').parents('form').find('button').should('contains', 'Sign in').parents('form').find('nb-checkbox').click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

    })

    it('then and wrap methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLableFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLableFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordSecondText = secondForm.find('[for="inputPassword2"]').text()
                expect(passwordLabelFirst).to.equal(passwordSecondText)

                cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain', 'Password')
            })
        })

    })

    it('Invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')

        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click().find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked')
            .then(classvalue => {
                expect(classvalue).to.contain('checked')
            })







    })


    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calender-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'May 11, 2022')
        })

    })

    it.only('lists and dropdowns', () => {
        cy.visit('/')

        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nd-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index < 3) {
                    cy.wrap(dropdown).click()

                }

            })
        })
    })
})
