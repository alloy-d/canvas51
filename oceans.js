var makeOcean = function () {
    var moving = false;
    var step = 0;

    var yo = function () { return 100 - step; };
    var py = function (y) { return cy(y + yo()); };

    return {
        draw: function () {
            var i = 0;

            context.save();
            context.fillStyle = "#223399";
            context.beginPath();
            context.moveTo(-40, py(1000));
            context.lineTo(-40, py(950));

            for (i = -40; i < 1000; i += 60) {
                context.quadraticCurveTo(cx(i+30 + Math.sin(FRAME/4)), py(1000),
                                         cx(i+60 + Math.sin(FRAME/4)), py(950));
            }
            context.lineTo(cx(i+60), py(1000));
            context.fill();
            context.closePath();
            context.restore();

            this.update();
        },
        move: function () { moving = true; },
        moving: function () { return moving; },
        update: function () {
            if (moving && step == 100) moving = false;
            if (moving) step += 1;
        },
    };
};

