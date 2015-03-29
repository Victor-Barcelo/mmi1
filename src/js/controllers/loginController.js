(function () {

    var app = angular.module("app");

    var LoginController = function (user, $state, $rootScope, $window, AUTH_EVENTS) {
        var vm = this;
        vm.login = 'pepe';
        vm.password = '1234';
        vm.invalidFormInput = false;
        vm.loginError = false;

        vm.submitLogin = function () {
            if (!vm.login || !vm.password) {
                vm.invalidFormInput = true;
                return;
            } else vm.invalidFormInput = false;

            user.authenticate(vm.login, vm.password).then(function (response) {
                if (response === false) {
                }
                if (response.data.success === true) {

                    $window.sessionStorage["userInfo"] = JSON.stringify({
                        login: response.data.userInfo.login,
                        role: response.data.userInfo.role
                    });
                    user.setLogStatus(true);
                    user.setName(response.data.userInfo.login);
                    user.setRole(response.data.userInfo.role);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $state.go('main');
                }
                if (response.data.success === false) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    vm.loginError = true;
                }
            });
        }
    };

    app.controller("LoginController", LoginController);
}());