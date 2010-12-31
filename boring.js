// Map from tenths of a percent to canvas coordinates.
var ch = function (h) { return h * HEIGHT / 1000; };
var cw = function (w) { return w * WIDTH / 1000; };

// Map polar coordinates to rectangular coordinates.
// TODO: account for the fact that the y-axis is flipped on a canvas.
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

