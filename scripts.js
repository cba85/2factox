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

// Create input element with options
function createInputElement(options = {}) {
  const input = document.createElement("input");

  if (options.id) {
    input.id = options.id;
  } 

  if (options.name) {
    input.name = options.name;
  } 

  if (options.className) {
    input.className = options.className;
  } 

  input.type = "text";

  return input;
}

// Add text 
function addText(text, options = {}) {
  const container =  document.querySelector(".rorchach_container");

  let newText = "";

  if (options.concat) {
    newText = container.innerHTML + " " + text;
  } else {
    newText = text;
  }

  if (options.timeout) {
    timeout += options.timeout;
    setTimeout((e) => {
      container.innerHTML = newText;
    }, timeout);
  } else {
    container.innerHTML = newText;
  }
}

let timeout = 0;

// Don't click here
function dontClick(e) {
  e.preventDefault();
  reset();

  // Update page style
  const body = document.querySelector("body");
  const container = document.querySelector(".container");
  container.style.display = "none";
  body.style.backgroundColor = "white";

  // Rorchach container
  const rorchachContainer = document.createElement("div");
  rorchachContainer.className = "rorchach_container";

  // Parent div
  const rorchachElement = document.createElement("div");
  rorchachElement.id = "rorchach";

  // Image element
  const rorchachImage = document.createElement("div");
  rorchachImage.className = "rorchach_image";

  // Text div element
  const rorchachText = document.createElement("div");
  rorchachText.className = "rorchach_text";
  rorchachText.textContent = "What do you see?";

  // Input element
  const rorchachInput = createInputElement({ id: "rorchach_input", name: "rorchach_input", className: "rorchach_text" });

  // Display previous rorash answer using localstorage
  const value = localStorage.getItem("rorchach");
  if (value) {
    rorchachText.innerHTML = rorchachText.textContent + `<br>Last time you've said "${value}"`;
  }

  // Form
  const rorchachForm = document.createElement("form");
  rorchachForm.className = "rorchach_text";

  // Submit
  rorchachForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = rorchachInput.value;

    if (!value) {
      return;
    }

    // Save answer in localstorage to display it next time
    localStorage.setItem("rorchach", value);

    addText("Interesting...");
    addText("But wrong.", { concat: true, timeout: 1500 });
    addText("You don't qualify.", { timeout: 1500 });

    // Goodbye
    setTimeout((e) => {
      addText("Goodbye.");
      rorchachContainer.style.animation = "fadeOut 2s forwards";

      // Click: don't goodbye and continue
      rorchachContainer.addEventListener("click", async (e) => {
        clearTimeout(backToContentTimeout);
        rorchachContainer.style.animation = "none";
        timeout = 0;
        addText("");
        addText("You're still here?", { timeout: 5000 });
        addText("Then...", { concat: true, timeout: 2000 });

        // Get client ip address
        let response;
        try {
          response = await fetch("https://ipinfo.io/json").then((response) => { return response.json() });
        } catch (error) {}

        // Display client information
        if (response) {
          addText(`How is the weater in ${response.city}?`, { timeout: 2000 });
          addText(`Yes.`, { timeout: 3000 });
          addText(`I know where you live.`, { concat: true, timeout: 2000 });
        }

        // Hello
        addText(`Oh I'm sorry.`, { timeout: 3000 });
        addText(`I forgot to introduce myself...`, { concat: true, timeout: 2000 });
        addText(`Hello.`, { timeout: 2000 });

        setTimeout(() => {
          body.style.backgroundColor = "black";
          rorchachContainer.style.color = "white";
          rorchachContainer.style.fontWeight = "bold";
        }, timeout + 2000);
        addText(`I'm DarkGPT`, { timeout: 2000 });
      });
    }, 4500);

    // Back to website content
    const backToContentTimeout = setTimeout((e) => {
      reset(false);
      timeout = 0;
      rorchachContainer.remove();
      body.style.backgroundColor = backgroundColor;
      container.style.display = "block";
      //body.style.animation = "rorchachEnd 0.1s infinite"
    }, 6500);
  });

  // Create rorchach container, element and directly display image
  body.appendChild(rorchachContainer);
  rorchachContainer.appendChild(rorchachElement);
  rorchachElement.appendChild(rorchachImage);

  // Display text and form
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

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("mousemove", moveFlashlight);
  let rollTitle = setInterval(rollTitleTimer, 250);
});