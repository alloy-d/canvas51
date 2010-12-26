var Star = new Class({
    initialize: function(options) {
                    this.options = options;
                    this.x = options.x;
                    this.y = options.y;
                    this.brightness = options.brightness;
                    this.color = options.color;
                },
    draw: function(context) {
              context.save();
              context.fillStyle = this.color;
              context.beginPath();
              context.arc(this.x, this.y, this.brightness, 0, 2*Math.PI);
              context.fill();
              context.closePath();
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
    var i = 0, c = 0;
    var stars = [];
    var star;
    for (i = 0; i < 1000; i += 1) {
        c = Math.floor(Math.random() * 150);
        star = stars[stars.length] = new Star({
            x: Math.random() * width,
            y: Math.random() * height,
            brightness: Math.random() * Math.random() * 2,
            color: "#" + (105+c).toString(16) + (180).toString(16) + (255-c).toString(16),
        });

        star.draw(context);
    }
}

drawStars();
