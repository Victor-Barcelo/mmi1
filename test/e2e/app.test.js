describe('app', function () {

    describe('User authentication functionality', function () {
        beforeEach(function () {
        });

        it('should login', function () {
            doLogin('pepe', '1234');
            var navBrand = element.all(by.css('.navbar-brand'));

            expect(navBrand.count()).toBeGreaterThan(0);
        });

        it('should login as user with "user" role', function () {
            doLogin('pepa', '1234');

            element(by.css('#userRole')).getText().then(function (role) {
                expect(role).toBe('user');
            });
        });

        it('should login as user with "admin" role', function () {
            doLogin('pepe', '1234');

            element(by.css('#userRole')).getText().then(function (role) {
                expect(role).toBe('admin');
            });
        });

        it('should restrict "Administración" visibility to non "admin" role users', function () {
            doLogin('pepa', '1234');
            var adminLink = element.all(by.cssContainingText('a[ui-sref="admin"]', 'Administración'));

            expect(adminLink.count()).toBe(0);
        });

        it('should permit "Administración" visibility to "admin" role users', function () {
            doLogin('pepe', '1234');
            var adminLink = element.all(by.css('a[ui-sref="admin"]'));

            expect(adminLink.count()).toBe(1);
        });
    });

    describe('"Consultar Noticias" functionality', function () {
        beforeEach(function () {
        });

        it('should return news upon request', function () {
            doLogin('pepe', '1234');
            var newsfeedLink = element.all(by.css('a[ui-sref="newsfeed"]'));
            newsfeedLink.click();
            element.all(by.css('input[type="checkbox"]')).first().click();
            element(by.css('[ng-click="newsForm.$valid && newsFeedCtrl.getNews()"]')).click();
            var news = element.all(by.repeater('news in newsFeedCtrl.news'));

            expect(news.count()).toBeGreaterThan(0);
        });
    });

    var doLogin = function (login, password) {
        browser.get('http://localhost/mmi-mu-1/src/#/login');
        var loginEl = element(by.model('loginCtrl.login'));
        var passwordEl = element(by.model('loginCtrl.password'));
        loginEl.clear();
        loginEl.sendKeys(login);
        passwordEl.clear();
        passwordEl.sendKeys(password);
        element(by.css('[ng-click="loginCtrl.submitLogin()"]')).click();
    }

});