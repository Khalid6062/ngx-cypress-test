///<reference types="cypress"/>
/// <reference types="cypress-downloadfile"/>


it('check alert', () => {

    cy.visit("https://testautomationpractice.blogspot.com/")


    cy.get('[type="submit"]').click()
    cy.get('#HTML9 > div.widget-content > button').click()
    cy.on('window:confirm', (confirm) => {
        expect(confirm).to.equal('Press a button!')
    })




})

it('alert', () => {
    cy.visit("https://qaboxletstestcypresspracticesite.netlify.app/differentalerttypes.html")

    cy.get('#alert').click()
    cy.on('window:alert', (alert) => {
        expect(alert).to.equal("I'm an Alert Box")
    })

    // const stub = cy.stub()
    // cy.on('window:alert', stub)
    // cy.get('#miltiplealert').click().then(() => {
    //     expect((stub.getCall(0))).to.be.calledWithExactly("First Alert Box")
    //     expect((stub.getCall(1))).to.be.calledWithExactly("Second Alert Box")
    //     expect((stub.getCall(2))).to.be.calledWithExactly("Third Alert Box")


    // })




})

it('confirm-First way', () => {
    cy.visit("https://qaboxletstestcypresspracticesite.netlify.app/differentalerttypes.html")
    cy.get('#confirm').click()


    cy.on('window:confirm', confirmTxt => {
        expect(confirmTxt).to.eql("I'm a Confirm Box")
        return false
    })
})

it('confirm-First way', () => {
    cy.visit("https://qaboxletstestcypresspracticesite.netlify.app/differentalerttypes.html")
    cy.get('#confirm').click()

    const stub = cy.stub()
    stub.onFirstCall().returns(true)

    cy.on('window:confirm', stub)
    cy.get('#confirm').click().then(() => {
        expect((stub.getCall(0))).to.be.calledWithExactly("I'm a Confirm Box")
        return false
    })
})

it('prompt', () => {
    cy.visit("https://qaboxletstestcypresspracticesite.netlify.app/differentalerttypes.html")

    cy.get('#prompt').click()
    cy.window().then(win => {
        const stub = cy.stub(win, 'prompt')
        stub.returns('khalid')
        cy.get('#prompt').click()

    })

})

it('Modal Dialog from Hidden fields', () => {
    cy.visit("https://qaboxletstestcypresspracticesite.netlify.app/differentalerttypes.html")

    cy.get('#cusdiag').click()
    cy.get('input[placeholder="Enter username"]').type('username')
    cy.get('input[type="password"]').type('password')
    cy.contains('[type="button"]', 'Submit').click()
    cy.contains('fieldset', 'Outcome').should('contain', 'MODAL DIALOG FROM HIDDEN FIELDS - You submitted username and password')


})

it('Modal dialog box from function', () => {
    cy.visit("https://qaboxletstestcypresspracticesite.netlify.app/differentalerttypes.html")
    cy.get('#moddiag').click()
    // cy.contains('[type="button"]', 'Ok').click()
    cy.contains('[type="button"]', 'Close').click()


})

it('window pop up', () => {

    const pop_url = "https://www.youtube.com/c/qaboxletstest/"
    cy.window().then(win => {
        const stub = cy.stub(win, 'open').as('windowOpen')
    })
    cy.get('#winpop').click()
    cy.get('@windowOpen').should('be.calledWith', pop_url)
    cy.window().then(win => {
        win.location.href = pop_url
        cy.get('input#search').type('Cypress by qa box test{enter}')
    })
})

