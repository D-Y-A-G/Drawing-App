const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "10";
let is_drawing = false;

let restore_array = [];
let index = -1;

function change_color(e) {
  draw_color = e.style["background-color"];
}

// self draw ai function to generate a computer drawn image -- still brainstorming
// ai needs to be able to draw random lines/circles
// must know where to start and end or could be randomized
// colors need to be randomized maybe using hsl?
// maybe set up different steps on function for computer to draw
function aiDraw(e) {
  canvas.addEventListener("click").getElementById("draw");
}

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
  context.beginPath();
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
  if (is_drawing) {
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.strokeStyle = draw_color;
    context.lineWidth = draw_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
}

function stop(e) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }

  if (e.type != "touchend") {
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}

function clear_canvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);

  restore_array = [];
  index = -1;
}

function undo_last() {
  if (index <= 0) {
    clear_canvas();
  } else {
    index -= 1;
    restore_array.pop();
    context.putImageData(restore_array[index], 0, 0);
  }
}

function redo_last() {
  // TODO: Implement redo logic
}
