(function () {
    var newsFeed = function ($http, API_URLS) {
        var getNews = function (langTo, selectedSources) {
            var encodedUrl = API_URLS.getNewsFeed + '/' + langTo + '/' + encodeURIComponent(selectedSources);
            return $http.get(encodedUrl)
                .then(function (response) {
                    return response.data.news;
                });
        }

        return {
            getNews: getNews
        };
    };

    var module = angular.module("app");
    module.factory("newsFeed", newsFeed);
}());