it('web datepicker', () => {

    cy.visit("https://testautomationpractice.blogspot.com/")
    cy.url().should('contain', 'testautomationpractice')

    let date = new Date()
    date.setDate(date.getDate() + 1)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleDateString('default', { month: 'short' })
    let dateAssert = futureDay + '/' + futureMonth + '/' + date.getFullYear()
    cy.contains('[class="ui-icon ui-icon-circle-triangle-e"]', 'Next').invoke('attr', '[data-handler="next"]').then(input => {
        if (!input.includes(date)) {
            cy.get('[data-handler="next"]').click()
        } else {

        }
    })

    cy.get('#datepicker').then(input => {
        cy.wrap(input).click()
        cy.get('[class="ui-datepicker-calendar"]').contains(20).click()
        cy.get('input#datepicker').invoke('prop', 'value').should('contain', '05/20/2022')

    })

})
it('codedamn', () => {

    cy.viewport(1280, 720)
    cy.visit('https://codedamn.com/')
    cy.contains('p', 'Why people love using codedamn?')
    cy.should('contain', 'Why people love using codedamn?')
    cy.get('div#noroot').should('not.exist')
    cy.get('[data-content="playgrounds"]').click()
    cy.get('h2[class="font-semibold"]').should('contain.text', 'Start a practice playground')
    cy.get('p[class="text-sm"]').should('contain.text', 'Practice anything inside browser without any download/setup')
    cy.get('[class="flex-1"]').contains('span', 'Node.js').click()
    cy.get('[placeholder="Enter Playground Title"]').clear().type('my-awesome-project')
    cy.get('label[for="title"]').should('contain.text', 'Playground Title')
    cy.get('button[data-testid="create-snippet-btn"]').click()
    cy.get('[placeholder="Enter your name"]').contains('div[class=px-6 pb-4 font-bold text-2xl text-gray-800]', 'Create Free Account')

})

describe('verify login functionality', () => {

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/")
        cy.url().should('include', 'sauce')
    })

    it("verify login page", () => {

        cy.title.should('eq', 'Swag Labs')
    })

})


describe('basic test', () => {
    it('Every basic element exists', () => {
        cy.visit('http://codedamn.com')
        cy.contains('Sign in').click()
        cy.contains('Sign in to').should('exist')
        cy.contains("Don't have an account?").should('exist')
        cy.contains("Remember me").should('exist')
        // cy.contains("Sign in with Google" ).should('exist')
        cy.get('.flex items-center justify-between').find('.text-sm a').contains("Forgot your password?").click()
        cy.url().should('include', '/password-reset')
        // cy.contains("Sign in with GitHub" ).should('exist')
    })
})

describe('upload the file', () => {

    it('Upload and assert the name of the file uploaded', () => {
        const yourFixturePath = 'IN1.png';
        cy.visit("https://the-internet.herokuapp.com/upload")
        cy.get('#file-upload').attachFile(yourFixturePath)
        cy.get('#file-submit').click()
        cy.get('#uploaded-files').contains('IN1.png')
    })
})

describe('swagLabs login page', () => {
    it('order lowest price product', () => {
        cy.visit("https://www.saucedemo.com/");

        cy.login('standard_user', 'secret_sauce')
        //selects the price (low to high) in the drop down menu
        cy.get('.product_sort_container').select('Price (low to high)')
        //clicks on the Add to cart button
        cy.get('.pricebar').contains('#add-to-cart-sauce-labs-onesie', 'Add to cart').click()
        //After clicking on Add to cart the item should be present in the cart icon element
        cy.get('.shopping_cart_link span').should('have.class', 'shopping_cart_badge').click()
        //Navigates to cart page where the products added to cart are present
        cy.url().should('include', 'cart.html')
        cy.get('.cart_item_label').find('.inventory_item_name').should('have.class', 'inventory_item_name').and('contain.text', 'Sauce Labs Onesie')
        //clicks on the checkout button to further the order placement process
        let Price
        cy.get('.inventory_item_price').then(lowestPrice => {
            Price = lowestPrice.text()
            console.log(Price)
            cy.wrap(lowestPrice).should('contain.text', Price)
        })
        cy.get('.cart_footer').find('#checkout').click()
        //types the firstName, lastName and postalCode 
        cy.get('[placeholder="First Name"]').type('firstName')
        cy.get('[placeholder="Last Name"]').type('lastName')
        cy.get('[placeholder="Zip/Postal Code"]').type('5000064')
        //clicks on continue button
        cy.get('.checkout_buttons input').click()
        //navigates to "checkout-step-two.html" page for the payment information
        cy.url().should('include', 'checkout-step-two.html')
        cy.get('.header_secondary_container').should('contain.text', 'Checkout: Overview')
        cy.get('.summary_info .summary_info_label').should('contain.text', 'Payment Information:')
        cy.get('.summary_subtotal_label').then(lowestPrice1 => {
            // const subtotal=lowestPrice1.text().trim
            // console.log(subtotal)
            cy.wrap(lowestPrice1).should('contain.text', 'Item total:' + Price)
        })
        //clicks on the finish button and navigates to "checkout-complete.html" page
        cy.get('.cart_footer #finish').click()
        cy.url().should('include', 'checkout-complete.html')
        cy.get('.header_secondary_container').should('contain.text', 'Checkout: Complete!')
        //As the order is placed cart icon element should not contain the product
        cy.get('.shopping_cart_link').should('not.have.class', 'shopping_cart_badge')
    })

    it('loginpage', () => {
        cy.visit("http://automationpractice.com/index.php")
        cy.get('.login').click()
        cy.get('#email').type('abcd@gmail.com')
        cy.get('#passwd').type('123456')
        cy.get('#SubmitLogin').click()
    })
})

