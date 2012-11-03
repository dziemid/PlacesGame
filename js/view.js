var createView = function(mapCenter) {
    var that = {};

    var mapContainer = document.getElementById("mapContainer");

    var map = new nokia.maps.map.Display(mapContainer, {
        center: [mapCenter.latitude, mapCenter.longitude],
        zoomLevel: 12,
        components:[]
    });

    that.displayPlaceMarker = function(position) {
        var standardMarker = new nokia.maps.map.StandardMarker(position);
        map.objects.add(standardMarker);

        setTimeout(function() {
            map.objects.remove(standardMarker);
        }, 1000);

    };

    that.showCurrentItem =function(item) {
        $("#name").hide().html(item.title).fadeIn();
    };

    that.showTotalScore = function(totalScore) {
        $("#score").hide().html(totalScore).fadeIn();
    };

    that.showOffByInMeters = function(offByInMeters) {
        $("#offByInMeters").html(offByInMeters);
        $("#offBy").show().fadeOut(1000);
    };

    that.onMapClick = function(handler) {
        var TOUCH = nokia.maps.dom.Page.browser.touch, CLICK = TOUCH ? "tap" : "click";
        map.addListener(CLICK, function (evt) {
            var coord = map.pixelToGeo(evt.displayX, evt.displayY);
            handler(coord);
        });
    };

    return that;
};