const admin = document.querySelector("#admin");

admin.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!admin.password.value) {
    return;
  }

  if (admin.password.value.toLowerCase() == "internet2024") {
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