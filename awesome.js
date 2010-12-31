var canvas = document.getElementById("awesome");
var context = canvas.getContext("2d");

var dashStarted = false, starBroken = false;

var WIDTH, HEIGHT, CENTER;
var FRAME;

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

var drawHorizon = makeHorizon().draw;
var drawStar = makeBreakable(500, 500, 100).draw;
var drawPlatform = makePlatform().draw;
var drawStarField = makeStars(1000).draw;
var drawTwinkles = makeTwinkles().draw;
var drawText = makeText().draw;

var drawFrame = function () {
    clearCanvas();

    drawHorizon();
    drawStar();
    drawPlatform();
    drawStarField();
    drawTwinkles();
    drawText();
}

window.addEvent('load', function () {
    resizeCanvas();
});

window.addEvent('resize', function () {
    resizeCanvas();
    drawFrame();
});

window.addEvent('load', function () {
    drawFrame();
});

window.addEvent('keydown', function (event) {
    if (dashStarted) return;
    if (event.key === 'x') {
        dashStarted = true;
        stars.bang(function () {
            twinkles.draw();
            window.addEvent('resize', stars.draw);
        });
    }
});

