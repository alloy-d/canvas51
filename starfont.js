function makeFont(width, height, sparsity) {
    return {
        A: function (x, y) {
            var cx = 0, i = 0, cy = 0;
            var f = [
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
            ];
            var points = [];

            while (cx <= width) {
                for (i = 0; i < f.length; i += 1) {
                    cy = f[i](cx);
                    if (cy !== null) points[points.length] = [x + cx, y + cy];
                }
                cx += sparsity;
            }

            return points;
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
