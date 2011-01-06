function makeFont(width, height) {
    // Percentage to actual font width.
    var w = function (d) { return width * d / 100; }
    // Percentage to actual font height.
    var h = function (d) { return height * d / 100; }

    // Some random noise.
    var r = function (n) { return 1-Math.floor(Math.random()*3); }

    var translate = function (x, y) {
        return function (pair) {
            return [x + w(pair[0]) + r(), y + h(pair[1]) + r()];
        }
    };

    return {
        A: function (x, y) { return []; },
        B: function (x, y) { return []; },
        D: function (x, y) { return []; },
        E: function (x, y) { return []; },
        H: function (x, y) {
            return [
                [0, 0],
                [0, 20],
                [0, 40],
                [0, 60],
                [0, 80],
                [0, 100],
                [25, 48],
                [50, 48],
                [75, 48],
                [100, 0],
                [100, 20],
                [100, 40],
                [100, 60],
                [100, 80],
                [100, 100],
            ].map(translate(x, y));
        },
        I: function (x, y) { return []; },
        O: function (x, y) { return []; },
        P: function (x, y) { return []; },
        R: function (x, y) { return []; },
        S: function (x, y) { return []; },
        T: function (x, y) { return []; },
        Y: function (x, y) { return []; },
        comma: function (x, y) { return []; },
        space: function (x, y) { return []; },
    };
}
