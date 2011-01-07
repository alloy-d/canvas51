var Firework = new Class({
    initialize: function (options) {
        this.options = options;
        this.x = options.x;
        this.y = options.y;
        this.color = [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
        ][Math.floor(Math.random() * 6)];
        this.step = 0;
        this.r = 40 + Math.random() * 40;
        this.points = 12 + Math.random() * 25;
        this.points = this.points - (this.points%2);
    },
    draw: function () {
        var i = 0, theta, r, p, tmp;
        if (this.step === 20) return;
        context.save();
        context.fillStyle = this.color;
        if (this.step > 10) context.globalAlpha = 1.0 - ((this.step)%10)/10.0;
        for (i = 0; i < this.points; i += 1) {
            theta = 2*Math.PI/this.points * i;
            p = rect(this.r * (this.step/5), theta, cx(this.x), cy(this.y));
            context.beginPath();

            context.arc(p.x, p.y, 3, 0, 2 * Math.PI, null);
            context.fill();
            context.closePath();
        }
        context.restore();
        this.step += 1;
    },
});

var makeFireworks = function () {
    // Fireworks we're displaying right now.
    var fireworks = [];

    return {
        add: function (x, y) {
            fireworks[fireworks.length] = new Firework({x: x, y: y});
        },
        draw: function () {
            fireworks.each(function (f) { f.draw(); });
        },
    };
};
