function makeFont(width, height) {
    // Percentage to actual font width.
    var w = function (d) { return width * d / 100; }
    // Percentage to actual font height.
    var h = function (d) { return height * d / 100; }

    // Some random noise.
    var r = function (n) { return 1-Math.floor(Math.random()*3); }
    // Add randomness to a pair.
    var rp = function (p) { return [p[0]+r(), p[1]+r()]; }

    return {
        A: function (x, y) { return []; },
        B: function (x, y) { return []; },
        D: function (x, y) { return []; },
        E: function (x, y) { return []; },
        H: function (x, y) {
            return [
                [x, y],
                [x, y + h(20)],
                [x, y + h(40)],
                [x, y + h(60)],
                [x, y + h(80)],
                [x, y + h(100)],
                [x + w(25), y + h(48)],
                [x + w(50), y + h(48)],
                [x + w(75), y + h(48)],
                [x + w(100), y],
                [x + w(100), y + h(20)],
                [x + w(100), y + h(40)],
                [x + w(100), y + h(60)],
                [x + w(100), y + h(80)],
                [x + w(100), y + h(100)],
            ].map(rp);
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
