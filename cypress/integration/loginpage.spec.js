

describe('Verify login page', () => {

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/")
    })

    it('check login with valid email and valid password', () => {

        //checks url includes "saucedemo" and title Swaglabs
        cy.url().should('include', 'saucedemo')
        cy.title().should('eq','Swag Labs')

        //checks login logo 
        cy.get('.login_logo').should(loginLogo=>{
            expect(loginLogo).to.have.css('text-align','center')
            expect(loginLogo).to.have.css('background','')
        })

        //checks placeholder values of username, password, and value Login for login button.
        cy.get('#user-name').should('have.attr','placeholder','Username').and('have.css','color','rgb(72, 76, 85)')
        cy.get('#password').should('have.attr','placeholder','Password').and('have.css','color','rgb(72, 76, 85)')
        cy.get('#login-button').should('have.attr','value','Login')

        //login with valid username and valid password
        cy.login('standard_user','secret_sauce' )
        cy.url().should('include', 'inventory.html');
        cy.logout();


        //login with invalid username and valid password
        ///checks for error message "Epic sadface: Username and password do not match any user in this service" 
        cy.login('standarduser', 'secret_sauce')
        cy.get('form').find('div').eq(2).as('errorMessage')
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Username and password do not match any user in this service')
        cy.get('@errorMessage').should('have.css','background-color','rgb(226, 35, 26)')
        cy.get('@errorMessage').find('button').click()
        cy.get('@errorMessage').should('contain.text','')

        cy.get('#login-button').click()
        cy.get('#user-name').should('have.attr','value','')
        cy.get('#password').should('have.attr','value','');

        cy.get('form').find('div').eq(2).as('errorMessage')
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Username is required')
        cy.get('@errorMessage').find('button').click()
        cy.get('@errorMessage').should('contain.text','')

        cy.login('standard_user', 'secretsauce')
        cy.get('#login_credentials').find('h4').as('userNames')
        cy.get('@userNames').should('contain.text','Accepted usernames are:')

    })

    it('new test',()=>{

        cy.get('#login-button').click()
        cy.get('form').find('div').eq(2).as('errorMessage')
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Username is required')
        cy.get('@errorMessage').should('have.css','background-color','rgb(226, 35, 26)')
        cy.get('@errorMessage').find('button').click()
        cy.get('@errorMessage').should('contain.text','')
    })
})