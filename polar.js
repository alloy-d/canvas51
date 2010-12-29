toCartesian = function (r, theta) {
    return {
        x: Math.cos(theta) * r,
        y: Math.sin(theta) * r,
    };
}

mapToCenter = function (r, theta, x, y) {
    var c = toCartesian(r, theta);
    return {
        x: x + c.x,
        y: y + c.y,
    };
}
