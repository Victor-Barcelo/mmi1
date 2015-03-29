(function () {
    var newsFeed = function ($http) {
        var getNews = function (apiUrl, langTo, selectedSources) {
            var encodedUrl = apiUrl + langTo + '/' + encodeURIComponent(selectedSources);
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