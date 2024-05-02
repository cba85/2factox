let rotate_angle_deg = 0;

function bodyRotate() {
  rotate_angle_deg += 180;
  document.body.style.transform = `rotate(${rotate_angle_deg}deg)`;
}

function menu() {
  document.querySelector("#menu").style.backgroundColor = "yellow";
  setTimeout(() => {
    document.querySelector("#menu").style.backgroundColor = "transparent";
    setTimeout(() => {
      document.querySelector("#menu").style.backgroundColor = "yellow";
      setTimeout(() => {
        document.querySelector("#menu").style.backgroundColor = "transparent";
      }, 300);
    }, 300);
  }, 300);
}

let flashlightOn = false;

function flashlight() {
  light = document.querySelector("#flashlight");
  if (!flashlightOn) {
    flashlightOn = true;
    light.className = "soft_light";
  } else {
    flashlightOn = false;
    light.classList.remove("soft_light");
  }
}

function moveFlashlight(event) {
  light = document.querySelector("#flashlight");
  light.style.left = `${event.clientX - 125}px`;
  light.style.top = `${event.clientY - 125}px`;
}

function onPageload() {
  document.body.addEventListener("mousemove", moveFlashlight);
}

document.addEventListener("DOMContentLoaded", onPageload);