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
  let letters = ["X", ""];
  let letter = letters[Math.floor(Math.random() * letters.length)];
  document.title = "2facto" + letter;
};

/* REPEAT TEXT */

function repeat() {
  let repeatText = document.querySelector('.repeat');
  repeatText.textContent = repeatText.textContent + 'Lab and experiments.' + '\n';
}

const repeatInterval = setInterval(repeat, 1200);

/* 3D TRANSFORM */

const el = document.querySelector('#podcast');

el.onmousemove = (e) => {
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

/* WP ADMIN */

const admin = document.querySelector("#admin");
admin.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!admin.password.value) {
    return;
  }

  if (admin.password.value == "internet2024") {
    document.querySelector("#warning_sound").play();
    console.log("🚨🚔👮‍♂️ OMG YOU ARE A HACKER!!! I'm calling the police!!!");
    document.querySelector(".admin_error").style.display = "none";
    document.querySelector(".hacker").style.display = "block";
    return;
  }

  admin.password.value = "";
  document.querySelector(".admin_error").style.display = "block";
});

/* DON'T CLICK HERE */

document.querySelector("#dont").addEventListener("click", (e) => {
  e.preventDefault();
  document.body.removeEventListener("mousemove", moveFlashlight);
  clearInterval(repeatInterval);

  const body = document.querySelector("body");
  body.textContent = "";
  body.style.backgroundColor = "white";

  const rorchachContainer = document.createElement("div");
  rorchachContainer.className = "rorchach_container";

  const rorchachElement = document.createElement("div");
  rorchachElement.id = "rorchach";

  const rorchachImage = document.createElement("div");
  rorchachImage.className = "rorchach_image";

  const rorchachText = document.createElement("div");
  rorchachText.className = "rorchach_text";
  rorchachText.textContent = "What do you see?";

  const rorchachForm = document.createElement("form");
  rorchachText.className = "rorchach_text";

  rorchachForm.addEventListener("submit", (e) => {
    e.preventDefault();

    rorchachContainer.textContent = "Wrong.";

    setTimeout((e) => {
      rorchachContainer.textContent = "Goodbye.";
    }, 2000);
    
    console.log("wip");
  });

  const rorchachInput = document.createElement("input");
  rorchachInput.id = "rorchach_input";
  rorchachInput.name = "rorchach_input";
  rorchachInput.className = "rorchach_text";
  rorchachInput.type = "text";

  body.appendChild(rorchachContainer);
  rorchachContainer.appendChild(rorchachElement);
  rorchachElement.appendChild(rorchachImage);
  rorchachElement.appendChild(rorchachText);
  rorchachElement.appendChild(rorchachForm);
  rorchachForm.appendChild(rorchachInput)
  rorchachInput.focus();  
});

/* DOCUMENT READY */

function onPageload() {
  document.body.addEventListener("mousemove", moveFlashlight);
  let rollTitle = setInterval(rollTitleTimer, 250);
}

document.addEventListener("DOMContentLoaded", onPageload);