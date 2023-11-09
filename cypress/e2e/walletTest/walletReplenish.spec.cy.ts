describe('работоспособность функции пополнения кошелька', () => {
  beforeEach(() => {
    // заходим в приложение под админом
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="username"]').first().type('123123', { force: true });
    cy.get('input[name="password"]').first().type('111111', { force: true });
    cy.get('button[id="loginbutton"]').first().click({ force: true });
    cy.wait(1000);
    cy.url().should('not.include', 'login');
    // переходим на домашнюю страницу
    cy.visit('http://localhost:3000');
    cy.wait(1000);
  });

  it('проверяем работоспособность функции пополнения кошелька', () => {
    cy.get('#walletValue').invoke('text').then((oldValue) => {
      cy.wait(1000)
      console.log('oldValue:', oldValue)
    
      cy.get('.header-personal-block')
        .find('img[alt="wallet"]')
        .first()
        .click({ force: true });
      cy.wait(1000)

      cy.get('input[name="debet"]').first().type('5', { force: true });
      cy.get('.addCoins-btn').first().click({ force: true });
      cy.get('.modal-window').click({ force: true });
    
      cy.get('#walletValue').invoke('text').then((newValue) => {
        cy.wait(1000)
        console.log('newValue:', newValue)
    
        expect(Number(oldValue) + 5).to.equal(Number(newValue));
      });
    });
  });
})
  