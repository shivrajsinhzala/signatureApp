const canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
const setting = document.getElementById("settingsIcon");
const penOpacity = document.getElementById("penOpacity");
var fileType = document.getElementById("fileType").value;

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
  downloadLink.setAttribute("download", `signature.${fileType}`);
  let url = image.replace(/^data:image\/png/, "data:application/octet-stream");
  downloadLink.setAttribute("href", url);
  downloadLink.click();
});

setting.addEventListener("click", () => {
  console.log(
    document.getElementById("settingsPanel").classList.toggle("hidden")
  );
});

document.getElementById("penSize").addEventListener("change", (e) => {
  c.lineWidth = e.target.value;
  document.getElementById("penSizeValue").innerText = e.target.value;
});

penOpacity.addEventListener("change", (e) => {
  c.globalAlpha = e.target.value;
  document.getElementById("penOpacityValue").innerText = e.target.value;
});

document.getElementById("closeButton").addEventListener("click", (e) => {
  document.getElementById("settingsPanel").classList.add("hidden");
});

// document.querySelectorAll(".penColor").forEach((colorButton) => {
//   colorButton.addEventListener("click", (e) => {
//     c.strokeStyle = e.target.style.backgroundColor; // Set stroke color
//     console.log(e.target.style);
//   });
// });

// document.querySelectorAll(".backgroundColor").forEach((colorButton) => {
//   colorButton.addEventListener("click", (e) => {
//     c.fillStyle = e.target.style.backgroundColor; // Set fill color
//     // c.fill = e.target.style.backgroundColor; // Set stroke color
//   });
// });
