//#region --------- Globals ---------
const DEFAULT_BACKGROUND_COLOR = "white";
const aiDraw = document.getElementById("draw");
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight;

const maxLevel = 5;
let ctx = canvas.getContext("2d");
ctx.fillStyle = DEFAULT_BACKGROUND_COLOR;
ctx.lineCap = "round";
ctx.shadowColor = "rgba(0,0,0, 0.75)";
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let color = generateHslColor();
let drawColor = generateHslColor();
let drawWidth = "20";
let index = -1;
let isDrawing = false;
let scale = 0.6;
let canvasHistory = [];
let restoreLastCanvasState = [];
//#endregion

//#region --------- Drawing Event Listeners ---------
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
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX + canvas.offsetLeft, e.clientY + canvas.offsetTop);
}

function draw(e) {
  if (isDrawing) {
    ctx.lineTo(e.clientX + canvas.offsetLeft, e.clientY + canvas.offsetTop);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = drawWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
}

function stop(e) {
  if (isDrawing) {
    ctx.stroke();
    ctx.closePath();
    isDrawing = false;
  }

  if (e.type != "touchend") {
    canvasHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}
//#endregion

//#region --------- Button Logic ---------
function clearCanvas() {
  ctx.fillStyle = DEFAULT_BACKGROUND_COLOR;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvasHistory = [];
  restoreLastCanvasState = [];
  index = -1;
}

function undoLast() {
  if (canvasHistory.length !== 0) {
    index -= 1;
    let canvasImage = canvasHistory.pop();
    restoreLastCanvasState.push(canvasImage);
    if (canvasHistory.length > 0) {
      ctx.putImageData(canvasHistory[index], 0, 0);
    } else {
      ctx.fillStyle == DEFAULT_BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  return; // do nothing
}

function redoLast() {
  if (restoreLastCanvasState.length !== 0) {
    index += 1;
    let canvasImage = restoreLastCanvasState.pop();
    canvasHistory.push(canvasImage);
    ctx.putImageData(canvasHistory[index], 0, 0);
  }
  return; // do nothing
}

function drawShapes() {
  const circles = new Circles();
  circles.draw();

  const circles2 = new Circles2();
  circles2.draw();

  const connector = new Connector();
  connector.draw();

  drawFrac();
}

function drawFrac() {
  const lineWidth = Math.random() * 20 + Math.random() * 10;
  const sides = Math.random() * 12;
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = generateHslColor();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  for (let i = 0; i < sides; i++) {
    ctx.fillStyle = generateHslColor();
    ctx.rotate(-0.78);
    drawLines(0);
  }
  ctx.restore();
}

function drawLines(level) {
  const branches = Math.random() * 2 + 0.7;
  const size =
    canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
  const spread = Math.random() * 1.5 + 1;

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
//#endregion

//#region --------- Helpers ---------
// make a class function to draw circles, rectangles or different shapes
class Circles {
  constructor() {
    this.size = Math.random() * 500 + Math.random() * 800;
    this.color = color;
    this.locationX = generateLocationX();
    this.locationY = generateLocationY();
  }
  draw() {
    ctx.fillStyle = generateHslColor();
    ctx.beginPath();
    ctx.arc(this.locationX, this.locationY, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Circles2 {
  constructor() {
    this.size = Math.random() * 1000 + Math.random() * 800;
    this.color = color;
    this.locationX = (Math.random() * 390) / generateLocationX();
    this.locationY = (Math.random() * 1000) / generateLocationY();
  }
  draw() {
    ctx.fillStyle = generateHslColor();
    ctx.beginPath();
    ctx.arc(this.locationX, this.locationY, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Connector {
  constructor() {
    this.size = Math.random() * 1000 + Math.random() * 800;
    this.color = color;
    this.locationX = (Math.random() * 390) / generateLocationX();
    this.locationY = (Math.random() * 1000) / generateLocationY();
  }
  draw() {
    ctx.fillStyle = generateHslColor();
    ctx.beginPath();
    ctx.arc(this.locationX * 2, this.locationY * 2, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function changeColor(e) {
  drawColor = e.style["background-color"];
}

function generateHslColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 50%)";
}

function generateLocationX() {
  return Math.random() * 1000 + 300;
}

function generateLocationY() {
  return Math.random() * 1000 + 450;
}
//#endregion
