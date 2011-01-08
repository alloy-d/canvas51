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
        this.a = 40 + Math.random() * 80;   // semim(aj|in)or axis
        this.b = 40 + Math.random() * 80;   // semim(in|aj)or axis
        this.angle = Math.random() * Math.PI;
        this.points = 12 + Math.random() * 25;
        this.points = this.points - (this.points%2);
    },
    draw: function () {
        var i = 0, theta, r, p, beta, alpha;
        var cosbeta, cosalpha, sinbeta, sinalpha;
        if (this.step === 20) return false;

        beta = this.angle;
        sinbeta = Math.sin(beta);
        cosbeta = Math.cos(beta);

        context.save();
        context.fillStyle = this.color;
        if (this.step > 10) context.globalAlpha = 1.0 - ((this.step)%10)/10.0;
        for (i = 0; i < this.points; i += 1) {
            alpha = (i/this.points) * Math.PI * 2;
            sinalpha = Math.sin(alpha);
            cosalpha = Math.cos(alpha);

            p = {
                x: cx(this.x) + (this.a * cosalpha * cosbeta - this.b * sinalpha * sinbeta) * this.step/8,
                y: cy(this.y) + (this.a * cosalpha * sinbeta + this.b * sinalpha * cosbeta) * this.step/8,
            };
            context.beginPath();

            context.arc(p.x, p.y, 3, 0, 2 * Math.PI, null);
            context.fill();
            context.closePath();
        }
        context.restore();
        this.step += 1;
        return true;
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
            fireworks = fireworks.filter(function (f) { return f.draw(); });
        },
    };
};
