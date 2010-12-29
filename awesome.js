var horizonCanvas = document.getElementById("horizon");
var horizonContext = horizonCanvas.getContext("2d");

var bangStarted = false;

nameDrawers = makeNameDrawers("twinkling");
drawers = makeStarDrawers(1000, nameDrawers["locations"], "bigbang");

drawHorizon = makeHorizonDrawer("horizon")["draw"];

window.addEvent('load', drawHorizon);
window.addEvent('resize', drawHorizon);
window.addEvent('load', function(){drawDash("bigbang");});

window.addEvent('keydown', function (event) {
    if (bangStarted) return;
    if (event.key === 'x') {
        bangStarted = true;
        drawers["bang"](function () {
            nameDrawers['draw']();
            window.addEvent('resize', drawers['draw']);
        });
    }
});