describe('Api testing', () => {
    it('GET', 'Api GET method for heroku motobike', () => {
        cy.request("https://flask-rest-api-demo.herokuapp.com/product/motorbike").then(res => {
            expect(res.status).equal(200);
            expect(res.body.product[0]).has.property('price', 599.99)
            expect(res.body.product[0]).has.property('product', 'motorbike')
        })
    })
    it('GET', 'Api GET method for heroku users', () => {
        cy.request("https://flask-rest-api-demo.herokuapp.com/users").then(res => {
            expect(res.status).equal(200);
            expect(res.body.users[0]).has.property('username', 'test_1')
            expect(res.body.users[0]).has.property('password', 'qwert')
            expect(res.body.users[1]).has.property('id', 2)
            expect(res.body.users[1]).not.have.property('price')
            expect(res.body.users).has.length(5)
        })
    })

    it('GET', 'Api GET method for reqres', () => {
        cy.request("https://reqres.in/api/users?page=2").then(res => {
            expect(res.status).equal(200);
            expect(res.body.data[0]).has.property('first_name', 'Michael')
            expect(res.body.data[1]).has.property('email', 'lindsay.ferguson@reqres.in')
            expect(res.body.data[0]).has.property('last_name', 'Lawson')
            expect(res.body.data).has.length(6)
        })
    })
})

describe('Api testing with Aliases', () => {
    beforeEach(() => {
        cy.request("https://reqres.in/api/users?page=2").as('users')
    })

    it('verify the header info', () => {
        cy.get('@users')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('verify the status code', () => {
        cy.get('@users')
            .its('status')
            .should('equal', 200)
    })

    it('verify the total pages in body', () => {
        cy.get('@users')
            .its('body')
            .should('contains', { 'total_pages': 2 })
    })

    it('verify the user info in data json array', () => {
        cy.get('@users')
            .its('body').then(res => {
                expect(res.data[0]).has.property('first_name', 'Michael')
            })

    })
})

describe('Api testing with Aliases for heroku users', () => {
    beforeEach(() => {
        cy.request("https://flask-rest-api-demo.herokuapp.com/users").as('users')
    })

    it('verify the header info', () => {
        cy.get('@users')
            .its('headers')
            .its('Content-Type')
            .should('equal', 'application.json')
    })

    it('verify the status code', () => {
        cy.get('@users')
            .its('status')
            .should('equal', 200)
    })

    it('verify the total pages in body', () => {
        cy.get('@users').its('users').should('have.length', 5)

    })

    it('verify the user info in data json array', () => {
        cy.get('@users')
            .its('body').then(res => {
                expect(res.body.users[0]).has.property('username', 'test_1')
            })

    })
})


describe('Download Demo', ()=>{
 it('Download',()=>{
     cy.downloadFile('https://cdn.macmillanyounglearners.com/default-public/A-Z-Alphabet-Book-and-1-10.pdf','Download','A-Z-Alphabet-Book-and-1-10.pdf')
 })
})

describe('using within command',()=>{
    it('renders a section with the correct elements',()=>{
        cy.visit("https://www.lambdatest.com/cypress-testing")
        cy.get('.container__selenium').first().within(()=>{
            cy.get('h1').should('contain.text','Cypress Automation Testing Online')
            cy.get('p').should('contain.text','Execute & analyse Cypress test scripts online. Deploy quality builds faster with 40+ browser versions on cloud')
        })
    })
})

describe('Google test',()=>{
    beforeEach(()=>{
        cy.visit('https://www.google.com/')
    })

    it.only('Google-search',()=>{
        cy.googleSearch('salman khan')
        cy.get('input[title="Search"]').type('TechieQA').type('{enter}').wait(2000)
        cy.contains('TechieQA')
    })

    it.only('Google-search',()=>{
        cy.get('input[title="Search"]').type('moolya').type('{enter}').wait(2000)
        cy.contains('moolya')
    })
})
