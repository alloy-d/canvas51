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
              context.arc(x, y, this.brightness, 0, 2*Math.PI, null);
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


var bangCanvas = document.getElementById("bigbang");
var bangContext = bangCanvas.getContext("2d");

var nameCanvas = document.getElementById("twinkling");
var nameContext = nameCanvas.getContext("2d");

var horizonCanvas = document.getElementById("horizon");
var horizonContext = horizonCanvas.getContext("2d");

var bangStarted = false;

function makeStarDrawers(numStars, otherLocations) {
    var stars = [];
    var i = 0, c = 0, tmp, color;
    for (i = 0; i < numStars; i += 1) {
        c = Math.floor(Math.random() * 255);
        color = "#";
        tmp = c.toString(16);
        color += ((tmp.length === 1)?"0":"") + tmp;
        color += "80";
        tmp = (255-c).toString(16);
        color += ((tmp.length === 1)?"0":"") + tmp;
        
        if (i < otherLocations.length) {
            tmp = otherLocations[i];
            stars[stars.length] = new Star({
                x: tmp[0],
                y: tmp[1],
                brightness: 2,
                color: "#bbbbbb",
            });
        } else {
            stars[stars.length] = new Star({
                x: Math.random() * 1000,
                y: Math.random() * 1000,
                brightness: Math.random() * Math.random() * 2,
                color: color,
            });
        }
    }

    function drawStatic () {
        var width = window.innerWidth;
        var height = window.innerHeight;
        bangCanvas.width = width;
        bangCanvas.height = height;

        Array.each(stars, function(star){ star.draw(bangContext, width, height, null); });
    }

    return {
        draw: drawStatic,
        bang: function(whenFinished) {
            function drawStep(step) {
                var width = window.innerWidth;
                var height = window.innerHeight;
                if (step === 0) {
                    bangCanvas.width = width;
                    bangCanvas.height = height;
                }
                bangContext.clearRect(0, 0, width, height);

                Array.each(stars, function(star) {
                    star.draw(bangContext, width, height, step);
                });

                if (step < 100) {
                    setTimeout(function(){drawStep(step+5);}, 5);
                } else {
                    whenFinished();
                }
            }
            drawStep(0);
        },
    };
}

function makeNameDrawers() {
    var stars = [], locations = [];
    var i = 0;

    for (i = 0; i < 30; i++) {
        locations[locations.length] = [
            Math.random() * 1000,
            Math.random() * 1000,
        ];
    }

    stars = locations.map(function (coords) {
        return new TwinklingStar({
            x: coords[0],
            y: coords[1],
            brightness: Math.random() * 3 + 4,
        });
    });

    return {
        draw: function () {
            function drawStep(step) {
                var width = window.innerWidth;
                var height = window.innerHeight;

                nameCanvas.width = width;
                nameCanvas.height = height;

                Array.each(stars, function(star) {
                    star.draw(nameContext, width, height, step);
                });

                setTimeout(function(){drawStep(step+0.3);}, 50);
            }
            drawStep(0);
      },
      locations: locations,
    };
}

function drawDash() {
    function drawDashStep(step) {
        var width = window.innerWidth;
        var height = window.innerHeight;

        var fillColor = "#cc";
        var t = Math.floor(Math.sin(step) * 32.5);

        fillColor += Math.floor(32 + t/3).toString(16);
        fillColor += (180 + t).toString(16);

        bangCanvas.width = width;
        bangCanvas.height = height;

        bangContext.save();
        bangContext.fillStyle = fillColor;

        bangContext.font = "48px Penshurst";
        t = bangContext.measureText("DASH (X)!!!").width;

        bangContext.fillText("DASH (X)!!!", (width - t) / 2, height * 0.8);
        bangContext.restore();

        if (!bangStarted) setTimeout(function(){drawDashStep(step+1);}, 50);
    }
    drawDashStep(0);
}

function drawHorizon() {
    var gradient;
    var width = window.innerWidth;
    var height = window.innerHeight;

    horizonCanvas.width = width;
    horizonCanvas.height = height;

    horizonContext.save();
    gradient = horizonContext.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0.3, "#000000");
    gradient.addColorStop(0.8, "#000022");
    gradient.addColorStop(1, "#000044");
    horizonContext.fillStyle = gradient;
    horizonContext.fillRect(0, 0, width, height);
    horizonContext.restore();
}



nameDrawers = makeNameDrawers();
drawers = makeStarDrawers(1000, nameDrawers["locations"]);


window.addEvent('load', drawHorizon);
window.addEvent('resize', drawHorizon);
window.addEvent('load', drawDash);

window.addEvent('keydown', function (event) {
    if (bangStarted) return;
    if (event.key === 'x') {
        bangStarted = true;
        drawers["bang"](function () {
            nameDrawers['draw']();
            window.addEvent('resize', drawers['draw']);
        });
    }
});

