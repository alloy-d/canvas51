function makeFont(width, height) {
    // Percentage to actual font width.
    var w = function (d) { return width * d / 100; }
    // Percentage to actual font height.
    var h = function (d) { return height * d / 100; }

    // Some random noise.
    var r = function (n) { return 1-Math.floor(Math.random()*3); }

    var translate = function (x, y) {
        return function (pair) {
            return [x + pair[0] + r(), y + pair[1] + r()];
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
                [0, h(20)],
                [0, h(40)],
                [0, h(60)],
                [0, h(80)],
                [0, h(100)],
                [w(25), h(48)],
                [w(50), h(48)],
                [w(75), h(48)],
                [w(100), 0],
                [w(100), h(20)],
                [w(100), h(40)],
                [w(100), h(60)],
                [w(100), h(80)],
                [w(100), h(100)],
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
