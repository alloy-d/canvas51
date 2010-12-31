var Star = new Class({
    initialize: function(options) {
        this.options = options;
        this.x = options.x;
        this.y = options.y;
        this.brightness = options.brightness || 1;
        this.color = options.color || "white";

        this.pos = {
            x: 500,
            y: 500
        };

        this.speed = Math.random() / 10;
        if (this.speed < 0.05) this.speed += 0.03;

        this.dx = (this.x - this.pos.x) * this.speed;
        this.dy = (this.y - this.pos.y) * this.speed;
    },
    draw: function () {
        var x = cx(this.pos.x);
        var y = cy(this.pos.y);

        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(x, y, this.brightness, 0, 2*Math.PI, null);
        context.fill();
        context.closePath();
        context.restore();
        this.update();
    },
    update: function () {
        if (!(this.pos.x <= this.x && this.dx < 0) 
            && !(this.pos.x >= this.x && this.dx > 0)) {
                this.pos.x += this.dx;
                this.dx *= 0.95;
            }
        if (!(this.pos.y <= this.y && this.dy < 0)
            && !(this.pos.y >= this.y && this.dy > 0)) {
                this.pos.y += this.dy;
                this.dy *= 0.95;
            }
    }
});

function makeStarField(numStars, otherLocations) {
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
                star.draw();
            });
        },
    };
}

