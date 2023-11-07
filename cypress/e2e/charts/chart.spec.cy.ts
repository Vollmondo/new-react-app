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
    cy.wait(10000);
  });

  it('should display the charts', () => {
    // ожидаем отрисовку графиков
    cy.wait(2000);
  
    cy.get('#TotalProductsChart').should('exist');
    cy.get('#AddedProductsChart').should('exist');
    cy.get('#CategoryCountsChart').should('exist');
    cy.get('#OrderChart').should('exist');
    cy.get('#OrderPieChart').should('exist');
  
    // ожидаем отображение графиков
    cy.get('#TotalProductsChart').should('be.visible');
    cy.get('#AddedProductsChart').should('be.visible');
    cy.get('#CategoryCountsChart').should('be.visible');
    cy.get('#OrderChart').should('be.visible');
    cy.get('#OrderPieChart').should('be.visible');
  });
});