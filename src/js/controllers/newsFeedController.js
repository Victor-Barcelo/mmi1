(function () {
    var app = angular.module("app");

    var NewsFeedController = function (user, newsFeed) {
        var vm = this;
        vm.news = null;
        vm.searchTerms = null;
        vm.newsSources = {'El País': false, 'El Economista': true, 'El Confidencial': false};

        vm.langTo = [
            {id: 1, name: 'No traducir', value: 'es'},
            {id: 2, name: 'Inglés', value: 'en'},
            {id: 3, name: 'Aleman', value: 'de'},
            {id: 4, name: 'Francés', value: 'fr'}
        ];
        vm.selectedLangTo = vm.langTo[0];

        vm.getNews = function () {
            vm.isAjaxRequesting = true;
            var formattedSources = JSON.stringify(vm.newsSources);
            newsFeed.getNews(vm.selectedLangTo.value, formattedSources).then(function (news) {
                vm.news = news[0];
                vm.news = vm.news.concat(news[1]).concat(news[2]);
                vm.isAjaxRequesting = false;
            });
        };
    };

    app.controller("NewsFeedController", NewsFeedController);
}());