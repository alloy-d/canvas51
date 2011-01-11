var Dolphin = new Class({
    initialize: function (options) {
        var colors = ["red", "green", "blue", "yellow", "purple"];
        this.pos = {
            x: options.x,
            y: options.y,
        };
        this.rotations = options.rotations;
        this.dx = options.dx || 10;
        this.dy = options.dy || -60;
        this.hatColor = colors[wr(colors.length)];
        this.puffColor = colors[wr(colors.length)];
        while (this.puffColor === this.hatColor) {
            this.puffColor = colors[wr(colors.length)];
        }

        if (typeof(options.numFireworks) === "number") {
            this.numFireworks = options.numFireworks;
        } else {
            this.numFireworks = 2 + wr(2);
        }

        this.angle = {
            start: -Math.PI/2,
            end: Math.PI/2,
        };
        this.t = {
            start: 0,
            peak: 100,
            end: 100,
            cur: 0,
        };

        this.canvas = document.createElement("canvas");
        this.canvas.width = options.width || 150;
        this.canvas.height = options.height || 45;
        this.context = this.canvas.getContext("2d");
    },
    draw: function () {
        var context = this.context;
        var width = this.canvas.width;
        var height = this.canvas.height;
        var cw = function (w) { return w * (width / 1000); };
        var cx = function (x) { return x * (width / 1000); };
        if (this.dx < 0) cx = function (x) { return (1000-x) * (width / 1000); };
        var cy = function (y) { return y * (height / 1000); };

        context.save();

        context.fillStyle = "#aabbcc";
        // The left flipper.
        context.beginPath();
        context.moveTo(cx(600), cy(720));
        context.quadraticCurveTo(cx(600), cy(800),  // back of flipper
                                 cx(560), cy(900));
        context.bezierCurveTo(cx(630), cy(850),     // front of flipper
                              cx(640), cy(830),
                              cx(660), cy(720));
        context.fill();
        context.closePath();

        context.fillStyle = "#f0f0ff";
        // The belly.
        context.beginPath();
        context.moveTo(cx(300), cy(650));
        context.bezierCurveTo(cx(620), cy(920),     // belly
                              cx(660), cy(650),
                              cx(920), cy(740));
        context.quadraticCurveTo(cx(930), cy(750),
                                 cx(940), cy(740));
        context.lineTo(cx(940), cy(600));           // invisible
        context.lineTo(cx(300), cy(500));
        context.fill();
        context.closePath();

        context.fillStyle = "#aabbcc";
        // The body.
        context.beginPath();
        context.moveTo(cx(940), cy(600));
        context.bezierCurveTo(cx(900), cy(100),     // back
                              cx(400), cy(160),
                              cx(100), cy(400));
        context.quadraticCurveTo(cx(70), cy(170),   // top of tailfin
                                 cx(20), cy(150));
        context.quadraticCurveTo(cx(40), cy(400),   // back of tailfin
                                 cx(10), cy(830));
        context.quadraticCurveTo(cx(70), cy(800),   // bottom of tailfin
                                 cx(100), cy(600));
        context.quadraticCurveTo(cx(200), cy(550),  // bottom of tail
                                 cx(300), cy(650));
        context.quadraticCurveTo(cx(450), cy(600),  // grey above belly
                                 cx(550), cy(650));
        context.quadraticCurveTo(cx(550), cy(730),  // back of flipper
                                 cx(510), cy(820));
        context.bezierCurveTo(cx(600), cy(780),     // front of flipper
                              cx(590), cy(760),
                              cx(630), cy(650));
        context.quadraticCurveTo(cx(800), cy(600),  // flipper to nose
                                 cx(940), cy(740));
        context.bezierCurveTo(cx(980), cy(720),     // nose
                              cx(1000), cy(720),
                              cx(940), cy(600));
        context.fill();
        context.closePath();

        // The back fin.
        context.beginPath();
        context.moveTo(cx(470), cy(280));
        context.quadraticCurveTo(cx(420), cy(50),   // front of fin
                                 cx(320), cy(60));
        context.quadraticCurveTo(cx(380), cy(180),  // back of fin
                                 cx(360), cy(300));
        context.fill();
        context.closePath();

        // Shininess!
        context.fillStyle = "#dde0ee";
        context.beginPath();
        context.moveTo(cx(840), cy(440));
        context.quadraticCurveTo(cx(730), cy(290),
                                 cx(510), cy(320));
        context.quadraticCurveTo(cx(700), cy(320),
                                 cx(840), cy(440));
        context.fill();
        context.closePath();

        // Behind the eye.
        context.fillStyle = "#dde0ee";
        context.beginPath();
        context.arc(cx(849), cy(596), cw(10), 0, 2*Math.PI, false);
        context.fill();
        context.closePath();

        // The eye.
        context.fillStyle = "#111122";
        context.beginPath();
        context.arc(cx(850), cy(600), cw(8), 0, 2*Math.PI, false);
        context.fill();
        context.closePath();

        // PARTY HAT!
        context.fillStyle = this.hatColor;
        context.beginPath();
        context.moveTo(cx(830), cy(322));
        context.quadraticCurveTo(cx(850), cy(410),
                                 cx(890), cy(407));
        context.lineTo(cx(896), cy(100));
        context.lineTo(cx(830), cy(322));
        context.fill();
        context.closePath();

        context.fillStyle = this.puffColor;
        context.beginPath();
        context.arc(cx(896), cy(100), cw(9), 0, 2*Math.PI);
        context.fill();
        context.closePath();

        context.restore();
    },
    place: function () {
        var angle = this.angle.start * (this.t.end-this.t.cur)/this.t.end;
        angle += this.angle.end * this.t.cur/this.t.end;
        if (this.dx > 0) angle += (this.t.cur/this.t.end) * Math.PI * this.rotations;
        if (this.dx < 0) angle += (this.t.cur/this.t.end) * Math.PI * this.rotations;
        if (this.pos.y > 1100 && this.dy > 0) return false;

        context.save();
        context.translate(cx(this.pos.x), cy(this.pos.y));
        context.rotate(angle);
        context.drawImage(this.canvas, -this.canvas.width/2, -this.canvas.height/2);
        context.restore();

        if (this.pos.y > 1000 && this.pos.y + this.dy <= 1000) {
            this.t.cur = 0;
            this.t.peak = Math.floor(-this.dy / 3.8);
            this.t.end = this.t.peak * 2;
            this.angle.start = Math.atan(this.dy / this.dx);
            this.angle.end = this.rotations * Math.PI - this.angle.start;
        }

        this.pos.x += this.dx;
        this.pos.y += this.dy;
        this.dy += 3.8;
        if (this.t.cur < this.t.end) this.t.cur += 1;

        if (this.numFireworks > 0 && 
            (this.t.cur === Math.floor(this.t.end / 3) ||
            (this.numFireworks === 3 && this.t.cur === this.t.peak) ||
            this.t.cur === Math.ceil(2*this.t.end/3))) {
            fireworks.add(this.pos.x, this.pos.y);
        }
        return true;
    },
});

var makeDolphins = function () {
    var dolphins = [];
    return {
        add: function (x) {
            var rdy = Math.random() * 30;
            var dolphin = new Dolphin({
                x: x,
                y: 1100,
                dx: (x>500)?((0-x)/40):(1000-x)/40,
                dy: -50 - rdy,
                rotations: wr(Math.ceil(rdy/7)),
            });
            dolphin.draw();
            dolphins[dolphins.length] = dolphin;
        },
        addShouter: function (x) {
            var dolphin = new Dolphin({
                x: x,
                y: 1100,
                dx: 5,
                dy: -40,
                rotations: 0,
                numFireworks: 0,
            });
            dolphin.draw();
            dolphins[dolphins.length] = dolphin;
        },
        draw: function () {
            dolphins = dolphins.filter(function (d) { return d.place(); });
        },
    };
};

