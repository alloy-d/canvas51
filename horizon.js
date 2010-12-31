function makeHorizon() {
    var gradient;

    return {
        resize: function () {
            gradient = context.createLinearGradient(0, 0, 0, HEIGHT);
            gradient.addColorStop(0.3, "#000000");
            gradient.addColorStop(0.8, "#000022");
            gradient.addColorStop(1, "#000044");
        },
        draw: function () {
            context.save();
            context.fillStyle = gradient;
            context.fillRect(0, 0, WIDTH, HEIGHT);
            context.restore();
        },
    };
}

