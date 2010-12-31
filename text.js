function makeText() {
    var size = 48;

    return {
        draw: function () {
            if (dashStarted && size <= 30) return;
            var fillColor = "#cc";
            var t = Math.floor(Math.sin(FRAME/1.5) * 32.5);

            fillColor += Math.floor(32 + t/3).toString(16);
            fillColor += (180 + t).toString(16);

            context.save();
            context.fillStyle = fillColor;
            context.globalAlpha = 1 * (size - 30) / 18;

            context.font = +(size) + "px Penshurst";
            t = context.measureText("DASH (X) ! ! !").width;

            context.fillText("DASH (X) ! ! !", (WIDTH - t) / 2, HEIGHT * 0.8);
            context.restore();

            if (dashStarted && size > 30) size -= 2;
        },
    }
}

