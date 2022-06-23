import { navigateTo } from "../../support/QaDemo-Page-object.js/navigation"

describe('testing a demo website',()=>{
    beforeEach("visits the home page",()=>{
        cy.visit('https://demoqa.com/')
        navigateTo.links()
    })

    it('verify the links',()=>{

        cy.get('#simpleLink').invoke('removeAttr','target').click()
        cy.url().should('contain','https://demoqa.com/')

        cy.go('back')
        cy.get('#dynamicLink').invoke('removeAttr','target').click()
        cy.url().should('contain','https://demoqa.com/')

    })

    it.only("verify the api's",()=>{

        cy.get('#created').click()

        cy.request({
            url : 'https://demoqa.com/created',
            method : 'GET'
        }).then(response=>{
            expect(response.status).to.eq(201)
            expect(response.statusText).to.eq('Created')
            expect(response.isOkStatusCode).to.be.true
            expect(response.body).to.be.empty
        })

        cy.get('#no-content').click()

        cy.request({
            url : 'https://demoqa.com/no-content',
            method : 'GET'
        }).then(response=>{
            expect(response.status).to.eq(204)
            expect(response.statusText).to.eq('No Content')
            expect(response.isOkStatusCode).to.be.true
            expect(response.body).to.be.empty
        })

        cy.get('#moved').click()

        cy.request({
            url : 'https://demoqa.com/moved',
            method : 'GET'
        }).then(response=>{
            expect(response.status).to.eq(301)
            expect(response.statusText).to.eq('Moved Permanently')
            expect(response.isOkStatusCode).to.be.true
            expect(response.body.url).to.eq("demoqa.com")
        })

        cy.get('#bad-request').click()

        cy.request({
            url : 'https://demoqa.com/bad-request',
            method : 'GET',
            failOnStatusCode: false,
        }).then(response=>{
            expect(response.status).to.eq(400)
            expect(response.statusText).to.eq('Bad Request')
            expect(response.isOkStatusCode).to.be.false
            expect(response.body).to.be.empty
        })

        cy.get('#unauthorized').click()

        cy.request({
            url : 'https://demoqa.com/unauthorized',
            method : 'GET',
            failOnStatusCode: false,
        }).then(response=>{
            expect(response.status).to.eq(401)
            expect(response.statusText).to.eq('Unauthorized')
            expect(response.isOkStatusCode).to.be.false
            expect(response.body).to.be.empty
        })


        cy.get('#forbidden').click()

        cy.request({
            url : 'https://demoqa.com/forbidden',
            method : 'GET',
            failOnStatusCode: false,
        }).then(response=>{
            expect(response.status).to.eq(403)
            cy.log(response)
            expect(response.statusText).to.eq('Forbidden')
            expect(response.isOkStatusCode).to.be.false
            expect(response.body).to.be.empty
        })

        cy.get('#invalid-url').click()

        cy.request({
            url : 'https://demoqa.com/invalid-url',
            method : 'GET',
            failOnStatusCode: false,
        }).then(response=>{
            expect(response.status).to.eq(404)
            cy.log(response)
            expect(response.statusText).to.eq('Not Found')
            expect(response.isOkStatusCode).to.be.false
            expect(response.body).to.be.empty
        })
    })

})