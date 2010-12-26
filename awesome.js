var Star = new Class({
    initialize: function(options) {
                    this.options = options;
                    this.x = options.x;
                    this.y = options.y;
                    this.brightness = options.brightness;
                    this.color = options.color;
                },
    draw: function(context, width, height) {
              var x = this.x * width / 1000;
              var y = this.y * height / 1000;

              context.save();
              context.fillStyle = this.color;
              context.beginPath();
              context.arc(x, y, this.brightness, 0, 2*Math.PI);
              context.fill();
              context.closePath();
              context.restore();
          },
});

var canvas = document.getElementById("awesome");
var context = canvas.getContext("2d");

function makeStarDrawer(numStars) {
    var stars = [];
    var i = 0, c = 0;
    for (i = 0; i < numStars; i += 1) {
        c = Math.floor(Math.random() * 150);
        stars[stars.length] = new Star({
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            brightness: Math.random() * Math.random() * 2,
            color: "#" + (105+c).toString(16) + (180).toString(16) + (255-c).toString(16),
        });
    }

    return function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        Array.each(stars, function(star) { star.draw(context, width, height) });
    }
}

drawStars = makeStarDrawer(1000);

window.addEvent('resize', drawStars);
window.addEvent('domready', drawStars);
