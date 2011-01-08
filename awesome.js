var canvas = document.getElementById("awesome");
var context = canvas.getContext("2d");

var dashStarted = false, starBroken = false, movementStarted = false;

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
};

var clearCanvas = function () {
    context.clearRect(0, 0, WIDTH, HEIGHT);
};

var locations = (function (w, h, x, y, text) {
    var font = makeFont(w, h);
    var cx = x, cy = y;
    var i = 0, j = 0;
    var words = text.split(" ");
    var locations = [];

    for (i = 0; i < words.length; i += 1) {
        cx = (1000 - (w + 15) * words[i].length) / 2;
        cy = y + i * (h + 50);

        if (words[i][words[i].length-1] === ",") cx += w / 2 + 7.5;
        for (j = 0; j < words[i].length; j += 1) {
            if (words[i][j] === ",")
                locations = locations.append(font.comma(cx, cy));
            else
                locations = locations.append(font[words[i][j]](cx, cy));

            cx += w + 15;
        }
    }

    return locations;
}(70, 130, 0, 180, "HAPPY BIRTHDAY, SOPHIE"));

var horizon = makeHorizon();
var star = makeStar(500, 500, 100);
var platform = makePlatform();
var starField = makeStarField(1000);
var twinkles = makeTwinkles(locations);
var text = makeText();
var unicorn = makeUnicorn();
var ocean = makeOcean();
var fireworks = makeFireworks();
var dolphin = makeDolphin();

var startMovement = function () {
    if (movementStarted) return;
    movementStarted = true;
    horizon.move();
    platform.move();
    ocean.move();
    setInterval(function () { fireworks.add(100+Math.random()*800, Math.random()*800); }, 200);
};

var drawFrame = function () {
    clearCanvas();

    if (movementStarted) {
        horizon.update();
        platform.update();
    }

    horizon.draw();
    star.draw();
    platform.draw();

    if (dashStarted) {
        unicorn.draw();
    }

    if (starBroken) {
        starField.draw();
        //twinkles.draw();
        startMovement();
    }

    ocean.draw();
    fireworks.draw();
    text.draw();

    // TODO
    dolphin.draw();

    FRAME += 1;
};

window.addEvent('load', function () {
    resizeCanvas();
    horizon.resize();
    star.resize();
    dolphin.resize(); // TODO
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

