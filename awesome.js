var Star = new Class({
    initialize: function(options) {
                    this.options = options;
                    this.x = options.x;
                    this.y = options.y;
                    this.brightness = options.brightness || 1;
                    this.color = options.color || "white";
                },
    draw: function(context, width, height, step) {
              var x = this.x * width / 1000;
              var y = this.y * height / 1000;
              if (typeof(step) === 'number') {
                  x = width / 2 + (step / 100) * (x - width / 2);
                  y = height / 2 + (step / 100) * (y - height / 2);
              }

              context.save();
              context.fillStyle = this.color;
              context.beginPath();
              context.arc(x, y, this.brightness, 0, 2*Math.PI);
              context.fill();
              context.closePath();
              context.restore();
          },
});

var TwinklingStar = new Class({
    Extends: Star,
    initialize: function(options) {
                    this.parent(options);
                    if (this.brightness < 4) this.brightness = 4;
                    this.color = "#eeeeee";
                    this.stepSeed = Math.random() * Math.PI;
                },
    draw: function(context, width, height, step) {
              var x = this.x * width / 1000;
              var y = this.y * height / 1000;
              var brightness = this.brightness;
              if (typeof(step) === 'number') {
                  brightness += Math.sin(step + this.stepSeed);
              }

              context.save();
              context.fillStyle = this.color;
              context.beginPath();
              context.moveTo(x - brightness, y);
              context.quadraticCurveTo(x, y, x, y - brightness);
              context.quadraticCurveTo(x, y, x + brightness, y);
              context.quadraticCurveTo(x, y, x, y + brightness);
              context.quadraticCurveTo(x, y, x - brightness, y);
              context.fill();
              context.closePath();
              context.restore();
          }
});


var canvas = document.getElementById("awesome");
var context = canvas.getContext("2d");

function makeStarDrawers(numStars) {
    var stars = [];
    var i = 0, c = 0;
    for (i = 0; i < numStars; i += 1) {
        c = Math.floor(17 + Math.random() * 238);
        stars[stars.length] = new Star({
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            brightness: Math.random() * Math.random() * 2,
            color: "#" + (000+c).toString(16) + (128).toString(16) + (255-c).toString(16),
        });
    }

    function drawStatic () {
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        Array.each(stars, function(star){ star.draw(context, width, height); });
    }

    return {
        draw: drawStatic,
        bang: function() {
            function drawStep(step) {
                var width = window.innerWidth;
                var height = window.innerHeight;
                context.clearRect(0, 0, width, height);
                if (step === 0) {
                    canvas.width = width;
                    canvas.height = height;
                }

                Array.each(stars, function(star) {
                    star.draw(context, width, height, step);
                });

                if (step < 100) {
                    setTimeout(function(){drawStep(step+5);}, 5);
                } else {
                    window.addEvent('resize', drawStatic);
                }
            }
            drawStep(0);
        },
    };
}

function makeNameDrawers() {
    var stars = [];
    var i = 0;

    for (i = 0; i < 10; i += 1) {
        stars[stars.length] = new TwinklingStar({
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            brightness: Math.random() * 3 + 4,
        });
    }

    return {
        draw: function () {
            function drawStep(step) {
                var width = window.innerWidth;
                var height = window.innerHeight;
                context.clearRect(0, 0, width, height);

                Array.each(stars, function(star) {
                    star.draw(context, width, height, step);
                });

                setTimeout(function(){drawStep(step+0.3);}, 50);
            }
            drawStep(0);
      },
    };
}


drawers = makeStarDrawers(1000);
nameDrawers = makeNameDrawers();
setTimeout(nameDrawers['draw'], 1000);

window.addEvent('domready', drawers["bang"]);
