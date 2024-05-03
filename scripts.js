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

/* CSS VARIABLES */
const cssVariables = getComputedStyle(document.querySelector(":root"));
const backgroundColor = cssVariables.getPropertyValue('--background-color');

/* DON'T CLICK HERE */

function addText(text, options = {}) {
  const rorchachContainer =  document.querySelector(".rorchach_container");

  let newText = "";

  if (options.concat) {
    newText = rorchachContainer.innerHTML + " " + text;
  } else {
    newText = text;
  }

  if (options.timeout) {
    timeout += options.timeout;
    setTimeout((e) => {
      rorchachContainer.innerHTML = newText;
    }, timeout);
  } else {
    rorchachContainer.innerHTML = newText;
  }
}

let timeout = 0;

function dontClick(e) {
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

    addText("Interesting...");
    addText("But wrong.", { concat: true, timeout: 1500 });
    addText("You don't qualify.", { timeout: 1500 });

    setTimeout((e) => {
      addText("Goodbye.");
      rorchachContainer.style.animation = "fadeOut 2s forwards";

      rorchachContainer.addEventListener("click", async (e) => {
        clearTimeout(backToContentTimeout);
        rorchachContainer.style.animation = "none";
        timeout = 0;
        addText("");
        addText("You're here.", { timeout: 5000 });
        addText("Then...", { concat: true, timeout: 2000 });

        let response;
        try {
          response = await fetch("https://ipinfo.io/json").then((response) => { return response.json() });
        } catch (error) {}

        if (response) {
          addText(`How is the weater in ${response.city}?`, { timeout: 2000 });
          addText(`Yes.`, { timeout: 3000 });
          addText(`I know where you live.`, { concat: true, timeout: 2000 });
          addText(`Oh I'm sorry.`, { timeout: 3000 });
          addText(`I forgot to introduce myself...`, { concat: true, timeout: 2000 });
          addText(`Hello.`, { timeout: 2000 });

          setTimeout(() => {
            body.style.backgroundColor = "black";
            rorchachContainer.style.color = "white";
            rorchachContainer.style.fontWeight = "bold";
          }, timeout + 2000);
          addText(`I'm DarkGPT`, { timeout: 2000 });
        } else {
          console.log('ok');
        }
      });
    }, 4500);

    const backToContentTimeout = setTimeout((e) => {
      reset(false);
      timeout = 0;
      rorchachContainer.remove();
      body.style.backgroundColor = backgroundColor;
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
}

/* REPEAT TEXT */

function repeat() {
  let repeatText = document.querySelector('.repeat');

  if (repeatCounter == 10) {
    const dont = document.createElement("a");
    dont.id = "dont";
    dont.href = "#";
    dont.textContent = "Don't click here";
    dont.addEventListener("click", dontClick, false);
    document.querySelector('.repeat').parentElement.append(dont);
  }

  repeatText.innerHTML = repeatText.innerHTML + 'Lab and experiments. ';
  repeatCounter++;
}

let repeatCounter = 1;
let repeatInterval = setInterval(repeat, 1200);

/* DOCUMENT READY */

function onPageload() {
  document.body.addEventListener("mousemove", moveFlashlight);
  let rollTitle = setInterval(rollTitleTimer, 250);
}

document.addEventListener("DOMContentLoaded", onPageload);