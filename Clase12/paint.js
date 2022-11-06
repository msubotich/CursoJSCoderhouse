//a drawing program in js?


// paint.js
(function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  //resizing
  //canvas.height = window.innerHeight;
  //canvas.width = window.innerWidth;

  //variables
  var painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    context.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "red";

    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.offsetX, e.offsetY);
  }

  //EventListeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);
})();



