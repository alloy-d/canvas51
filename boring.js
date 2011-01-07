// Map from tenths of a percent to canvas coordinates.
var cx = function (x) { return x * WIDTH / 1000; };
var cy = function (y) { return y * HEIGHT / 1000; };

// Map polar coordinates to rectangular coordinates.
var rect = function (r, theta, cx, cy) {
    if (typeof(cx) !== "number" || typeof(cy) !== "number") {
        cx = 0;
        cy = 0;
    }
    return {
        x: Math.cos(theta) * r + cx,
        y: Math.sin(theta) * r + cy,
    };
};

