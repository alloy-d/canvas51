function makeBreakable(canvasId, centerX, centerY, radius) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");

    return {
        draw: function () {
            var width = window.innerWidth;
            var height = window.innerHeight;

            var canvasCenterX = width * (centerX / 1000);
            var canvasCenterY = height * (centerY / 1000);
            var canvasRadius = width * (radius / 1000);

            var polarPoints = [], points = [];
            var i = 0;

            var map = function (r, theta) {
                return mapToCenter(r, theta, canvasCenterX, canvasCenterY);
            }

            canvas.width = width;
            canvas.height = height;

            for (i = 0; i < 5; i += 1) {
                polarPoints[2*i] = {
                    r: canvasRadius,
                    theta: 2 * i * Math.PI / 5 - Math.PI / 2
                };
                polarPoints[2*i+1] = {
                    r: canvasRadius * 0.5,
                    theta: 2 * i * Math.PI / 5 - Math.PI * 3 / 10
                };
            }

            points = Array.map(polarPoints, function (point) {
                return map(point.r, point.theta);
            });

            context.save();
            context.moveTo(canvasCenterX, canvasCenterY);
            context.strokeStyle = "white";

            context.beginPath();
            Array.each(points, function (point) {
                context.lineTo(point.x, point.y);
            });
            context.lineTo(points[0].x, points[0].y);
            context.stroke();
            context.closePath();
            context.restore();
        },
    };
}


