///<reference types="cypress" />

const { textChangeRangeNewSpan } = require("typescript")

// const { text } = require("stream/consumers")

describe('verify volunteer sign up', () => {
    beforeEach('test automation url', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.url().should('contain', 'testautomationpractice')
        cy.get('[class="titlewrapper"]').should('contain', 'Automation Testing Practice')
    })

    it('check signup with valid credentails', () => {
        cy.get('[class="column-center-outer"]').children('[id="q2"]')
    })

    it.only('web tables', () => {
        cy.get('tbody').parents('[name="BookTable"]').find('tr th').then(cellValidation => {
            cy.wrap(cellValidation).eq(0).should('contain.text', 'BookName')
            cy.wrap(cellValidation).eq(1).should('contain.text', 'Author')
            cy.wrap(cellValidation).eq(2).should('contain.text', 'Subject')
            cy.wrap(cellValidation).eq(3).should('contain.text', 'Price')
            cy.wrap(cellValidation).eq(1).should('have.css', 'font-family', 'arial, sans-serif')

            cy.get(cellValidation).should(($th) => {
                expect($th).to.have.length(4)
                expect($th).to.have.text('BookNameAuthorSubjectPrice')
                expect($th).to.have.css('color', 'rgb(0, 0, 0)')

            })

        })

        cy.get('tbody').parents('[name="BookTable"]').find('tr').contains('td', 'Learn Selenium').parents('tr').find('td').should(($row1) => {
            expect($row1).to.have.length(4)
            expect($row1).to.have.text('Learn SeleniumAmitSelenium300')
        })

        cy.get('tbody').parents('[name="BookTable"]').find('tr').contains('td', 'Learn Java').parents('tr').find('td').should(($row1) => {
            expect($row1).to.have.length(4)
            expect($row1).to.have.text('Learn JavaMukeshJava500')
        })

        cy.get('tbody').parents('[name="BookTable"]').find('tr').contains('td', 'Learn JS').parents('tr').find('td').should(($row1) => {
            expect($row1).to.have.length(4)
            expect($row1).to.have.text('Learn JSAnimeshJavascript300')
        })

        cy.get('tbody').parents('[name="BookTable"]').find('tr').contains('td', 'Master In Selenium').parents('tr').find('td').should(($row1) => {
            expect($row1).to.have.length(4)
            expect($row1).to.have.text('Master In SeleniumMukeshSelenium3000')
        })

        cy.get('tbody').parents('[name="BookTable"]').find('tr').contains('td', 'Master In Java').parents('tr').find('td').should(($row1) => {
            expect($row1).to.have.length(4)
            expect($row1).to.have.text('Master In JavaAmodJAVA2000')
        })

        cy.get('tbody').parents('[name="BookTable"]').find('tr').contains('td', 'Master In JS').parents('tr').find('td').should(($row1) => {
            expect($row1).to.have.length(4)
            expect($row1).to.have.text('Master In JSAmitJavascript1000')
        })





    })
})
