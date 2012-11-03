if (typeof Number.prototype.toRad == 'undefined') {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

var createGame = function(items, view) {
    var that, currentItem, totalScore;
    that = {};
    totalScore = 0;

    that.startGame = function() {
        currentItem = items[0];
        view.showCurrentItem(currentItem);
        view.onMapClick(that.usersClicks);
    }


    that.usersClicks = function(coord) {
        var offByInMeters = getOffByInMeters(coord, currentItem.position);
        view.showOffByInMeters(offByInMeters);
        var score = scoreForClick(offByInMeters);
        if (score > 0) {
            totalScore = totalScore + score;
            view.showTotalScore(totalScore);
        }

        view.displayPlaceMarker(currentItem.position);
        nextQuestion();
    };

    var nextQuestion = function() {
        setTimeout(function() {
            currentItem = items[items.indexOf(currentItem) + 1];
            view.showCurrentItem(currentItem);

        }, 1000);
    };

    var scoreForClick = function(offByInMeters) {
        return Math.max(Math.round(1500 - offByInMeters), 0);

    };

    var getOffByInMeters = function(coord, position) {
        var lat1, lat2, lon1, lon2;

        lat1 = coord.latitude;
        lon1 = coord.longitude;
        lat2 = position[0];
        lon2 = position[1];

        var R = 6371; // km
        var dLat = (lat2 - lat1).toRad();
        var dLon = (lon2 - lon1).toRad();
        lat1 = lat1.toRad();
        lat2 = lat2.toRad();


        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return Math.round(d*1000);

    };

    return that;
}
