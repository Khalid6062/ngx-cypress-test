export class webTables {

    createANewRecord(firstname,lastname,email,age,salary,department){
        cy.get('#addNewRecordButton').click()
        cy.get('#firstName').type(firstname)
        cy.get('#lastName').type(lastname)
        cy.get('#userEmail').type(email)
        cy.get('#age').type(age)
        cy.get('#salary').type(salary)
        cy.get('#department').type(department)
        cy.get('#submit').click()
    }

    updateAgeByName(age){
        cy.get('.rt-tr-group').find('#edit-record-1').click()
        cy.get('#age').clear().type(age)
        cy.get('#submit').click()
        cy.get('#searchBox').type(age)
        cy.get('.rt-tr-group').eq(0).find('.rt-td').eq(2).should('contain.text',age)
        cy.get('#searchBox').clear()
    }

    deleteRecord(){
        cy.get('.rt-tr-group').contains('.rt-td','Cierra').should('have.text','Cierra')
        cy.get('#delete-record-1').click()
        cy.get('.rt-tr-group').find('.rt-td').first().should('not.have.text','Cierra')

    }
}

export const onWebTable = new webTables