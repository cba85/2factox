let dots = 0;

const dotsElement = document.createElement("span");
dotsElement.id = "dots";

function type() {
    if (dots < 3) {
        dotsElement.append('.');
        dots++;
    } else {
        dotsElement.innerHTML = '.';
        dots = 1;
    }
}

let toggle = false;
const decideElement = document.querySelector("#decide");

function flip() {
   if (toggle) {
    decideElement.innerHTML = 'Frontend';
    toggle = false;
} else {
    decideElement.innerHTML = 'Backend';
    toggle = true;
}
}

document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault();

    decideElement.innerHTML = `Deciding`;
    decideElement.appendChild(dotsElement);
    decideElement.style.display = "block";

    setInterval(type, 300); 

    setTimeout(() => {
        const flipInterval = setInterval(flip, 100); 

        setTimeout(() => {
            clearInterval(flipInterval);
            decideElement.innerHTML = "Weekend!";
        }, 3000)
    }, 1500);
});

