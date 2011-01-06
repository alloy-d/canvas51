function makeFont(width, height, density) {
    var dx = width / density;
    var dy = height / density;

    var genPoints = function (f, x, y) {
        var cx = 0, cy = 0;
        var tx = 0, ty = 0;
        var points = [];

        while (cx <= width && cy <= height) {
            if (f.x) {
                for (i = 0; i < f.x.length; i += 1) {
                    ty = f.x[i](cx);
                    if (ty !== null) points[points.length] = [x + cx, y + ty];
                }
            }
            if (f.y) {
                for (i = 0; i < f.y.length; i += 1) {
                    tx = f.y[i](cy);
                    if (tx !== null) points[points.length] = [x + tx, y + cy];
                }
            }
            cx += dx;
            cy += dy;
        }

        return points;
    };

    return {
        A: function (x, y) {
            var f = {
                x: [
                    function (x) {
                        if (x < width/2) {
                            return height - height * (x)/(width/2);
                        } else {
                            return height * (x - width/2)/(width/2);
                        }
                    },
                    function (x) {
                        if (x > width/4 && x < 3*width/4 && (x % 2))
                            return 2*height/3;
                    }
                ],
            }

            return genPoints(f, x, y);
        },
        B: undefined,
        D: undefined,
        E: undefined,
        H: undefined,
        I: undefined,
        O: undefined,
        P: undefined,
        R: undefined,
        S: undefined,
        T: undefined,
        Y: undefined,
        comma: undefined,
        space: function (x, y) { return []; },
    };
}
