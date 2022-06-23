///<reference types="cypress"/>


describe('verify login functionality', () => {

    beforeEach(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/index.php/auth/validateCredentials")

    })

    it.only("verify login page", () => {

        //checks Url
        cy.url().should('include', 'demo.orangehrmlive')

        //checks orangeHRM title
        cy.title().should('eq', 'OrangeHRM')
        cy.get('#divLogin').find('#divLogo img').should('have.attr', 'src')

        //checks loginpanel
        cy.get('#divLoginForm').find('#logInPanelHeading').should('contain.text', 'LOGIN Panel')
        cy.get('[clip-path="url(#i)"]').find('image').should('have.attr', 'xlink:href')

        //cehcks username field
        cy.get('input[name="txtUsername"]')
            .type('Admin')
            .should('contain.text', 'Admin')

        //checks password field
        cy.get('input[name="txtPassword"]')
            .type('admin123')
            .should('contain.text', 'admin123')

        //checks login button
        cy.get('[type="submit"]')
            .should('have.class', 'button')
            .should('have.attr', 'type', 'submit')

        //checks username and password text
        cy.contains('span', '( Username : Admin | Password : admin123 )')

        //checks forgot link 
        cy.get('#forgotPasswordLink').should('contain.text', 'Forgot your password?')
        cy.get('#forgotPasswordLink a').should('have.attr', 'href')

        //checks footer
        cy.get('#footer').first().should('contain.text', 'OrangeHRM 4.10.1')
        cy.get('#footer').first().should('contain.text', '© 2005 - 2022 ')
        cy.get('#footer').first().should('contain.text', '. All rights reserved.')

        //checks social media icon
        cy.get('#footer a').should('have.attr', 'href')
        const linkedinPage = "http://www.linkedin.com/groups?home=&gid=891077"
        cy.get('#social-icons').find('a').eq(0).should('have.attr', 'href', linkedinPage)
        cy.get('#social-icons').find('img').eq(0).should('have.attr', 'src')
        const facebookPage = "http://www.facebook.com/OrangeHRM"
        cy.get('#social-icons').find('a').eq(1).should('have.attr', 'href', facebookPage)
        cy.get('#social-icons').find('img').eq(1).should('have.attr', 'src')
        const twitterPage = "http://twitter.com/orangehrm"
        cy.get('#social-icons').find('a').eq(2).should('have.attr', 'href', twitterPage)
        cy.get('#social-icons').find('img').eq(2).should('have.attr', 'src')
        const youtubeChannel = "http://www.youtube.com/orangehrm"
        cy.get('#social-icons').find('a').eq(3).should('have.attr', 'href', youtubeChannel)
        cy.get('#social-icons').find('img').eq(3).should('have.attr', 'src')

        //checks invalid username error message
        cy.get('input[name="txtUsername"]').type('user')
        cy.get('input[name="txtPassword"]').type('admin123')
        cy.get('[type="submit"]').click()
        cy.get('#spanMessage').should('contain.text', 'Invalid credentials')

        //checks invalid credentials error message
        cy.get('input[name="txtUsername"]').type('Admin')
        cy.get('input[name="txtPassword"]').type('test123')
        cy.get('[type="submit"]').click()
        cy.get('#spanMessage').should('contain.text', 'Invalid credentials')

        //checks invalid credentials error message
        cy.get('input[name="txtUsername"]').type('user')
        cy.get('input[name="txtPassword"]').type('admin13')
        cy.get('[type="submit"]').click()
        cy.get('#spanMessage').should('contain.text', 'Invalid credentials')

        //checks error message Username cannot be empty
        cy.get('[type="submit"]').click()
        cy.get('#spanMessage').should('contain.text', 'Username cannot be empty')

        //checks Password cannot be empty error message
        cy.get('input[name="txtUsername"]').type('Admin')
        cy.get('[type="submit"]').click()
        cy.get('#spanMessage').should('contain.text', 'Password cannot be empty')
    })
})



