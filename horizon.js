function makeHorizon() {
    return {
        draw: function () {
            var gradient;

            context.save();
            gradient = context.createLinearGradient(0, 0, 0, HEIGHT);
            gradient.addColorStop(0.3, "#000000");
            gradient.addColorStop(0.8, "#000022");
            gradient.addColorStop(1, "#000044");
            context.fillStyle = gradient;
            context.fillRect(0, 0, WIDTH, HEIGHT);
            context.restore();
        },
    };
}

