var canvas = document.getElementById("awesome");
var context = canvas.getContext("2d");

var dashStarted = false, starBroken = false, movementStarted = false;
var startFrame = -1;

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

var sounds = {
    star: document.getElementById("star"),
    unicorn: document.getElementById("unicorn"),
    dolphins: document.getElementById("dolphins"),
    moreDolphins: document.getElementById("moreDolphins"),
    broken: document.getElementById("broken"),
}


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
var dolphins = makeDolphins();

var startMovement = function () {
    if (movementStarted) return;
    startFrame = FRAME;
    movementStarted = true;
    horizon.move();
    platform.move();
    ocean.move();
    text.hide();
    if (sounds.broken !== null) sounds.broken.play();
};

var STOP_THIS_NONSENSE = false;
var drawFrame = function () {
    if (STOP_THIS_NONSENSE) return;
    clearCanvas();

    if (movementStarted) {
        horizon.update();
        platform.update();
    }

    horizon.draw();
    star.draw();
    platform.draw();

    if (dashStarted) {
        if (sounds.unicorn === null || sounds.unicorn.ended) {
            unicorn.draw();
        }
    }

    if (starBroken) {
        starField.draw();
        twinkles.draw();
        fireworks.draw();
        dolphins.draw();
        startMovement();
        if (ocean.moving()) {
            if (FRAME-startFrame === 5) {
                dolphins.addShouter(200);
                dolphins.addShouter(280);
                dolphins.addShouter(360);
                if (sounds.dolphins !== null) sounds.dolphins.play();
            } else if (FRAME-startFrame === 18) {
                if (sounds.moreDolphins !== null) sounds.moreDolphins.play();
            } else if (FRAME-startFrame === 40) {
                dolphins.addShouter(600);
                dolphins.addShouter(680);
                dolphins.addShouter(760);
            }
        } else {
            if (wr(500) > 470) dolphins.add(wr(1000));
        }
    }

    ocean.draw();
    text.draw();

    FRAME += 1;
};

window.addEvent('load', function () {
    resizeCanvas();
    horizon.resize();
    star.resize();
    drawFrame();
    if (sounds.star !== null) sounds.star.play();
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
        if (sounds.unicorn !== null) sounds.unicorn.play();
        //starBroken = true;
    }
});

window.addEvent('domready', function () {
    var w, text = "Gimme a sec... ;D";
    resizeCanvas();
    context.font = "italic 48px Georgia, serif";
    context.fillStyle = "white";
    w = context.measureText(text).width;
    context.fillText(text, (WIDTH-w)/2, HEIGHT * 0.45);
});

