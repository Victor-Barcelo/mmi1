(function () {

    var app = angular.module("app");

    var AppController = function (user, $state, $scope, $location, $rootScope, AUTH_EVENTS, USER_ROLES) {
        var vm = this;
        vm.path = null;
        vm.foo = "foo!";
        vm.user = {};
        vm.userHasRole = user.hasRole;
        vm.USER_ROLES = USER_ROLES;

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            vm.user = {
                name: user.getName(),
                role: user.getRole()
            };
        });

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
        });

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

            $rootScope.currentState = toState.url;

            var authorizedRoles = toState.data.authorizedRoles;
            if (!user.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (user.isLogged()) {
                    //console.log("logeado pero sin acceso a la vista");
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    //console.log("no logeado");
                    //$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    $state.go('login');
                }
            }
            else {
                //console.log('usuario autorizado');
            }

        });
    };
    app.controller("AppController", AppController);

}());