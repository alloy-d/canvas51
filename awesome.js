var bangStarted = false;

twinkles = makeTwinkles("twinkles");
stars = makeStars("littlebang", 1000, twinkles.locations);
horizon = makeHorizon("horizon");
text = makeText("littlebang");

window.addEvent('load', horizon.draw);
window.addEvent('resize', horizon.draw);
window.addEvent('load', text.draw);

window.addEvent('keydown', function (event) {
    if (bangStarted) return;
    if (event.key === 'x') {
        bangStarted = true;
        stars.bang(function () {
            twinkles.draw();
            window.addEvent('resize', stars.draw);
        });
    }
});

