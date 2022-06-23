
describe('Amazon home page validaion',()=>{
    beforeEach(()=>{
        cy.visit("https://www.amazon.in/")
    })
    it('verify all tabs',()=>{
        cy.get('.hm-icon-label').click()
        cy.get('#hmenu-customer-name b').should('contain.text','Hello, Sign in')
        cy.get('#hmenu-canvas-background > .nav-sprite').click()
    })

    it.only('dynamic drop down',()=>{
        cy.get('#nav-search-dropdown-card')

        cy.get('#searchDropdownBox option').each(($el, index, $list) => {
            // $el is a wrapped jQuery element
            if ($el.text() === 'Alexa Skills') {
              // wrap this element so we can
              // use cypress commands on it
              cy.wrap($el).should('contain.text','Alexa Skills')
            } else {
              // do something else
            }
          })


    })
})