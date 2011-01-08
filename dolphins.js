var makeDolphin = function () {
    var colors = ["red", "green", "blue", "yellow", "purple"];
    var hatColor = colors[wr(colors.length)];
    var puffColor = colors[wr(colors.length)];
    while (puffColor === hatColor) puffColor = colors[wr(colors.length)];
    var dim = { w: canvas.width, h: canvas.height };
    if (dim.h > dim.w * 0.3) {
        dim.h = dim.w * 0.3;
    } else {
        dim.w = dim.h / 0.3;
    }

    var cx = function (x) { return x * (dim.w / 1000); }
    var cy = function (y) { return y * (dim.h / 1000); }

    return {
        resize: function () {
            dim.w = canvas.width;
            dim.h = canvas.height;
            if (dim.h > dim.w * 0.3) {
                dim.h = dim.w * 0.3;
            } else {
                dim.w = dim.h / 0.3;
            }
            //dim.w = 100; dim.h = 30;
        },
        draw: function () {
            context.save();

            context.fillStyle = "#aabbcc";
            // The left flipper.
            context.beginPath();
            context.moveTo(cx(600), cy(720));
            context.quadraticCurveTo(cx(600), cy(800),  // back of flipper
                                     cx(560), cy(900));
            context.bezierCurveTo(cx(630), cy(850),     // front of flipper
                                  cx(640), cy(830),
                                  cx(660), cy(720));
            context.fill();
            context.closePath();

            context.fillStyle = "#f0f0ff";
            // The belly.
            context.beginPath();
            context.moveTo(cx(300), cy(650));
            context.bezierCurveTo(cx(620), cy(920),     // belly
                                  cx(660), cy(650),
                                  cx(920), cy(740));
            context.quadraticCurveTo(cx(930), cy(750),
                                     cx(940), cy(740));
            context.lineTo(cx(940), cy(600));           // invisible
            context.lineTo(cx(300), cy(500));
            context.fill();
            context.closePath();

            context.fillStyle = "#aabbcc";
            // The body.
            context.beginPath();
            context.moveTo(cx(940), cy(600));
            context.bezierCurveTo(cx(900), cy(100),     // back
                                  cx(400), cy(160),
                                  cx(100), cy(400));
            context.quadraticCurveTo(cx(70), cy(170),   // top of tailfin
                                     cx(20), cy(150));
            context.quadraticCurveTo(cx(40), cy(400),   // back of tailfin
                                     cx(10), cy(830));
            context.quadraticCurveTo(cx(70), cy(800),   // bottom of tailfin
                                     cx(100), cy(600));
            context.quadraticCurveTo(cx(200), cy(550),  // bottom of tail
                                     cx(300), cy(650));
            context.quadraticCurveTo(cx(450), cy(600),  // grey above belly
                                     cx(550), cy(650));
            context.quadraticCurveTo(cx(550), cy(730),  // back of flipper
                                     cx(510), cy(820));
            context.bezierCurveTo(cx(600), cy(780),     // front of flipper
                                  cx(590), cy(760),
                                  cx(630), cy(650));
            context.quadraticCurveTo(cx(800), cy(600),  // flipper to nose
                                     cx(940), cy(740));
            context.bezierCurveTo(cx(980), cy(720),     // nose
                                  cx(1000), cy(720),
                                  cx(940), cy(600));
            context.fill();
            context.closePath();

            // The back fin.
            context.beginPath();
            context.moveTo(cx(470), cy(280));
            context.quadraticCurveTo(cx(420), cy(50),   // front of fin
                                     cx(320), cy(60));
            context.quadraticCurveTo(cx(380), cy(180),  // back of fin
                                     cx(360), cy(300));
            context.fill();
            context.closePath();

            // Shininess!
            context.fillStyle = "#dde0ee";
            context.beginPath();
            context.moveTo(cx(840), cy(440));
            context.quadraticCurveTo(cx(730), cy(290),
                                     cx(510), cy(320));
            context.quadraticCurveTo(cx(700), cy(320),
                                     cx(840), cy(440));
            context.fill();
            context.closePath();

            // Behind the eye.
            context.fillStyle = "#dde0ee";
            context.beginPath();
            context.arc(cx(849), cy(596), cx(10), 0, 2*Math.PI, false);
            context.fill();
            context.closePath();

            // The eye.
            context.fillStyle = "#111122";
            context.beginPath();
            context.arc(cx(850), cy(600), cx(8), 0, 2*Math.PI, false);
            context.fill();
            context.closePath();

            // PARTY HAT!
            context.fillStyle = hatColor;
            context.beginPath();
            context.moveTo(cx(830), cy(322));
            context.quadraticCurveTo(cx(850), cy(410),
                                     cx(890), cy(407));
            context.lineTo(cx(896), cy(100));
            context.lineTo(cx(830), cy(322));
            context.fill();
            context.closePath();

            context.fillStyle = puffColor;
            context.beginPath();
            context.arc(cx(896), cy(100), cx(9), 0, 2*Math.PI);
            context.fill();
            context.closePath();

            context.restore();
        },
    };
};

