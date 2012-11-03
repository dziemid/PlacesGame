nokia.Settings.set("appId", "_peU-uCkp-j8ovkzFGNU");
nokia.Settings.set("authenticationToken", "gBoUkAMoxoqIWfxWA5DuMQ");

var mapCenter = {
    longitude: 13.3896145,
    latitude: 52.5166648
};

var view = createView(mapCenter);
var placesSource = createPlacesSource(mapCenter);

placesSource.fetchPlaces(function(places) {
    var game = createGame(places, view);
    game.startGame();
});