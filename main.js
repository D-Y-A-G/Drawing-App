const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight;

let locationX = Math.random() * 1000 + 300;
let locationY = Math.random() * 1000 + 450;
let restore_array = [];
let index = -1;
let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
let color2 = "hsl(" + Math.random() * 360 + ", 100%, 50%)"; // adding different variables to randomize different colors for shapes
let color3 = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
let size =
  canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
const aiDraw = document.getElementById("draw");

//canvas settings
ctx.fillStyle = color;
ctx.lineCap = "round";
ctx.shadowColor = "rgba(0,0,0, 0.75)";
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;

const maxLevel = 5;
const branches = Math.random() * 2 + 0.7;

let spread = Math.random() * 1.5 + 1;
let scale = 0.6;
let sides = Math.random() * 12;
let sizeW = Math.random() * 200 + 610 / 2;
let sizeL = Math.random() * 300 + 220;
let draw_color = color3;
let draw_width = "20";
let is_drawing = false;
let hue = 0;
let lineSpread = 0.5;
let lineWidth = Math.random() * 20 + Math.random() * 10;

const lineArr = [];

const mouse = {
  x: undefined,
  y: undefined,
};
const touch = {
  x: undefined,
  y: undefined,
};
let start_background_color = "white";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
let canvas_history = [];
let restore_last_canvas_state = [];

function change_color(e) {
  draw_color = e.style["background-color"];
}

// self draw ai function to generate a computer drawn image -- still brainstorming
// ai needs to be able to draw random lines/circles
// must know where to start and end or could be randomized
// colors need to be randomized maybe using hsl?
// maybe set up different steps on function for computer to draw
// function aiDraw(e) {
//   canvas.addEventListener("click").getElementById("draw");
// }

// randomize shape object with fractal

function drawLines(level) {
  if (level > maxLevel) return;
  ctx.beginPath(0, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(500, 0);
  ctx.stroke();
  for (let i = 0; i < branches; i++) {
    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.scale(scale, scale);
    ctx.save();
    ctx.rotate(spread);
    drawLines(level + 1);
    ctx.restore();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, size, size * 0.2, 0, Math.PI * 2);
  ctx.fill();
}

function drawFrac() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.fillStyle = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  ctx.translate(canvas.width / 2, canvas.height / 2);
  for (let i = 0; i < sides; i++) {
    ctx.rotate(-0.78);
    drawLines(0);
  }
  ctx.restore();
}

// make a class function to draw circles, rectangles or different shapes
class Circles {
  constructor() {
    this.size = Math.random() * 500 + Math.random() * 800;
    this.color = color;
    this.locationX = locationX;
    this.locationY = locationY;
  }
  draw() {
    ctx.fillStyle = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(this.locationX, this.locationY, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Circles2 {
  constructor() {
    this.size = Math.random() * 1000 + Math.random() * 800;
    this.color = color;
    this.locationX = (Math.random() * 390) / locationX;
    this.locationY = (Math.random() * 1000) / locationY;
  }
  draw() {
    ctx.fillStyle = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(this.locationX, this.locationY, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Connector {
  constructor() {
    this.size = Math.random() * 1000 + Math.random() * 800;
    this.color = color;
    this.locationX = (Math.random() * 390) / locationX;
    this.locationY = (Math.random() * 1000) / locationY;
  }
  draw() {
    ctx.fillStyle = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(this.locationX * 2, this.locationY * 2, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

//testing connector to shapes

// function to draw a circle
// function drawCircle() {
//   for (let i = 0; i < circles; i++) {
//     color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
//     ctx.beginPath();
//     ctx.arc(canvas.width / 2, canvas.height / 2, size * 0.8, 0, Math.PI * 2);
//     ctx.fillStyle = color;
//     ctx.fill();

//     color2 = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
//     ctx.beginPath();
//     ctx.arc(canvas.width / 2, canvas.height, 120 * 1.5, 0, Math.PI * 2);
//     ctx.fillStyle = color2;
//     ctx.fill();

//     color3 = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
//     ctx.beginPath();
//     ctx.arc(canvas.width, canvas.height / 2, 150 * 2.5, 0, Math.PI * 2);
//     ctx.fillStyle = color3;
//     ctx.fill();
//   }
// }
function drawShapes() {
  aiDraw.addEventListener("click", function () {
    // drawCircle(4);
    // for (let i = 0; i < 1; i++)

    drawFrac();

    // const circles = new Circles();
    // circles.draw();

    // const circles2 = new Circles2();
    // circles2.draw();

    // const connector = new Connector();
    // connector.draw();

    // }
  });
}
drawShapes();

// touch events - document.body
addListenerToElement(document.body, "touchstart", handleTarget, false);
addListenerToElement(document.body, "touchmove", handleTarget, false);
addListenerToElement(document.body, "touchend", handleTarget, false);

// touch events - canvas
addListenerToElement(canvas, "touchstart", mapToMouseEvent, false);
addListenerToElement(canvas, "touchmove", mapToMouseEvent, false);
addListenerToElement(canvas, "touchend", mapToMouseEvent, false);

// mouse events - canvas
addListenerToElement(canvas, "mousedown", start, false);
addListenerToElement(canvas, "mousemove", draw, false);
addListenerToElement(canvas, "mouseup", stop, false);

function addListenerToElement(element, eventType, listener, options) {
  element.addEventListener(eventType, listener, options);
}

function handleTarget(e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}

function mapToMouseEvent(e) {
  const touch = e.touches[0];
  var mouseEvent;

  if (e.type === "touchstart") {
    e.preventDefault();
    mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
  } else if (e.type === "touchmove") {
    mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
  } else if (e.type === "touchend") {
    mouseEvent = new MouseEvent("mouseup", {});
  } else {
    console.error(`Failed to execute EventType: ${e.type}`);
  }
  canvas.dispatchEvent(mouseEvent);
}

function start(e) {
  is_drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
  if (is_drawing) {
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.strokeStyle = draw_color;
    ctx.lineWidth = draw_width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
}

function stop(e) {
  if (is_drawing) {
    ctx.stroke();
    ctx.closePath();
    is_drawing = false;
  }

  if (e.type != "touchend") {
    canvas_history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}

function clear_canvas() {
  ctx.fillStyle = start_background_color;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas_history = [];
  restore_last_canvas_state = [];
  index = -1;
}

function undo_last() {
  if (canvas_history.length !== 0) {
    index -= 1;
    let canvasImage = canvas_history.pop();
    restore_last_canvas_state.push(canvasImage);
    if (canvas_history.length > 0) {
      ctx.putImageData(canvas_history[index], 0, 0);
    } else {
      ctx.fillStyle == start_background_color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  return; // do nothing
}

function redo_last() {
  if (restore_last_canvas_state.length !== 0) {
    index += 1;
    let canvasImage = restore_last_canvas_state.pop();
    canvas_history.push(canvasImage);
    ctx.putImageData(canvas_history[index], 0, 0);
  }
  return; // do noothing
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height;
});
