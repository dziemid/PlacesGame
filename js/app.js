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

var view = createView(mapCenter);

$.getJSON('http://demo.places.nlp.nokia.com/places/v1/discover/explore?cat=landmark-attraction&at=' + mapCenter.latitude + '%2C' + mapCenter.longitude + '&tf=plain&pretty=y&size=50&app_id=demo_qCG24t50dHOwrLQ&app_code=NYKC67ShPhQwqaydGIW4yg', function(data) {

    var items = [];

    $.each(data.results.items, function(index, val) {
        if (val.type == "urn:nlp-types:place")
            items.push(val);
    });

    var game = createGame(items, view);
    game.startGame();

});