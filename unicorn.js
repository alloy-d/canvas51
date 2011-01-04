function makeUnicorn() {
    var step = 0;
    var pos = {
        x: 200,
        y: 500
    };
    var dx = 20;

    var arc = {
        height: 100,
        width: 500,
    };
    var start = {
        blue: 0,
        green: 15,
    };
    var end = {
        blue: 20,
        green: 40,
    };
    var fill = {
        blue: "#00aaff",
        green: "#00ffaa",
    };

    var endpoint = function(color) {
        var l = end[color] - start[color];
        var t = step - start[color];
        var p = (step - start[color]) / (end[color] - start[color]);
        if (t > l) t = l;
        if (step > end[color]) p = 1;

        return {
            r: t * t / 1.2,
            theta: 3 * Math.PI / 2 - (Math.PI/2) * p,
        };
    }

    return {
        draw: function () {
            context.save();
            var s = 0;
            var x = cx(pos.x);
            var y = cy(pos.y);

            var ep, er;

            ["blue", "green"].each(function (color) {
                if (step >= start[color]) {
                    context.fillStyle = fill[color];

                    ep = endpoint(color);
                    er = rect(ep.r, ep.theta);

                    context.beginPath();
                    context.moveTo(x, y);
                    context.quadraticCurveTo(x,
                                             y + er.y,
                                             x + er.x,
                                             y + er.y);
                    context.quadraticCurveTo(x - 10,
                                             y + er.y + 10,
                                             x - 10,
                                             y);
                    context.quadraticCurveTo(x - 10,
                                             y - er.y - 10,
                                             x + er.x,
                                             y - er.y);
                    context.quadraticCurveTo(x,
                                             y - er.y,
                                             x,
                                             y);
                    context.fill();
                    context.closePath();
                }
            });
                
            context.restore();
            step += 1;
            pos.x += dx;
        },
    };
}

