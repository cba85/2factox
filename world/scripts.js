/* SAVE THE WORLD */

document.querySelector("#save").addEventListener('click', (e) => {
  e.preventDefault();

  const world = document.querySelector("#world");
  const spinner = document.querySelector("#spinner");
  const saved = document.querySelector("#saved")

  // Loading: display spinner
  world .style.display = "none";
  spinner.style.display = "block";

  // Download file
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