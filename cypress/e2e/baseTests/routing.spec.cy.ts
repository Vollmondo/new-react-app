const home = 'http://localhost:3000'

describe('Маршрутизация', () => {
    beforeEach(() => {
      cy.visit(home);
      cy.visit('http://localhost:3000/login');
        cy.get('input[name="username"]').first().type('123123', { force: true });
        cy.get('input[name="password"]').first().type('111111', { force: true });
        cy.get('button[id="loginbutton"]').first().click({ force: true });
        cy.wait(2000);
    });
  
    it('Переход на главную страницу', () => {
      cy.url().should('include', home+'/home');
      cy.get('h1').should('contain', 'MainPage');
    });
  
    it('Переход на страницу каталога', () => {
      cy.visit(home+'/cat');
      cy.url().should('include', home+'/cat');
      cy.get('h1').should('contain', 'ProductsPage');
    });
  
    it('Переход на страницу продукта', () => {
      cy.visit(home+'/cat/123');
      cy.url().should('include', home+'/cat/123');
      cy.get('h1').should('contain', 'ProductDetails');
    });
  
    it('Переход на страницу "О НАС"', () => {
      cy.visit(home+'/about');
      cy.url().should('include', home+'/about');
      cy.get('h1').should('contain', 'О НАС');
    });
  
    it('Переход на страницу контактов', () => {
      cy.visit(home+'/contacts');
      cy.url().should('include', home+'/contacts');
      cy.get('h1').should('contain', 'КОНТАКТЫ');
    });
  
    it('Переход на страницу помощи', () => {
      cy.visit(home+'/help');
      cy.url().should('include', home+'/help');
      cy.get('h1').should('contain', 'ПОМОЩЬ');
    });
  
    it('Переход на страницу авторизации', () => {
      cy.visit(home+'/login');
      cy.url().should('include', home+'/login');
      cy.get('h1').should('contain', 'AuthForm');
    });
  
    it('Переход на страницу профиля пользователя', () => {
      cy.visit(home+'/userProfile/123');
      cy.url().should('include', home+'/userProfile/123');
      cy.get('h1').should('contain', 'UserProfile');
    });
  
    it('Переход на страницы администратора', () => {
      cy.visit(home+'/admin');
      cy.url().should('include', home+'/admin');
      cy.get('.AdminMainPage').should('exist');
  
      cy.visit(home+'/admin/users');
      cy.url().should('include', home+'/admin/users');
      cy.get('h1').should('contain', 'UsersPage');
    });
  
    it('Переход на страницу результатов поиска', () => {
      cy.visit(home+'/search');
      cy.url().should('include', home+'/search');
      cy.get('h1').should('contain', 'SearchResults');
    });
  
    it('Переход на несуществующий маршрут', () => {
      cy.visit(home+'/nonexistent');
      cy.url().should('include', home+'/nonexistent');
      cy.get('h1').should('contain', 'Page404');
    });
  });