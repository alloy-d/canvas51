function drawText(id) {
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");

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

        context.font = "48px Penshurst";
        t = context.measureText("DASH (X) ! ! !").width;

        context.fillText("DASH (X) ! ! !", (width - t) / 2, height * 0.8);
        context.restore();

        if (!bangStarted) setTimeout(function(){drawStep(step+1);}, 50);
    }
    drawStep(0);
}

