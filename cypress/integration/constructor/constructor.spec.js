import '@4tw/cypress-drag-drop'
import { localURL } from "../../../src/utils/constants";


describe('drag ingredients to constructor works correctly', function() {
    beforeEach(function() {
        cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' })
        cy.intercept('POST', `api/auth/login`, { fixture: 'login.json' }).as('postLogin')
        cy.intercept('POST', `api/orders`, { fixture: 'post_order.json' }).as('postOrder')    
        cy.viewport(1300, 800);
        cy.visit(`${localURL}`);
    });

    it('should open ingredient modal', function() {
        cy.get(`#1`).click();
        cy.get('#title').contains('Детали ингредиента').should('exist');
        cy.get('#ingredientName').contains('Булка 1').should('exist');        
        cy.get('#closeModal').trigger('click');
    });

    it('should create order', function()  {
        cy.visit(`${localURL}/login`);
        cy.get('form input[type=email]').type('test@yandex.ru'); 
        cy.get('form input[type=password]').type('123456'); 
        cy.get('form button').click();        
        cy.wait('@postLogin').its('request.body').should('deep.equal', {
            email: 'test@yandex.ru',
            password: '123456'
        });

        cy.wait(1000);

        cy.get('#constructorList').contains('#1').should('not.exist');
        cy.get(`#1`).trigger('dragstart');
        cy.get('#constructorList').trigger('drop');
        cy.get('#constructorList').contains('Булка 1').should('exist');
        cy.get('#constructorList').contains('#2').should('not.exist');
        cy.get(`#2`).trigger('dragstart');
        cy.get('#constructorList').trigger('drop');
        cy.get('#constructorList').contains('Начинка 1').should('exist');

        cy.wait(1000);

        cy.get('button').click();
        cy.wait('@postOrder').its('request.body').should('deep.equal', {
            ingredients: ['2', '1', '1']
        })

        cy.get('#orderNumber').contains('123456').should('exist');
        cy.get('#title').contains('идентификатор заказа').should('exist');

        cy.get('#closeModal').trigger('click');
    })    
});