export class form{

    fillTheForm(firstName,lastName,email,phNumber,subjects,currentAddress,permanentAddress){
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('[for="gender-radio-1"]').click()
        cy.get('#userEmail').type(email)
        cy.get('#userNumber').type(phNumber)
        cy.get('#dateOfBirthInput').click()
        cy.get('#firstName').type(subjects)
        cy.get('#firstName').type(currentAddress)
        cy.get('#firstName').type(permanentAddress)
    }

}