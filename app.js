const canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

var isDrawing = false;

var xPosition;
var yPosition;
canvas.addEventListener("mousedown", (e) => {
  //   console.log(e);
  isDrawing = true;
  yPosition = e.offsetY;
  xPosition = e.offsetX;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  c.beginPath();
  c.strokeStyle = "black";
  c.lineCap = "round";
  c.lineWidth = 2;
  c.moveTo(xPosition, yPosition);
  c.lineTo(e.offsetX, e.offsetY);
  c.stroke();

  xPosition = e.offsetX;
  yPosition = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

// canvas.addEventListener("mousemove", (e) => {
//   //   console.log(e);
//   yPosition = e.offsetY;
//   xPosition = e.offsetX;
// });

// document.getElementById("resetButton").onclick((e) => {
//   c.clearRect(0, 0, 800, 900);
// });

document.getElementById("resetButton").addEventListener("click", () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("saveButton").addEventListener("click", () => {
  var image = canvas.toDataURL("image/png");
  var newTab = window.open("about:blank", "image from canvas");
  newTab.document.write(
    "<img src='" + image + "' alt='from canvas' download />"
  );
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "signature.png");
  let url = image.replace(/^data:image\/png/, "data:application/octet-stream");
  downloadLink.setAttribute("href", url);
  downloadLink.click();
});
