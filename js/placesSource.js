var createPlacesSource = function (mapCenter) {
    var that = {};
    var url                     = "http://demo.places.nlp.nokia.com";
    var appId                   = 'demo_qCG24t50dHOwrLQ';
    var appCode                 = 'NYKC67ShPhQwqaydGIW4yg';
    var placesCategory          = "landmark-attraction";
    var numberOfPlacesToFetch   = '50';

    var request = url+'/places/v1/discover/explore?cat='+placesCategory
        + '&at=' + mapCenter.latitude + '%2C' + mapCenter.longitude
        + '&size=' + numberOfPlacesToFetch
        + '&app_id=' + appId + '&app_code=' + appCode + "&tf=plain&pretty=n";

    that.fetchPlaces = function(onPlacesFetched) {
        $.getJSON(request, function(data) {
            var places = getPlacesFromResponse(data);
            onPlacesFetched(places);
        });
    };

    var getPlacesFromResponse = function (data) {
        var items = [];
        $.each(data.results.items, function(index, searchResult) {
            if (isPlace(searchResult.type))
                items.push(searchResult);
        });
        return items;
    };

    var isPlace = function (type) {
        return type == "urn:nlp-types:place";
    };

    return that;
}