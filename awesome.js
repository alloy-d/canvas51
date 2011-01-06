var canvas = document.getElementById("awesome");
var context = canvas.getContext("2d");

var dashStarted = false, starBroken = false;

var WIDTH, HEIGHT, CENTER;
var FRAME = 0;

var resizeCanvas = function () {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    CENTER = {
        x: WIDTH / 2,
        y: HEIGHT / 2
    };

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}

var clearCanvas = function () {
    context.clearRect(0, 0, WIDTH, HEIGHT);
}

var locations = (function (w, h, x, y, text) {
    var font = makeFont(w, h);
    var cx = x, cy = y;
    var i = 0;
    var locations = [];

    for (i = 0; i < text.length; i += 1) {
        if (text[i] === " ") {
            cx = x;
            cy += h + 50;
            continue;
        }
        if (text[i] === ",") locations = locations.append(font.comma(cx, cy));
        else locations = locations.append(font[text[i]](cx, cy));

        cx += w + 6;
    }

    return locations;
}(70, 130, 20, 20, "HAPPY BIRTHDAY, SOPHIE"));


var horizon = makeHorizon();
var star = makeStar(500, 500, 100);
var platform = makePlatform();
var starField = makeStarField(1000);
var twinkles = makeTwinkles(locations);
var text = makeText();
var unicorn = makeUnicorn();

var drawFrame = function () {
    clearCanvas();

    horizon.draw();
    star.draw();
    platform.draw();

    if (dashStarted) {
        unicorn.draw();
    }

    if (starBroken) {
        starField.draw();
        twinkles.draw();
    }

    text.draw();

    FRAME += 1;
}

window.addEvent('load', function () {
    resizeCanvas();
    horizon.resize();
    star.resize();
    drawFrame();
    setInterval(drawFrame, 30);
});

window.addEvent('resize', function () {
    resizeCanvas();
    horizon.resize();
    star.resize();
    drawFrame();
});

window.addEvent('keydown', function (event) {
    if (dashStarted) return;
    if (event.key === 'x') {
        dashStarted = true;
        //starBroken = true;
    }
});

