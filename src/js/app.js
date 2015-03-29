(function () {

    var app = angular.module("app", ['ui.router', 'ngMessages']);

    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    app.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        user: 'user',
        guest: 'guest'
    });

    app.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
            .state("login", {
                url: '/login',
                templateUrl: "views/login.html",
                controller: "LoginController as loginCtrl",
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .state("main", {
                url: '/main',
                templateUrl: "views/main.html",
                controller: "MainController as mainCtrl",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
                }
            })
            .state("requestmon", {
                url: '/requestmon',
                templateUrl: "views/requestmon.html",
                controller: "RequestMonController as requestCtrl",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
                }

            })
            .state("activemon", {
                url: '/activemon',
                templateUrl: "views/activemon.html",
                controller: "ActiveMonController as activeMonCtrl",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
                }
            })
            .state("newsfeed", {
                url: '/newsfeed',
                templateUrl: "views/newsfeed.html",
                controller: "NewsFeedController as newsFeedCtrl",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
                }
            })
            .state("admin", {
                url: '/admin',
                templateUrl: "views/admin.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }

            });
        $urlRouterProvider.otherwise("/login");
    });


    app.run(function (user, AUTH_EVENTS, USER_ROLES, $rootScope, $state, $window) {
        $rootScope.user = {};
        $rootScope.userHasRole = user.hasRole;
        $rootScope.USER_ROLES = USER_ROLES;
        $rootScope.currentState = null;

        $rootScope.logOut = function () {
            user.logOut();
            $window.sessionStorage.removeItem("userInfo");
            $rootScope.currentState = '/login';
            $state.go('login');
        };

        $rootScope.isCurrentState = function (state) {
            return state === $rootScope.currentState;
        }

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            $rootScope.user = {
                name: user.getName(),
                role: user.getRole()
            };
        });

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
        });

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

            $rootScope.currentState = toState.url;

            var authorizedRoles = toState.data.authorizedRoles;

            if (!user.isLogged() && $window.sessionStorage["userInfo"]) {

                console.log("Recuperando información de usuario desde sessionStorage");
                var userInfo = JSON.parse($window.sessionStorage["userInfo"]);
                user.setLogStatus(true);
                user.setName(userInfo.login);
                user.setRole(userInfo.role);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }

            if (!user.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (user.isLogged()) {
                    console.log("Logeado pero sin rol autorizado");
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    console.log("No logeado");
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    $rootScope.currentState = '/login';
                    $state.go('login');
                }
            }
            else {
                console.log('Usuario autorizado');
            }

        });
    });


}());