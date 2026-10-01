var ratImage = document.getElementById("rat-image");
var clickCountElement = document.getElementById("click-count");
var upgradeButton = document.getElementById("upgrade-button");
var upgradeCostElement = document.getElementById("upgrade-cost");
var clickPowerElement = document.getElementById("click-power");
var pauseButton = document.getElementById("pause-button");
var pauseMenu = document.getElementById("pause-menu");
var resumeButton = document.getElementById("resume-button");
var imageUpload = document.getElementById("image-upload");
var isPaused = false;

pauseButton.addEventListener("click", function () {
  isPaused = true;
  pauseMenu.style.display = "flex";
});

resumeButton.addEventListener("click", function () {
  isPaused = false;
  pauseMenu.style.display = "none";
});

imageUpload.addEventListener("change", function (event) {
  var file = event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      ratImage.src = e.target.result;
      localStorage.setItem("ratImageSrc", e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// On load, restore any custom rat image
var savedImage = localStorage.getItem("ratImageSrc");
if (savedImage) {
  ratImage.src = savedImage;
}


//saved info
var clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
var clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
var upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 50;

  clickCountElement.textContent = clickCount;
  clickPowerElement.textContent = clickPower;
  upgradeCostElement.textContent = upgradeCost;

function showPointPopup(x, y, amount) {
  var popup = document.createElement("div");
  popup.className = "point-popup";
  popup.textContent = "+" + amount;
  popup.style.left = x + "px";
  popup.style.top = y + "px";
  document.body.appendChild(popup);

  setTimeout(function () {
    popup.remove();
  }, 800);
}

ratImage.addEventListener("click", function (event) {
  if (isPaused) return;
  var randomX = Math.floor(
    Math.random() * (window.innerWidth - ratImage.width),
  );
  var randomY = Math.floor(
    Math.random() * (window.innerHeight - ratImage.height),
  );
  
  ratImage.style.left = randomX + "px";
  ratImage.style.top = randomY + "px";
  
  clickCount += clickPower;
  clickCountElement.textContent = clickCount;
  localStorage.setItem("clickCount", clickCount);

showPointPopup(event.clientX, event.clientY, clickPower);
});

upgradeButton.addEventListener("click", function () {
  if (clickCount >= upgradeCost) {
    clickCount -= upgradeCost;
    clickPower += 1;
    upgradeCost = Math.floor(upgradeCost * 1.5);

      clickCountElement.textContent = clickCount;
    clickPowerElement.textContent = clickPower;
    upgradeCostElement.textContent = upgradeCost;

    localStorage.setItem("clickCount", clickCount);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("upgradeCost", upgradeCost);
  }
});