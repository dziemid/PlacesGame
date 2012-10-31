nokia.Settings.set("appId", "_peU-uCkp-j8ovkzFGNU");
nokia.Settings.set("authenticationToken", "gBoUkAMoxoqIWfxWA5DuMQ");

if (typeof Number.prototype.toRad == 'undefined') {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

var mapCenter = {
    longitude: 13.3896145,
    latitude: 52.5166648
};

var score = 0;
var items = [];

var currentItem;
var mapContainer = document.getElementById("mapContainer");
var map = new nokia.maps.map.Display(mapContainer, {
    center: [mapCenter.latitude, mapCenter.longitude],
    zoomLevel: 12,
    components:[]
});


$.getJSON('http://demo.places.nlp.nokia.com/places/v1/discover/explore?cat=landmark-attraction&at=' + mapCenter.latitude + '%2C' + mapCenter.longitude + '&tf=plain&pretty=y&size=50&app_id=demo_qCG24t50dHOwrLQ&app_code=NYKC67ShPhQwqaydGIW4yg', function(data) {

    $.each(data.results.items, function(index, val) {
        if (val.type == "urn:nlp-types:place")
            items.push(val);
    });

    currentItem = items[0];
    $("#name").html(currentItem.title);


    var TOUCH = nokia.maps.dom.Page.browser.touch, CLICK = TOUCH ? "tap" : "click";

    map.addListener(CLICK, function (evt) {
        var coord = map.pixelToGeo(evt.displayX, evt.displayY);
        handleMapClick(coord);

    });

});

var createView = function(map) {
    var that = {};

    that.displayPlaceMarker = function(position) {
        var standardMarker = new nokia.maps.map.StandardMarker(position);
        map.objects.add(standardMarker);

        setTimeout(function() {
            map.objects.remove(standardMarker);
        }, 1000);

    };

    that.showTotalScore = function(totalScore) {
        $("#score").hide().html(totalScore).fadeIn();
    };

    return that;
};

var view = createView(map);


var scoreForClick = function(coord) {
    var lat1, lat2, lon1, lon2;

    lat1 = coord.latitude;
    lon1 = coord.longitude;
    lat2 = currentItem.position[0];
    lon2 = currentItem.position[1];

    var R = 6371; // km
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    lat1 = lat1.toRad();
    lat2 = lat2.toRad();


    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return Math.max(Math.round(100 - 70 * d), 0);

};

var handleMapClick = function(coord) {
    var thisScore = scoreForClick(coord);
    if (thisScore > 0) {
        score = score + thisScore;
        view.showTotalScore(score);
    }

    view.displayPlaceMarker(currentItem.position);

    currentItem = items[items.indexOf(currentItem) + 1];
    $("#name").hide().html(currentItem.title).fadeIn();

};

