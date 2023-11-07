describe('AdminMainPage', () => {
  beforeEach(() => {
    // заходим в приложение под админом
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="username"]').first().type('123123', { force: true });
    cy.get('input[name="password"]').first().type('111111', { force: true });
    cy.get('button[id="loginbutton"]').first().click({ force: true });
    cy.wait(2000);
    cy.url().should('not.include', 'login');
    // переходим в админпанель
    cy.visit('http://localhost:3000/admin');
  });

  it('should display the charts', () => {
    // ожидаем появление графиков в DOM
    cy.get('.total-products-chart').should('exist');
    cy.get('.added-products-chart').should('exist');
    cy.get('.category-counts-chart').should('exist');
    cy.get('.order-chart').should('exist');
    cy.get('.order-pie-chart').should('exist');  
    // ожидаем отображение графиков
    cy.wait(10000);
    cy.get('.total-products-chart').should('be.visible');
    cy.get('.added-products-chart').should('be.visible');
    cy.get('.category-counts-chart').should('be.visible');
    cy.get('.order-chart').should('be.visible');
    cy.get('.order-pie-chart').should('be.visible');
  });
});