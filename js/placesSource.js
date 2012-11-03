var createPlacesSource = function (mapCenter) {
    var that = {};
    var url             = "http://demo.places.nlp.nokia.com";
    var placesCategory  = "landmark-attraction";

    that.fetchPlaces = function(onPlacesFetched) {
        $.getJSON(url+'/places/v1/discover/explore?cat='+placesCategory+'&at=' + mapCenter.latitude + '%2C' + mapCenter.longitude + '&tf=plain&pretty=y&size=50&app_id=demo_qCG24t50dHOwrLQ&app_code=NYKC67ShPhQwqaydGIW4yg', function(data) {

            var items = [];
            $.each(data.results.items, function(index, val) {
                if (isPlace(val.type))
                    items.push(val);
            });

            onPlacesFetched(items);

        });
    }

    var isPlace = function (type) {
        return type == "urn:nlp-types:place";
    };

    return that;
}