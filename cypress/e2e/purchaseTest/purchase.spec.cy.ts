describe('работоспособность функции пополнения кошелька', () => {
  
  it('проверяем корректность покупки', () => {
    // заходим в приложение под админом
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="username"]').first().type('123123', { force: true });
    cy.get('input[name="password"]').first().type('111111', { force: true });
    cy.get('button[id="loginbutton"]').first().click({ force: true });
    cy.wait(1000);
    cy.url().should('not.include', 'login');
    // переходим на страницу товара
    cy.visit('http://localhost:3000/cat/650044a404f1344086586df6');
    cy.wait(500);
    cy.get('#cartImgText').invoke('text').then((oldValue) => {
      cy.wait(500)
      console.log('oldValue:', oldValue)
    
      cy.get('.number-plus').first().click({ force: true });
      cy.wait(500)
      cy.get('#buyBtn').first().click({ force: true });
      cy.wait(500)
      
      cy.get('#cartImgText').invoke('text').then((newValue) => {
        cy.wait(500)
        console.log('newValue:', newValue)
    
        expect(Number(oldValue) + 2).to.equal(Number(newValue));
      });

    });
    cy.visit('http://localhost:3000/userProfile/cart')
    cy.get('#purchase-btn').first().click({ force: true });

  });
})
  