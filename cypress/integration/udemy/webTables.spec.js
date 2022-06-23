///<reference types="cypress"/>


it('web tables', () => {

    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })

    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(addNewUser => {
        cy.wrap(addNewUser).find('[placeholder="ID"]').type('2')
        cy.wrap(addNewUser).find('[placeholder="First Name"]').type('Khalid')
        cy.wrap(addNewUser).find('[placeholder="Last Name"]').type('khan')
        cy.wrap(addNewUser).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').first().find('td').then(checkNewUser => {
        cy.wrap(checkNewUser).eq(2).should('have.text', 'Khalid')
        cy.wrap(checkNewUser).eq(3).should('contain.text', 'khan')
    })

    const age = [20, 30, 40, 200]

    cy.wrap(age).each(age => {
        cy.get('thead [placeholder="Age"]').clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each(searchForUser => {
            if (age == 200) {
                cy.wrap(searchForUser).should('contain', 'No data found')
            } else {
                cy.wrap(searchForUser).find('td').should('contain', age)
            }

        })
    })

})