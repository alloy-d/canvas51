function makePlatform() {
    return {
        draw: function () {
            context.save();
            context.strokeStyle = "black";
            context.fillStyle = "black";

            context.beginPath();
            context.moveTo(0, cy(590));
            context.quadraticCurveTo(cx(600), cy(570), WIDTH, cy(590));
            context.lineTo(WIDTH, cy(780));
            context.quadraticCurveTo(cx(920), cy(820), cx(900), cy(800));
            context.quadraticCurveTo(cx(880), cy(720), cx(740), cy(680));
            context.quadraticCurveTo(cx(480), cy(630), cx(120), cy(670));
            context.quadraticCurveTo(0      , cy(700), 0      , cy(720));
            context.stroke();
            context.fill();
            context.closePath();
            context.restore();
        },
    };
}
