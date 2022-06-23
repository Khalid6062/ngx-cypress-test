const { onDatepickerPage } = require("../../support/page_objects/datePicker")
const { navigateTo } = require("../../support/page_objects/navigationPage")
const { onFormLayoutsPage } = require("../../support/page_objects/pageLayoutsPage")
const { onSmartTablePage } = require("../../support/page_objects/smartTablePage")

describe('Test with page objects', () => {

    beforeEach('open application', () => {
        cy.openHomePage()
    })

    it('verify navigations across the pages', () => {
        navigateTo.formsLayoutPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablepage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()
    })

    it.only('should submit Inline and Basic form and select tomorrow datein the calender', () => {
        navigateTo.formsLayoutPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
        navigateTo.datepickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatepickerWithRangeFromToday(10, 26)
        navigateTo.smartTablepage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('2', 'Artem', 'Bondar')
        onSmartTablePage.updateAgeByFirstName('Artem', '35')
        onSmartTablePage.deleteRowByIndex(1)
    })

})


