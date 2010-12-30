function makeGround(canvasId) {
    canvas = document.getElementById(canvasId);
    context = canvas.getContext("2d");

    return {
        draw: function () {
            var width = window.innerWidth;
            var height = window.innerHeight;

            var ch = function (h) { return h * height / 1000; }
            var cw = function (w) { return w * width / 1000; }

            canvas.width = width;
            canvas.height = height;

            context.save();
            context.strokeStyle = "black";
            context.fillStyle = "black";
            context.moveTo(0, ch(590));
            context.quadraticCurveTo(cw(600), ch(570), width, ch(590));
            context.lineTo(width, ch(780));
            context.quadraticCurveTo(cw(920), ch(820), cw(900), ch(800));
            context.quadraticCurveTo(cw(880), ch(720), cw(740), ch(680));
            context.quadraticCurveTo(cw(480), ch(630), cw(120), ch(670));
            context.quadraticCurveTo(0      , ch(700), 0      , ch(720));
            context.stroke();
            context.fill();
            context.restore();
        },
    };
}
