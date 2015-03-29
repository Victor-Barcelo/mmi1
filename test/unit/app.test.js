xdescribe('user service', function () {
    beforeEach(module('app'));
    var user;

    beforeEach(inject(function (_user_) {
        user = _user_;
    }));

    it('should login', function () {
        expect(user.isLogged()).to.equal(false);
    });
});

describe('LoginController', function () {
    var scope;
    var loginCtrl;

    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        loginCtrl = $controller('LoginController', {$scope: scope});
    }));

    it('should have a default login and password', function () {
        expect(loginCtrl.login).to.equal('pepe');
    });
});

describe('controller: NewsFeedController', function () {
    var scope;
    var NewsFeedController;
    beforeEach(module('app'));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        NewsFeedController = $controller('NewsFeedController', {$scope: scope});
    }));
});