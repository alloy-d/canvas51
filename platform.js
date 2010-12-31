function makePlatform() {
    return {
        draw: function () {
            context.save();
            context.strokeStyle = "black";
            context.fillStyle = "black";
            context.beginPath();
            context.moveTo(0, ch(590));
            context.quadraticCurveTo(cw(600), ch(570), WIDTH, ch(590));
            context.lineTo(WIDTH, ch(780));
            context.quadraticCurveTo(cw(920), ch(820), cw(900), ch(800));
            context.quadraticCurveTo(cw(880), ch(720), cw(740), ch(680));
            context.quadraticCurveTo(cw(480), ch(630), cw(120), ch(670));
            context.quadraticCurveTo(0      , ch(700), 0      , ch(720));
            context.stroke();
            context.fill();
            context.closePath();
            context.restore();
        },
    };
}
