var TwinklingStar = new Class({
    Extends: Star,
    initialize: function(options) {
        this.parent(options);
        if (this.brightness < 4) this.brightness = 4;
        this.color = "#eeeeee";
        this.stepSeed = Math.random() * Math.PI;
    },
    draw: function() {
        var x = cx(this.pos.x);
        var y = cy(this.pos.y);
        var brightness = this.brightness;
        brightness += Math.sin(FRAME * 0.3 + this.stepSeed);

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
        this.update();
    },
});

function makeTwinkles(locations) {
    var stars = [];
    var i = 0;

    stars = locations.map(function (coords) {
        return new TwinklingStar({
            x: coords[0],
            y: coords[1],
            brightness: Math.random() * 3 + 4,
        });
    });

    return {
        draw: function () {
            Array.each(stars, function(star) {
                star.draw();
            });
        },
        locations: locations,
    };
}

