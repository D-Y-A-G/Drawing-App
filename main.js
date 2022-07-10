const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight;

let start_background_color = "white";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const multiple = 10;
const circles = 10;
// const circleArr = [];
// const rectangleArr = [];
const lineArr = [];
let draw_color = "black";
let draw_width = "20";
let is_drawing = false;
let hue = 0;

const mouse = {
  x: undefined,
  y: undefined,
};
const touch = {
  x: undefined,
  y: undefined,
};

let locationX = Math.random() * 1000 + 300;
let locationY = Math.random() * 100 + 450;
let restore_array = [];
let index = -1;
let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
let color2 = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
let color3 = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
let size =
  canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
const aiDraw = document.getElementById("draw");

let sizeW = Math.random() * 200 + 610 / 2;
let sizeL = Math.random() * 300 + 220;

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

// make a class function to draw circles
class Circles {
  constructor() {
    this.size = Math.random() * 100 + 200;
    this.color = color;
    this.locationX = locationX;
    this.locationY = locationY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.locationX, this.locationY, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Rectangles {
  constructor() {
    this.positionX = Math.random() * 100 + 50;
    this.positionY = Math.random() * 100 + 150;
    this.sizeW = sizeW;
    this.sizeL = sizeL;
    this.color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.positionX, this.positionY, sizeW, sizeL);
    ctx.fill();
  }
}

class Connector {
  constructor() {
    this.locationX = locationX;
    this.locationY = locationY;
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.size = Math.random() * 10 + 1;
    this.color = color3;
  }
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size / 10;
    ctx.moveTo(locationX, locationY);
    ctx.lineTo(300, 300);
    ctx.stroke();
  }
}
// connectLine function

// function line() {}

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
    // for (let i = 0; i < 1; i++) {
    const circles = new Circles();
    circles.draw();
    const rectangles = new Rectangles();
    rectangles.draw();
    const connector = new Connector();
    connector.draw();

    // }
    // connectLine();
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
    restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}

function clear_canvas() {
  ctx.fillStyle = start_background_color;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  restore_array = [];
  index = -1;
}

function undo_last() {
  if (index <= 0) {
    clear_canvas();
  } else {
    index -= 1;
    restore_array.pop();
    ctx.putImageData(restore_array[index], 0, 0);
  }
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height;
});
