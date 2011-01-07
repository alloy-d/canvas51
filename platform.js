function makePlatform() {
    var step = 0;
    var moving = false;

    var yo = function () { return 820 * (step/100); }
    var py = function (y) { return cy(y - yo()); }
    return {
        draw: function () {
            context.save();
            context.strokeStyle = "black";
            context.fillStyle = "black";

            context.beginPath();
            context.moveTo(0, py(590));
            context.quadraticCurveTo(cx(600), py(570), WIDTH, py(590));
            context.lineTo(WIDTH, py(780));
            context.quadraticCurveTo(cx(920), py(820), cx(900), py(800));
            context.quadraticCurveTo(cx(880), py(720), cx(740), py(680));
            context.quadraticCurveTo(cx(480), py(630), cx(120), py(670));
            context.quadraticCurveTo(0      , py(700), 0      , py(720));
            context.stroke();
            context.fill();
            context.closePath();
            context.restore();
        },
        move: function () {
            moving = true;
        },
        update: function () {
            if (moving && step == 100) moving = false;
            if (moving) step += 1;
        },
    };
}
