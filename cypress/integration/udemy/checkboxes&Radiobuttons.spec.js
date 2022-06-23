describe('verify the checkbox and ratiobutton',()=>{

    it('radio button',()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons=>{
            cy.wrap(radioButtons[0]).check({force: true}).should('be.checked')

            cy.wrap(radioButtons).eq(1).check({force:true})

            cy.wrap(radioButtons).first().should('not.be.checked')

            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    })

    it.only('check boxes',()=>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force:true})
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(0).check({force:true})
    })
})