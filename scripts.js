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

let repeatInterval = setInterval(repeat, 1200);

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

/* RESET */

function reset(toggle = true) {
  if (toggle) {
   document.body.removeEventListener("mousemove", moveFlashlight);
   clearInterval(repeatInterval);
   return;
 }

 document.body.addEventListener("mousemove", moveFlashlight);
 setInterval(repeat, 1200);
}

/* WP ADMIN */

const admin = document.querySelector("#admin");
admin.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!admin.password.value) {
    return;
  }

  if (admin.password.value.toLowerCase() == "internet2024") {
    reset();

    document.querySelector("#warning_sound").play();
    document.body.className = "hacker";
    document.body.textContent = "";

    let response;

    try {
      response = await fetch("https://ipinfo.io/json").then((response) => { return response.json() });
    } catch (error) {}

    const hackerElement = document.createElement("h1");
    hackerElement.innerHTML = `OMG you are a hacker!!!<br>`;

    if (response) {
      hackerElement.innerHTML = hackerElement.innerHTML + `I have your ip address: ${response.ip}<br>I know where you live !!! You live in ${response.city}<br>`;
    }

    hackerElement.innerHTML = hackerElement.innerHTML + `I'm calling the police<br>🚨🚔👮‍♂️`;
    document.body.appendChild(hackerElement);

    console.log("Yes, I've remove everything. That's why, my hacker friend, you have to reload the page.");
    return;
  }

  admin.password.value = "";
  document.querySelector(".admin_error").style.display = "block";
});

/* DON'T CLICK HERE */

document.querySelector("#dont").addEventListener("click", (e) => {
  e.preventDefault();
  reset();

  const body = document.querySelector("body");
  const container = document.querySelector(".container");

  container.style.display = "none";
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

  const value = localStorage.getItem("rorchach");

  if (value) {
    rorchachText.innerHTML = rorchachText.textContent + `<br>Last time you've said "${value}"`;
  }

  const rorchachForm = document.createElement("form");
  rorchachText.className = "rorchach_text";

  rorchachForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = rorchachInput.value;

    if (!value) {
      return;
    }

    localStorage.setItem("rorchach", value);

    rorchachContainer.textContent = "Interesting...";

    setTimeout((e) => {
      rorchachContainer.textContent = rorchachContainer.textContent + " But wrong.";
    }, 1500);

    setTimeout((e) => {
      rorchachContainer.textContent = "You don't qualify.";
    }, 3000);

    setTimeout((e) => {
      rorchachContainer.textContent = "Goodbye.";
      rorchachContainer.style.animation = "goodbye 2s infinite";

      rorchachContainer.addEventListener("click", (e) => {
        console.log("click");
        clearTimeout(backToContentTimeout);
        return;
      });
    }, 5000);

    const backToContentTimeout = setTimeout((e) => {
      reset(false);
      rorchachContainer.remove();
      container.style.display = "block";
      //body.style.animation = "rorchachEnd 0.1s infinite"
    }, 6500);
  });

  const rorchachInput = document.createElement("input");
  rorchachInput.id = "rorchach_input";
  rorchachInput.name = "rorchach_input";
  rorchachInput.className = "rorchach_text";
  rorchachInput.type = "text";

  body.appendChild(rorchachContainer);
  rorchachContainer.appendChild(rorchachElement);
  rorchachElement.appendChild(rorchachImage);

  setTimeout((e) => {
    rorchachElement.appendChild(rorchachText);
    rorchachElement.appendChild(rorchachForm);
    rorchachForm.appendChild(rorchachInput)
    rorchachInput.focus();
  }, 4000);
});

/* DOCUMENT READY */

function onPageload() {
  document.body.addEventListener("mousemove", moveFlashlight);
  let rollTitle = setInterval(rollTitleTimer, 250);
}

document.addEventListener("DOMContentLoaded", onPageload);