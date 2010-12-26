var Star = new Class({
    initialize: function(options) {
                    this.options = options;
                    this.x = options.x;
                    this.y = options.y;
                    this.brightness = options.brightness;
                },
    draw: function(context) {
              context.save();
              context.fillStyle = "white";
              context.fillRect(this.x, this.y, this.brightness, this.brightness);
              context.restore();
          },
});

var canvas = document.getElementById("awesome");
var context = canvas.getContext("2d");

function drawStars() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    var i = 0;
    var stars = [];
    var star;
    for (i = 0; i < 1000; i += 1) {
        star = stars[stars.length] = new Star({
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
            brightness: Math.floor(Math.random() * 4),
        });

        star.draw(context);
    }
}

drawStars();
