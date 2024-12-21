const canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
const setting = document.getElementById("settingsIcon");
const penOpacity = document.getElementById("penOpacity");
var fileType = document.getElementById("fileType").value;
c.strokeStyle = "black";
var isDrawing = false;
var preserveStyles = false;
var newTab = false;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

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

const handlePreserveStyles = () => {
  preserveStyles = !preserveStyles;
};

document.getElementById("resetButton").addEventListener("click", () => {
  if (preserveStyles) {
    const currentFillStyle = c.fillStyle; // Save the current background color
    c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    c.fillStyle = currentFillStyle; // Restore the saved background color
    c.fillRect(0, 0, canvas.width, canvas.height); // Reapply the background color
  } else {
    c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    c.fillStyle = "white"; // Reset to default background color
    c.fillRect(0, 0, canvas.width, canvas.height); // Apply the default background color
    c.strokeStyle = "black"; // Reset pen color
    c.lineWidth = 1; // Reset pen size
    c.globalAlpha = 1; // Reset pen opacity
  }
});

document.getElementById("saveButton").addEventListener("click", () => {
  var image = canvas.toDataURL(`image/${fileType}`);
  console.log(fileType);
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
  // canvas.style.backgroundColor = color;
  // canvas.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = color;
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const setPenColor = (color) => {
  c.strokeStyle = color;
};

const handleOpenInNewTab = () => {
  newTab = !newTab;
};

document.querySelectorAll(".penColor").forEach((element) => {
  element.addEventListener("click", (e) => {
    document.querySelectorAll(".penColor").forEach((element) => {
      {
        element.classList.remove("scale-[1.35]");
      }
    });
    // element.classList.remove("scale-[1.35]");
    e.target.classList.toggle("scale-[1.35]");
  });
});

document.querySelectorAll(".backgroundColor").forEach((element) => {
  element.addEventListener("click", (e) => {
    document.querySelectorAll(".backgroundColor").forEach((element) => {
      {
        element.classList.remove("scale-[1.35]");
      }
    });
    // element.classList.remove("scale-[1.35]");
    e.target.classList.toggle("scale-[1.35]");
  });
});

const handleFileType = (type) => {
  fileType = type;
  console.log(fileType);
};
