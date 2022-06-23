
describe('Verify login page', () => {

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/");

    })

    it("check login page", () => {
        //checks whether url includes "saucedemo" and title Swaglabs
        cy.url().should('include', 'saucedemo')
        cy.title().should('eq', 'Swag Labs')

        //checks login logo 
        cy.get('.login_logo').should('have.css', 'text-align', 'center')

        //checks placeholder values of username, password, and value Login for login button.
        cy.get('#user-name').should('have.attr', 'placeholder', 'Username').and('have.css', 'color', 'rgb(72, 76, 85)')
        cy.get('#password').should('have.attr', 'placeholder', 'Password').and('have.css', 'color', 'rgb(72, 76, 85)')
        cy.get('#login-button').should('have.attr', 'value', 'Login')

        //checks for username text  on the page
        cy.get('#login_credentials').find('h4').should('contain.text', 'Accepted usernames are:')

        //checks for password text  on the page
        cy.get('.login_password').find('h4').should('contain.text', 'Password for all users')

    })

    let backpackImage
    it("try to login with valid username and valid password", () => {
        cy.login('standard_user', 'secret_sauce');//sould navigate to inventory page
        cy.url().should('include', 'inventory.html');
        backpackImage = '/static/media/sauce-backpack-1200x1500.34e7aa42.jpg'
        cy.get('.inventory_item_img > a >img').should('have.attr','src',backpackImage)
        cy.get('.pricebar').contains('#add-to-cart-sauce-labs-backpack', 'Add to cart').click()        
        //After clicking on Add to cart the item should be present in the cart icon element
        cy.get('.shopping_cart_badge').should('contain.text', 1)
        //removing the item from the cart
        cy.get('.pricebar').contains('#remove-sauce-labs-backpack','Remove').click()
        //After removing item from cart. Item should not be present in the cart icon
        cy.get('.shopping_cart_link').should('not.have.class','shopping_cart_badge')
        cy.get('#react-burger-menu-btn').should('contain.text', 'Open Menu')
        cy.logout();
        cy.get('.login_logo').should('have.class', 'login_logo')
    })

    it("try to login with locked_out_user with valid password", () => {
        cy.login('locked_out_user', 'secret_sauce');//sould navigate to inventory page
        cy.get('form').find('div').eq(2).as('errorMessage'); //aliasing error messgage box element 
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
        cy.get('@errorMessage').should('have.css', 'background-color', 'rgb(226, 35, 26)');
        cy.get('@errorMessage').find('button').click(); //error icon in error message field should be clickable.
        cy.get('@errorMessage').should('contain.text', ''); //error message element should be empty after closing.
    })

    it("try to login with problem_user with valid password", () => {
        cy.login('problem_user', 'secret_sauce');//sould navigate to inventory page
        cy.url().should('include', 'inventory.html');
        //backpackImage src is not same in this case so its a defect
        cy.get('.inventory_item_img > a >img').should('not.have.attr','src',backpackImage)
        cy.get('.pricebar').contains('#add-to-cart-sauce-labs-backpack', 'Add to cart').click()        
        //After clicking on Add to cart the item should be present in the cart icon element
        cy.get('.shopping_cart_badge').should('contain.text', 1)
        //removing the item from the cart
        cy.get('.pricebar').contains('#remove-sauce-labs-backpack','Remove').click()
        //After removing item from cart. Item should not be present in the cart icon
        //But its present that means its a defect
        cy.get('.shopping_cart_link').should('not.have.class','shopping_cart_badge')
        cy.get('#react-burger-menu-btn').should('contain.text', 'Open Menu')
        cy.logout();
        cy.get('.login_logo').should('have.class', 'login_logo')
    })

    it("try to login with performance_glitch_user with valid password", () => {
        cy.login('performance_glitch_user', 'secret_sauce');//sould navigate to inventory page
        cy.url().should('include', 'inventory.html');
        backpackImage = '/static/media/sauce-backpack-1200x1500.34e7aa42.jpg'
        cy.get('.inventory_item_img > a >img').should('have.attr','src',backpackImage)
        //clicks on add to cart button for backpack product
        cy.get('.pricebar').contains('#add-to-cart-sauce-labs-backpack', 'Add to cart').click()        
        //After clicking on Add to cart the item should be present in the cart icon element
        cy.get('.shopping_cart_badge').should('contain.text', 1)
        //removing the item from the cart
        cy.get('.pricebar').contains('#remove-sauce-labs-backpack','Remove').click()
        //After removing item from cart. Item should not be present in the cart icon
        cy.get('.shopping_cart_link').should('not.have.class','shopping_cart_badge')
        cy.get('#react-burger-menu-btn').should('contain.text', 'Open Menu')
        cy.logout();
        cy.get('.login_logo').should('have.class', 'login_logo')
    })

    it("try to login with invalid username and valid password", () => {
        cy.login('fake_user', 'secret_sauce')

        //username and password field should contain the entered username and password and turn red as error message
        cy.get('#user-name').should('have.attr', 'value', 'fake_user');
        cy.get('#user-name').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)');
        cy.get('#password').should('have.attr', 'value', 'secret_sauce');
        cy.get('#password').should('have.css', 'border-bottom-color', 'rgb(226, 35, 26)');
        //error message icon beside username and password
        cy.get('.form_group svg').first().should('have.attr', 'focusable', 'false')
        cy.get('.form_group svg').eq(1).should('have.attr', 'focusable', 'false')

        cy.get('form').find('div').eq(2).as('errorMessage'); //aliasing error messgage box element 
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    })

    it("try to login with valid username and invalid password", () => {
        cy.login('standard_user', 'wrong_sauce')
        cy.get('form').find('div').eq(2).as('errorMessage')
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Username and password do not match any user in this service')
        cy.get('@errorMessage').should('have.css', 'font-family', 'Roboto, Arial, Helvetica, sans-serif')
        cy.get('@errorMessage').find('button').click()
        cy.get('@errorMessage').should('contain.text', '')

        //placeholder value turns black after closing error icon
        cy.get('#user-name').should('have.attr', 'placeholder', 'Username').and('have.css', 'color', 'rgb(72, 76, 85)')
        cy.get('#password').should('have.attr', 'placeholder', 'Password').and('have.css', 'color', 'rgb(72, 76, 85)')

    })

    it("try to login with invalid username and invalid password", () => {
        cy.login('fake_user', 'wrong_sauce')
        cy.get('form').find('div').eq(2).as('errorMessage')
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Username and password do not match any user in this service')
        cy.get('@errorMessage').should('have.css', 'font-size', '14px')
    })

    it("try to login with blank username and valid password", () => {
        cy.emptyUsername('secret_sauce');
        cy.get('#user-name').should('have.attr', 'value', '')
        cy.get('form').find('div').eq(2).as('errorMessage')
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Username is required')
    })

    it("try to login with valid username and blank password", () => {
        cy.emptyPassword('standard_user');
        cy.get('#password').should('have.attr', 'value', '');
        cy.get('form').find('div').eq(2).as('errorMessage');
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Password is required');
    })

    it('try to login with blank username and blank password', () => {
        cy.get('#login-button').click()
        cy.get('#user-name').should('have.attr', 'value', '')
        cy.get('#password').should('have.attr', 'value', '');
        cy.get('form').find('div').eq(2).as('errorMessage')
        cy.get('@errorMessage').should('contain.text', 'Epic sadface: Username is required')
    })

    it('Item added to cart by one user should not be present in cart for another user who has not added it',()=>{
        cy.login('standard_user', 'secret_sauce')
        //clicks on add to cart button for backpack product
        cy.get('.pricebar').contains('#add-to-cart-sauce-labs-backpack', 'Add to cart').click()        
        //After clicking on Add to cart the item should be present in the cart icon element
        cy.get('.shopping_cart_badge').should('have.class', 'shopping_cart_badge').and('contain.text',1)
        cy.logout()
        //login with 'performance_glitch_user' with valid password 
        //To check if the product is also added to cart with this user
        cy.login('performance_glitch_user','secret_sauce');
        //no item has been ordered with 'performance_glitch_user' so nothing should be present in cart.
        //But the item is present so its a defect
        cy.get('.shopping_cart_link').should('not.have.class','shopping_cart_badge')
        cy.get('.pricebar').contains('#remove-sauce-labs-backpack','Remove').click()
        //After removing item from cart. Item should not be present in the cart icon
        cy.get('.shopping_cart_link').should('not.have.class','shopping_cart_badge')
        cy.logout()
        cy.login('standard_user', 'secret_sauce')
        //As the product is already added to cart in the previous login. Item should be present in the cart. 
        //But the order is not present so its a defect
        cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('check social links', () => {
        cy.login('standard_user', 'secret_sauce')

        //validates twitter social link
        cy.get('.social_twitter a').as('twitter')
        cy.get('@twitter').should('have.attr', 'href', 'https://twitter.com/saucelabs').and('contain.text', 'Twitter')
        cy.get('@twitter').invoke('removeAttr', 'target').click()
        cy.wait(5000)
        cy.get('[placeholder="Search Twitter"]').should('exist')
        cy.go('back')
        //validates facebook social link
        cy.get('.social_facebook a').as('facebook')
        cy.get('@facebook').should('have.attr', 'href', 'https://www.facebook.com/saucelabs').and('contain.text', 'Facebook')
        cy.get('@facebook').invoke('removeAttr', 'target').click()
        cy.wait(5000)
        cy.go('back')
        //validates linkedin social link
        cy.get('.social_linkedin a').as('linkedin')
        cy.get('@linkedin').should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/').and('contain.text', 'LinkedIn')
        cy.get('@linkedin').invoke('removeAttr', 'target').click()
        cy.contains('Join LinkedIn').should('exist')

    })

    it('validate static dropdown', () => {

        cy.login('standard_user', 'secret_sauce')
        //Name (A to Z) option should have value 'az' for a to z order
        cy.get('.product_sort_container').select('Name (A to Z)')
        cy.get('.product_sort_container').should('have.value', 'az')
        cy.get('.active_option').should('have.text', 'Name (A to Z)')
        //Name (A to Z) option should have value 'za' for z to a order
        cy.get('.product_sort_container').select('Name (Z to A)')
        cy.get('.product_sort_container').should('have.value', 'za')
        cy.get('.active_option').should('have.text', 'Name (Z to A)')
        //Price (high to low) option should have 'hilo' for descending order
        cy.get('.product_sort_container').select('Price (high to low)')
        cy.get('.product_sort_container').should('have.value', 'hilo')
        cy.get('.active_option').should('have.text', 'Price (high to low)')
        //Price (low to high) option should have 'lohi' for ascending order
        cy.get('.product_sort_container').select('Price (low to high)')
        cy.get('.product_sort_container').should('have.value', 'lohi')
        cy.get('.active_option').should('have.text', 'Price (low to high)')

    })
    it("ordering multiple products", function(){
        cy.login('standard_user', 'secret_sauce')
        //clicks on Add to cart button
        let ID ='#add-to-cart-sauce-labs-' 
        cy.get('.pricebar').contains(ID +'backpack', 'Add to cart').click()
        cy.get('.pricebar').contains(ID +'bike-light', 'Add to cart').click()
        cy.get('.pricebar').contains(ID +'bolt-t-shirt', 'Add to cart').click()
        cy.get('.pricebar').contains(ID +'fleece-jacket', 'Add to cart').click()
        //After clicking on Add to cart the item should be present in the cart icon element
        cy.get('.shopping_cart_badge').should('contain.text', 4).click()
        //Navigates to cart page where the products added to cart are present
        cy.url().should('include', 'cart.html')
        cy.get('.cart_item_label').find('.inventory_item_name').should(Items=>{
            expect(Items[0]).to.contain('Sauce Labs Backpack')
            expect(Items[1]).to.contain('Sauce Labs Bike Light')
            expect(Items[2]).to.contain('Sauce Labs Bolt T-Shirt')
            expect(Items[3]).to.contain('Sauce Labs Fleece Jacket')
        })
        //clicks on the checkout button to further the order placement process
        cy.get('.cart_footer').find('#checkout').click()
        //types the firstName, lastName and postalCode 
        cy.get('[placeholder="First Name"]').type('firstName')
        cy.get('[placeholder="Last Name"]').type('lastName')
        cy.get('[placeholder="Zip/Postal Code"]').type('5000064')
        //clicks on continue button
        cy.get('.checkout_buttons input').click()
        //navigates to "checkout-step-two.html" page for the payment information
        cy.get('.header_secondary_container').should('contain.text', 'Checkout: Overview')
        cy.get('.summary_info .summary_info_label').should('contain.text', 'Payment Information:')
        //clicks on the finish button and navigates to "checkout-complete.html" page
        cy.get('.cart_footer #finish').click()
        cy.url().should('include', 'checkout-complete.html')
        cy.get('.header_secondary_container').should('contain.text', 'Checkout: Complete!')
        //As the order is placed cart icon element should not contain the product
        cy.get('.shopping_cart_link').should('not.have.class', 'shopping_cart_badge')

    })

    it('order highest price product', function() {
        cy.login('standard_user', 'secret_sauce')
        //selects the price (high to low) in the drop down menu
        cy.get('.product_sort_container').select('Price (high to low)')
        //clicks on the Add to cart button
        cy.get('.pricebar').contains('#add-to-cart-sauce-labs-fleece-jacket', 'Add to cart').click()
        //After clicking on Add to cart the item should be present in the cart icon element
        cy.get('.shopping_cart_link span').click()
        //Navigates to cart page where the products added to cart are present
        cy.url().should('include', 'cart.html')
        cy.get('.cart_item_label').find('.inventory_item_name').should('have.class', 'inventory_item_name').and('contain.text', 'Sauce Labs Fleece Jacket')
        //clicks on the checkout button to further the order placement process
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
        //clicks on the finish button and navigates to "checkout-complete.html" page
        cy.get('.cart_footer #finish').click()
        cy.url().should('include', 'checkout-complete.html')
        cy.get('.header_secondary_container').should('contain.text', 'Checkout: Complete!')
        //As the order is placed cart icon element should not contain the product
        cy.get('.shopping_cart_link').should('not.have.class', 'shopping_cart_badge')
    })

    it('order lowest price product', () => {
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
        //clicks on the finish button and navigates to "checkout-complete.html" page
        cy.get('.cart_footer #finish').click()
        cy.url().should('include', 'checkout-complete.html')
        cy.get('.header_secondary_container').should('contain.text', 'Checkout: Complete!')
        //As the order is placed cart icon element should not contain the product
        cy.get('.shopping_cart_link').should('not.have.class', 'shopping_cart_badge')
    })
})