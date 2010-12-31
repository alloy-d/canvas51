function makeText(canvasId) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");

    var size = 48

    function drawStep(step) {
        var width = window.innerWidth;
        var height = window.innerHeight;

        var fillColor = "#cc";
        var t = Math.floor(Math.sin(step) * 32.5);

        fillColor += Math.floor(32 + t/3).toString(16);
        fillColor += (180 + t).toString(16);

        canvas.width = width;
        canvas.height = height;

        context.save();
        context.fillStyle = fillColor;
        context.globalAlpha = 1 * (size - 30) / 18;

        context.font = +(size) + "px Penshurst";
        t = context.measureText("DASH (X) ! ! !").width;

        context.fillText("DASH (X) ! ! !", (width - t) / 2, height * 0.8);
        context.restore();

        if (!bangStarted) {
            setTimeout(function(){drawStep(step+1);}, 50);
        } else if (bangStarted && size > 30) {
            size -= 1;
            setTimeout(function(){drawStep(step+1);}, 5);
        } else {
            context.clearRect(0, 0, width, height);
        }
    }

    return {
        draw: function () { drawStep(0); },
    }
}

