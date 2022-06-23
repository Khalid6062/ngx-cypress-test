describe('verify the list and dropdown',()=>{

    it('lists and drop down',()=>{
        cy.visit('/')

        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
    })
})