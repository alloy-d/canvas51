var makeHorizon = function () {
    var gradient;
    var moving = false;
    var step = 0;

    return {
        resize: function () {
            gradient = context.createLinearGradient(0, 0, 0, HEIGHT);
            gradient.addColorStop(0.3 - 0.2 * (step/100), "#000000");
            gradient.addColorStop(0.8 - 0.4 * (step/100), "#000022");
            gradient.addColorStop(1, "#000044");
        },
        draw: function () {
            context.save();
            context.fillStyle = gradient;
            context.fillRect(0, 0, WIDTH, HEIGHT);
            context.restore();
        },
        move: function () {
            moving = true;
        },
        update: function () {
            if (moving && step == 100) moving = false;
            if (moving) step += 1;
            this.resize();
        },
    };
};

