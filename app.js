const canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
const setting = document.getElementById("settingsIcon");
const penOpacity = document.getElementById("penOpacity");
var fileType = document.getElementById("fileType").value;
c.strokeStyle = "black";
var isDrawing = false;
var preserveStyles = false;
var newTab = false;

var xPosition;
var yPosition;

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  yPosition = e.offsetY;
  xPosition = e.offsetX;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  c.beginPath();

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

document.getElementById("resetButton").addEventListener("click", () => {
  if (preserveStyles) {
    c.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.strokeStyle = "black";
    c.lineWidth = 1;
    c.globalAlpha = 1;
    canvas.style.backgroundColor = "white";
  }
});

document.getElementById("saveButton").addEventListener("click", () => {
  var image = canvas.toDataURL("image/png");
  if (newTab) {
    var tab = window.open("about:blank", "image from canvas");
    tab.document.write(
      "<img src='" + image + "' alt='from canvas' download />"
    );
  }
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", `signature.${fileType}`);
  let url = image.replace(/^data:image\/png/, "data:application/octet-stream");
  downloadLink.setAttribute("href", url);
  downloadLink.click();
});

const handleSettingsPanel = () => {
  console.log("click");
  document.getElementById("settingsPanel").classList.toggle("hidden");
};

document.getElementById("penSize").addEventListener("change", (e) => {
  c.lineWidth = e.target.value;
  document.getElementById("penSizeValue").innerText = e.target.value;
});

penOpacity.addEventListener("change", (e) => {
  c.globalAlpha = e.target.value;
  document.getElementById("penOpacityValue").innerText = e.target.value;
});

document.getElementById("closeButton").addEventListener("click", (e) => {
  handleSettingsPanel();
});

const setBackgroundColor = (color) => {
  canvas.style.backgroundColor = color;
};

const setPenColor = (color) => {
  console.log(color);
  c.strokeStyle = color;
};

const handlePreserveStyles = () => {
  preserveStyles = !preserveStyles;
};

const handleOpenInNewTab = () => {
  newTab = !newTab;
};
