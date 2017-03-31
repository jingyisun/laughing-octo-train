var num = 10;
var sw = 5;
var r = 0;
var rs;

var centerVector, mouseVector;
var vector, angleRotate;
var d, angleArea;
var dia, rad;
var low, high;

var startAngle = 0;


var params = {
  swipe: false,
  rotation: false,
  horizontal: true,

  debug: false,
  low: 60,
  high: 90,
  angleVelLow: 0.2,
  angleVelHigh: 0.2,

}

var gui = new dat.gui.GUI();
gui.add(params, 'swipe');
gui.add(params, 'rotation');
gui.add(params, 'horizontal');
gui.add(params, 'angleVelLow').min(0).max(5).step(0.1);
gui.add(params, 'angleVelHigh').min(0).max(5).step(0.1);
gui.add(params, 'debug');
gui.add(params, 'low').min(0).max(180).step(10);
gui.add(params, 'high').min(0).max(180).step(10);

function setup() {
  background('#13122F');
  createCanvas(800, 600);
  noFill();
  rs = random(85);
  strokeWeight(sw);
  strokeCap(SQUARE);
}

function draw() {

  background('#13122F');
  if(!params.horizontal){
  randomSeed(rs);
  }
  
  centerVector = createVector(width / 2, height / 2);
  mouseVector = createVector(mouseX, mouseY);
  vector = p5.Vector.sub(mouseVector, centerVector);
  angleRotate = vector.heading();

  d = dist(centerVector.x, centerVector.y, mouseVector.x, centerVector.y);
  angleArea = acos(d / 100);

  for (var i = 0; i < 4; i++) {
    arcs(width / 2, height / 2);
  }


  stroke(79, 131, 170);
  noFill();
  ellipse(centerVector.x, centerVector.y, 200, 200);


  if (params.swipe) {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100) {
      push();
      stroke(255);
      strokeWeight(1);
      line(mouseX, 150, mouseX, 450);
      pop();
    }
    if (mouseX >= width / 2) {
      push();
      fill(79, 131, 170);
      stroke(79, 131, 170);
      strokeWeight(5);
      if (!params.debug) {
        if (angleArea != 0) {
          arc(centerVector.x, centerVector.y, 200, 200, -angleArea, angleArea, OPEN);
        }
      }
      pop();
    } else if (mouseX < width / 2) {
      push();
      fill(79, 131, 170);
      stroke(79, 131, 170);
      strokeWeight(5);
      if (!params.debug) {
        if (angleArea != 0) {
          arc(centerVector.x, centerVector.y, 200, 200, PI + angleArea, PI - angleArea, OPEN);
        }
      }
      pop();
    }
    if (mouseX <= width / 2 - 100) {
      fill(79, 131, 170);
      stroke(79, 131, 170);
      strokeWeight(5);
      if (!params.debug) {
        ellipse(centerVector.x, centerVector.y, 200, 200);
      }
    }

  } else if (params.rotation) {
    push();
    translate(width / 2, height / 2);
    stroke(255);
    strokeWeight(1);
    rotate(angleRotate);
    line(-150, 0, 150, 0);
    stroke(79, 131, 170);
    fill(79, 131, 170);
    if (!params.debug) {
      arc(0, 0, 200, 200, PI, -PI, OPEN);
    }
    pop();
  } else if (params.horizontal) {
    horizontal();
  }

}

function arcs(x, y) {
  push();
  translate(x, y);
  if (params.rotation) {
    rotate(angleRotate);
  }
  for (var i = 0; i < num; i++) {
    var to = color(82, 186, 181);
    var from = color(79, 131, 170);
    var lerpAmount = 1.0 / num * i;
    var Ccolor = lerpColor(from, to, lerpAmount);
    stroke(Ccolor);

    var dia = 200 - 20 * i;
    var rad = dia / 2;
    var angleStart = acos(d / rad);

    if (params.swipe) {
      if (d > rad) {
        var start = random(PI / 2);
        rotate(r / 3);
      } else {
        var start = angleStart ;//- PI / 20;
      }
      var end = start + random(PI / 5, PI / 2);
      var scal = map(sin(r + TWO_PI / num * i), -1, 1, 1.5, 2.8);
    }
    if (params.rotation) {
      var start = 0;

      if (params.debug) {
        low = radians(params.low);
        high = radians(params.high);
      } else {
        low = PI / 3;
        high = PI / 2;
      }
      var end = start + random(low, high);
      var scal = map(sin(r + TWO_PI / num * i), -1, 1, 1.2, 2.5);
    }
    arc(0, 0, dia, dia, start, end * scal);
  }
  r += .015;
  pop();
}

function horizontal() {
  startAngle += 0.02;
  var angle = startAngle;
  d = dist(width / 2, height / 2, mouseX, height / 2);

  for (var y = -100; y < 100; y += 3) {
    var xmax = sqrt(sq(100) - sq(y));
    var left = -xmax + 5;
    var right = xmax - 5;
    if (xmax > d) {
      right = d;
    }
    var _x = map(sin(angle), -1, 1, left, right);
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(79, 131, 170);
    ellipse(_x, y, 3, 3);
    pop();
    angle += random(params.angleVelLow, params.angleVelHigh);

  }
}