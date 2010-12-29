var TwinklingStar = new Class({
    Extends: Star,
    initialize: function(options) {
        this.parent(options);
        if (this.brightness < 4) this.brightness = 4;
        this.color = "#eeeeee";
        this.stepSeed = Math.random() * Math.PI;
    },
    draw: function(context, width, height, step) {
        var x = this.x * width / 1000;
        var y = this.y * height / 1000;
        var brightness = this.brightness;
        if (typeof(step) === 'number') {
            brightness += Math.sin(step + this.stepSeed);
        }

        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(x - brightness, y);
        context.quadraticCurveTo(x, y, x, y - brightness);
        context.quadraticCurveTo(x, y, x + brightness, y);
        context.quadraticCurveTo(x, y, x, y + brightness);
        context.quadraticCurveTo(x, y, x - brightness, y);
        context.fill();
        context.closePath();
        context.restore();
    }
});

function makeTwinkles(canvasId) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");
    var stars = [], locations = [];
    var i = 0;

    for (i = 0; i < 30; i++) {
        locations[locations.length] = [
            Math.random() * 1000,
            Math.random() * 1000,
        ];
    }

    stars = locations.map(function (coords) {
        return new TwinklingStar({
            x: coords[0],
            y: coords[1],
            brightness: Math.random() * 3 + 4,
        });
    });

    return {
        draw: function () {
            function drawStep(step) {
                var width = window.innerWidth;
                var height = window.innerHeight;

                canvas.width = width;
                canvas.height = height;

                Array.each(stars, function(star) {
                    star.draw(context, width, height, step);
                });

                setTimeout(function(){drawStep(step+0.3);}, 50);
            }
            drawStep(0);
        },
        locations: locations,
    };
}

