function makeHorizonDrawer(id) {
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");

    return {
        draw: function () {
            var gradient;
            var width = window.innerWidth;
            var height = window.innerHeight;

            canvas.width = width;
            canvas.height = height;

            context.save();
            gradient = context.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0.3, "#000000");
            gradient.addColorStop(0.8, "#000022");
            gradient.addColorStop(1, "#000044");
            context.fillStyle = gradient;
            context.fillRect(0, 0, width, height);
            context.restore();
        },
    };
}

