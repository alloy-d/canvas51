var Star = new Class({
    initialize: function(options) {
        this.options = options;
        this.x = options.x;
        this.y = options.y;
        this.brightness = options.brightness || 1;
        this.color = options.color || "white";
    },
    draw: function(context, width, height, step) {
        var x = this.x * width / 1000;
        var y = this.y * height / 1000;
        if (typeof(step) === 'number') {
            x = width / 2 + (step / 100) * (x - width / 2);
            y = height / 2 + (step / 100) * (y - height / 2);
        }

        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(x, y, this.brightness, 0, 2*Math.PI, null);
        context.fill();
        context.closePath();
        context.restore();
    },
});

function makeStars(numStars, otherLocations) {
    var stars = [];
    var i = 0, c = 0, tmp, color;
    for (i = 0; i < numStars; i += 1) {
        c = Math.floor(Math.random() * 255);
        color = "#";
        tmp = c.toString(16);
        color += ((tmp.length === 1)?"0":"") + tmp;
        color += "80";
        tmp = (255-c).toString(16);
        color += ((tmp.length === 1)?"0":"") + tmp;

        if (otherLocations && i < otherLocations.length) {
            tmp = otherLocations[i];
            stars[stars.length] = new Star({
                x: tmp[0],
                y: tmp[1],
                brightness: 2,
                color: "#bbbbbb",
            });
        } else {
            stars[stars.length] = new Star({
                x: Math.random() * 1000,
                y: Math.random() * 1000,
                brightness: Math.random() * Math.random() * 2,
                color: color,
            });
        }
    }

    return {
        draw: function () {
            Array.each(stars, function (star) {
                star.draw(context, WIDTH, HEIGHT);
            });
        },
        bang: function(whenFinished) {
            function drawStep(step) {
                Array.each(stars, function(star) {
                    star.draw(context, WIDTH, HEIGHT, step);
                });

                if (step < 100) {
                    setTimeout(function(){drawStep(step+5);}, 5);
                } else {
                    whenFinished();
                }
            }
            drawStep(0);
        },
    };
}

