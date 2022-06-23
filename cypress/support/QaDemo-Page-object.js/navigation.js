const elements = function(){
    cy.contains('Elements').click()
}

export class NavitionPage {

    textBox(){
        elements()
        cy.contains('Text Box').click() 
    }

    checkBox(){
        elements()
        cy.contains('Check Box').click()
    }

    radioButton(){
        elements()
        cy.contains('Radio Button').click()
    }

    webTables(){
        elements()
        cy.contains('Web Tables').click()
    }

    buttons(){
        elements()
        cy.contains('Buttons').click({force:true})
    }

    links(){
        elements()
        cy.contains('Links').click()
    }

    brokenLinks(){
        elements()
        cy.contains('Broken Links - Images').click({force:true})
    }

    uploadAndDownload(){
        elements()
        cy.contains('Upload and Download').click()
    }

    dynamicProperties(){
        elements()
        cy.contains('Dynamic Properties').click()
    }
}

export const navigateTo =new NavitionPage()