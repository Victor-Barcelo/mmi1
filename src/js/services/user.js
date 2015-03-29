(function () {

    var user = function ($http, API_URLS) {

        var authenticate = function (login, password) {
            var request = $http({
                method: 'POST',
                url: API_URLS.login,
                data: $.param({login: login, password: password}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).
                success(function (data, status, headers, config) {
                    return data;
                }).
                error(function (data, status, headers, config) {
                    return false;
                });
            return request;
        }

        var _isLogged = false;
        var _name = '';
        var _role = '';

        var logOut = function () {
            _isLogged = false;
            _name = '';
            _role = '';
        }

        var setName = function (name) {
            _name = name;
        }

        var setRole = function (role) {
            _role = role;
        }

        var getName = function () {
            return _name;
        }

        var getRole = function () {
            return _role;
        }

        var hasRole = function (role) {
            return _role === role;
        }

        var isLogged = function () {
            return _isLogged;
        }

        var setLogStatus = function (status) {
            _isLogged = status;
        }

        var isAuthorized = function (authorizedRoles) {
            return authorizedRoles.indexOf(getRole()) > -1 || authorizedRoles[0] == '*';
        }

        return {
            authenticate: authenticate,
            logOut: logOut,
            setName: setName,
            setRole: setRole,
            setLogStatus: setLogStatus,
            getName: getName,
            getRole: getRole,
            setLogStatus: setLogStatus,
            hasRole: hasRole,
            isLogged: isLogged,
            isAuthorized: isAuthorized
        };
    };

    var module = angular.module("app");
    module.factory("user", user);
}());