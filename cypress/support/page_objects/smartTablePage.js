
export class SmartTable {

    updateAgeByFirstName(name, age) {
        cy.get('tbody').contains('tr', name).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })
    }

    addNewRecordWithFirstAndLastName(ID, firstName, lastName) {
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(addNewUser => {
            cy.wrap(addNewUser).find('[placeholder="ID"]').type(ID)
            cy.wrap(addNewUser).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(addNewUser).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(addNewUser).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(checkNewUser => {
            cy.wrap(checkNewUser).eq(2).should('have.text', firstName)
            cy.wrap(checkNewUser).eq(3).should('contain.text', lastName)
        })
    }

    deleteRowByIndex(index) {

        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect((stub.getCall(0))).to.be.calledWith('Are you sure you want to delete?')
        })
    }
}

export const onSmartTablePage = new SmartTable()