/* ROTATE */

let rotate_angle_deg = 0;

function bodyRotate() {
  rotate_angle_deg += 180;
  document.body.style.transform = `rotate(${rotate_angle_deg}deg)`;
}

/* FLASHLIGHT */

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

/* DYNAMIC TITLE */

function rollTitleTimer() {
  let letters = ["X", "▒"];
  let letter = letters[Math.floor(Math.random() * letters.length)];
  document.title = "2facto " + letter;
};

/* REPEAT TEXT */

function repeat() {
  let repeatText = document.querySelector('.repeat');
  repeatText.textContent = repeatText.textContent + 'Lab and experiments.' + '\n';
}

setInterval(repeat, 1200);

/* 3D TRANSFORM */

const el = document.querySelector('.repeat');

document.documentElement.onmousemove = (e) => {
  el.style.webkitTransform = el.style.transform = 'rotate3d(10, 180, -6, ' + e.pageX / -20 + 'deg)';
};

/* SAVE THE WORLD */

document.querySelector("#save").addEventListener('click', (e) => {
  e.preventDefault();

  const world = document.querySelector("#world");
  const spinner = document.querySelector("#spinner");
  const saved = document.querySelector("#saved")

  world .style.display = "none";
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    saved.style.display = "block";

    var obj = "world";
    var filename = "world.txt";
    var blob = new Blob([obj], {type: 'text/plain'});
    var e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }, 3500)

});

/* DOCUMENT READY */

function onPageload() {
  document.body.addEventListener("mousemove", moveFlashlight);
  let rollTitle = setInterval(rollTitleTimer, 250);
}

document.addEventListener("DOMContentLoaded", onPageload);