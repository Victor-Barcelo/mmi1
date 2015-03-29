(function () {

    var app = angular.module("app");

    var RequestMonController = function (user) {
        var vm = this;
        vm.userName = user.name;
        vm.isLogged = user.isLogged;
        vm.userRole = user.role;
    };
    app.controller("RequestMonController", RequestMonController);

}());