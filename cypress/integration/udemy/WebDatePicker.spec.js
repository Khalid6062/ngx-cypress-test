///<reference types ="cypress"/>

describe('web datepicker', () => {
    it('First test', () => {

        function selectDateFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDate = date.getDate()
            let futureMonth = date.toLocaleDateString('default', { month: 'short' })
            let dateAssert = futureMonth + ' ' + futureDate + ', ' + date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {

                if (!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDateFromCurrent(day)
                } else {
                    cy.get('nb-calendar-picker-row [class="day-cell ng-star-inserted"]').contains(futureDate).click()

                }

            })
            return dateAssert
        }
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()




        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDateFromCurrent(300)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    })
})
