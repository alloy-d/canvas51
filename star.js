function makeStar(centerX, centerY, radius) {
    var cCenterX, cCenterY, cRadius, cSpikes, cMidpoints;
    var spikes = [], midpoints = [], faceFills = [];
    var i = 0;

    var map = function (r, theta) {
        var cr = cy(r);
        return rect(cr, theta, cCenterX, cCenterY);
    }

    for (i = 0; i < 5; i += 1) {
        spikes[i] = {
            r: radius,
            theta: 2 * i * Math.PI / 5 - Math.PI / 2
        };
    }

    midpoints = [
        {r: 0.55 * radius, theta: -3 * Math.PI / 10},
        {r: 0.60 * radius, theta: Math.PI / 10},
        {r: 0.60 * radius, theta: 5 * Math.PI / 10},
        {r: 0.60 * radius, theta: 9 * Math.PI / 10},
        {r: 0.55 * radius, theta: 13 * Math.PI / 10}
    ];

    faceFills = [
        {a: "#99aacc", c: "#bbccee"},
        {a: "#bbccee", c: "#9988af"},
        {a: "#99aacc", c: "#9988af"},
        {a: "#9988af", c: "#99aacc"},
        {a: "#9988af", c: "#99aacc"}
    ];


    return {
        resize: function () {
            cCenterX = cx(centerX);
            cCenterY = cy(centerY);
            cRadius = cy(radius);

            cSpikes = Array.map(spikes, function (point) {
                return map(point.r, point.theta);
            });
            cMidpoints = Array.map(midpoints, function (point) {
                return map(point.r, point.theta);
            });
        },
        draw: function () {
            var i = 0, ai = 0;

            context.save();
            context.strokeStyle = "#70708f";
            context.lineWidth = 1;

            for (i = 0; i < 5; i += 1) {
                ai = (i + 4) % 5; // anticlockwise index

                // draw face in clockwise direction
                context.beginPath();
                context.moveTo(cCenterX, cCenterY);
                context.lineTo(cSpikes[i].x, cSpikes[i].y);
                context.lineTo(cMidpoints[i].x, cMidpoints[i].y);
                context.lineTo(cCenterX, cCenterY);
                context.fillStyle = faceFills[i]["c"];
                context.fill();
                context.stroke();
                context.closePath();

                // draw face in anticlockwise direction
                context.beginPath();
                context.moveTo(cCenterX, cCenterY);
                context.lineTo(cSpikes[i].x, cSpikes[i].y);
                context.lineTo(cMidpoints[ai].x, cMidpoints[ai].y);
                context.fillStyle = faceFills[i]["a"];
                context.fill();
                context.stroke();
                context.closePath();
            }
            context.restore();
        },
    };
}


