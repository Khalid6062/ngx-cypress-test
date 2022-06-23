

function selectGroupMenuItem(groupName) {
    cy.contains('a', groupName).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if (attr.includes('left')) {
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavitionPage {

    formsLayoutPage() {
        selectGroupMenuItem('Form')
        cy.contains('Form Layouts').click()
    }

    datepickerPage() {
        selectGroupMenuItem('Form')
        cy.contains('Datepicker').click()
    }

    toasterPage() {
        selectGroupMenuItem('Form')
        cy.contains('Toastr').click()
    }

    smartTablepage() {
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipPage() {
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
}

export const navigateTo = new NavitionPage()