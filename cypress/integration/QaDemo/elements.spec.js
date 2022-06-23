///<reference types="cypress"/>

import { onWebTable } from "../../support/QaDemo-Page-object.js/elements.objects"
import { navigateTo } from "../../support/QaDemo-Page-object.js/navigation"

describe('testing a demo website',()=>{
    beforeEach("visits the home page",()=>{
        cy.visit('https://demoqa.com/')
    })

    it('verify navigations across pages',()=>{
        navigateTo.textBox()
        navigateTo.checkBox()
        navigateTo.buttons()
        navigateTo.links()
        navigateTo.brokenLinks()
        navigateTo.radioButton()
        navigateTo.webTables()
        navigateTo.uploadAndDownload()
        navigateTo.dynamicProperties()
    })

    it('verify the text box elements',()=>{
        navigateTo.textBox()
        cy.fillTextBox('full name','fullname123@gmail.com','House number + Street name Town/City County Postcode','House number + Street name Town/City County Postcode')

        cy.get('#output p').invoke('text').then(output=>{
            cy.wrap(output).should('contain','full name')

        })
    })

    it('verify the check box elements',()=>{
        navigateTo.checkBox()

        cy.get('.rct-checkbox>svg').click().as('checkBox')
        cy.get('@checkBox').invoke('attr','class').should('contain','check')

        cy.get('.rct-checkbox>svg').click().as('checkBox')
        cy.get('@checkBox').invoke('attr','class').should('contain','uncheck')
    })

    it('verify the check box elements',()=>{
        navigateTo.radioButton()


        cy.get('.custom-control-label').then(radioBtton=>{
            cy.wrap(radioBtton).each((index) => {
                cy.get(index).click()
                cy.get('.mt-3 .text-success').invoke('text').then(text=>{
                    expect(text).to.eq(text)
                })
            })
        })

    })

    it('verify the web tables',()=>{
        navigateTo.webTables()

        onWebTable.createANewRecord('david','miller','david@gmail.com','29','120000','criket')

        cy.get('.rt-tr-group').eq(3).find('.rt-td').then(row=>{
            cy.wrap(row).each((index)=>{
                cy.get(index).invoke('text').then(text=>{
                    expect(text).to.eq(text)
                })
            })
        })

        onWebTable.updateAgeByName(59)

        onWebTable.deleteRecord()


    })

    it('verify the buttons',()=>{
        navigateTo.buttons()
        //verify double click
        cy.get('#doubleClickBtn').dblclick()
        cy.get('#doubleClickMessage').should('have.text','You have done a double click')

        //verify right click
        cy.get('#rightClickBtn').rightclick()
        cy.get('#rightClickMessage').should('have.text','You have done a right click')

        //verify dynamic click

        cy.get('[type="button"]').eq(3).click()
        cy.get('#dynamicClickMessage').should('have.text','You have done a dynamic click')
    })

    it('verify the broken links',()=>{
        navigateTo.brokenLinks()
        
        cy.get('img').eq(2).then(image=>{
            expect(image).to.be.visible
            expect(image[0].naturalWidth).to.be.greaterThan(0);
            expect(image[0].naturalHeight).to.be.greaterThan(0);
        })

        cy.get('img').eq(3).then(image=>{
            expect(image).not.be.visible
            expect(image[0].naturalWidth).to.be.equal(0);
            expect(image[0].naturalHeight).to.be.equal(0);
        })

        cy.contains('Click Here for Valid Link').click()
        cy.url().should('contain','https://demoqa.com/')
        cy.go('back')

        cy.contains('Click Here for Broken Link').click()
        cy.url().should('contain','http://the-internet.herokuapp.com/status_codes/500')
        cy.get('.example').should('contain.text','This page returned a 500 status code')
    })

    it('downlaod file in mentioned dir', () => {
        navigateTo.uploadAndDownload()

        const filePath = 'sampleFile.jpeg'
        cy.get('#uploadFile').attachFile(filePath)
        cy.get('#uploadedFilePath').should('contain','C:\\fakepath\\sampleFile.jpeg')

        cy.downloadFile('','download','sampleFile.jpeg')
        cy.readFile("./download/sampleFile.jpeg")
        
    })

    it('dynamic properties',()=>{

        navigateTo.dynamicProperties()
        cy.get('#colorChange').should('have.css','color','rgb(255, 255, 255)')
        cy.wait(5000)
        cy.get('#colorChange').should('have.css','color','rgb(220, 53, 69)')
    })

    it.only('verify the form',()=>{
        
    })

})