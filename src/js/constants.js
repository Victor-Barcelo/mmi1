'use strict';

var app = angular.module("app");

app.constant('API_URLS', {
    login: 'http://localhost/mmi-mu-1/api/login',
    getNewsFeed: 'http://localhost/mmi-mu-1/api/getNewsFeed'
});

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