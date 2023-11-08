const home = 'http://localhost:3000'
function auth(){
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="username"]').first().type('123123', { force: true });
    cy.get('input[name="password"]').first().type('111111', { force: true });
    cy.get('button[id="loginbutton"]').first().click({ force: true });
    cy.wait(2000);
}

describe('Маршрутизация', () => {
    beforeEach(() => {
        cy.visit(home);
      
    });
  
    it('Переход на главную страницу', () => {
        cy.visit(home);
        cy.url().should('include', home+'/home');
        cy.get('.homePage').should('exist');
    });
  
    it('Переход на страницу каталога', () => {
        cy.visit(home+'/cat');
        cy.url().should('include', home+'/cat');
        cy.get('.products-container', { timeout: 10000 }).should('exist', );
    });
  
    it('Переход на страницу продукта', () => {
        cy.visit(home+'/cat/650044a404f1344086586df6');
        cy.url().should('include', home+'/cat/650044a404f1344086586df6');
        cy.get('.productDetails-title').should('exist');
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

  // маршрутизация по пользовательскому разделу
  const user = home+'/userProfile'

    it('Переход на страницу авторизации пользователя', () => {
        cy.visit(home+'/login');
        cy.url().should('include', home+'/login');
        cy.get('h1').should('contain', 'Войти');
    });
  
    it('Переход на страницу профиля пользователя', () => {
        auth()
        cy.visit(user+'/64f0733088e42d1bfd471ad2');
        cy.url().should('include', user+'/64f0733088e42d1bfd471ad2');
        cy.get('h1').should('contain', 'Профиль пользователя');
    });

    it('Переход на страницу избранного пользователя', () => {
        auth()
        cy.visit(user+'/fav');
        cy.url().should('include', user+'/fav');
        cy.get('h1').should('contain', 'Избранное');
    });

    it('Переход на страницу заказов пользователя', () => {
        auth()
        cy.visit(user+'/orders');
        cy.url().should('include', user+'/orders');
        cy.get('h1').should('contain', 'Ваши заказы');
    });

    it('Переход на страницу корзины пользователя', () => {
        auth()
        cy.visit(user+'/cart');
        cy.url().should('include', user+'/cart');
        cy.get('h2').should('contain', 'Корзина');
    });

  // маршрутизация по админке
  const admin = home+'/admin'

    it('Переход на главную страницу админпанели', () => {
        auth()
        cy.visit(admin);
        cy.url().should('include', admin);
        cy.get('.AdminMainPage').should('exist');
    });
    
    it('Переход на страницу администрирования товаров', () => {
        auth()
        cy.visit(admin+'/products');
        cy.url().should('include', admin+'/products');
        cy.get('h1').should('contain', 'Товары');
    });

    it('Переход на страницу администрирования категорий товаров', () => {
        auth()
        cy.visit(admin+'/categories');
        cy.url().should('include', admin+'/categories');
        cy.get('h1').should('contain', 'Категории товаров');
    });

    it('Переход на страницу администрирования характеристик товаров', () => {
        auth()
        cy.visit(admin+'/prodchars');
        cy.url().should('include', admin+'/prodchars');
        cy.get('h1').should('contain', 'Характеристики товаров');
    });

    it('Переход на страницу администрирования пользователей', () => {
        auth()
        cy.visit(admin+'/users');
        cy.url().should('include', admin+'/users');
        cy.get('h1').should('contain', 'Пользователи');
    });

    it('Переход на страницу администрирования категорий пользователей', () => {
        auth()
        cy.visit(admin+'/roles');
        cy.url().should('include', admin+'/roles');
        cy.get('h1').should('contain', 'Категории пользователей');
    });

    it('Переход на страницу администрирования заказов', () => {
        auth()
        cy.visit(admin+'/orders');
        cy.url().should('include', admin+'/orders');
        cy.get('h1').should('contain', 'Заказы пользователей');
    });

    it('Переход на страницу администрирования статусов заказов пользователей', () => {
        auth()
        cy.visit(admin+'/order_status');
        cy.url().should('include', admin+'/order_status');
        cy.get('h1').should('contain', 'Статусы заказов пользователей');
    });

  // маршрутизация служебные/вспомогательные функции
    it('Переход на страницу результатов поиска', () => {
        cy.visit(home+'/search');
        cy.url().should('include', home+'/search');
        cy.get('.searchResults-container').should('exist');
    });
  
    it('Переход на несуществующий маршрут', () => {
        cy.visit(home+'/nonexistent');
        cy.url().should('include', home+'/nonexistent');
        cy.get('h1').should('contain', 'Ошибка404');
    });
  });