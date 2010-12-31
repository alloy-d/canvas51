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

var horizon = makeHorizon();
var star = makeBreakable(500, 500, 100);
var platform = makePlatform();
var starField = makeStars(1000);
var twinkles = makeTwinkles();
var text = makeText();

var drawFrame = function () {
    clearCanvas();

    horizon.draw();
    star.draw();
    platform.draw();

    if (starBroken) {
        starField.draw();
        twinkles.draw();
    }

    text.draw();

    FRAME += 1;
}

setInterval(drawFrame, 30);

window.addEvent('load', function () {
    resizeCanvas();
    horizon.prepare();
});

window.addEvent('resize', function () {
    resizeCanvas();
    horizon.prepare();
    drawFrame();
});

window.addEvent('load', function () {
    drawFrame();
});

window.addEvent('keydown', function (event) {
    if (dashStarted) return;
    if (event.key === 'x') {
        dashStarted = true;
        starBroken = true;
    }
});

