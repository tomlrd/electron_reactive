window.addEventListener("DOMContentLoaded", () => {
  window.$ = window.jQuery = require("jquery");
  const { ipcRenderer } = require("electron");
  var counterDiv = $('#counter')
  var storage = []

  // INIT CONTENT IF LOCALSTORAGE
  for (const [key, value] of Object.entries(localStorage)) {
    storage.push(`${key}: ${value}`);
    if (key === "counter") {
      $(counterDiv).text(value);
      ipcRenderer.send('counter:set', value)
    }
  }

  // EVENTS
  $("#btn").on('click', () => {
    ipcRenderer.send('counter:incr')
    ipcRenderer.on('counter:fetch', (event, arg) => {
      $(counterDiv).text(arg);
    })
  })
  $("#btnstorage").on('click', () => {
    ipcRenderer.send('storage:setitem', { name: "counter", value: JSON.parse($(counterDiv).text()) })
    ipcRenderer.on('storage:fetch', (event, arg) => {
      //$(counterDiv).text(arg.value);
    })
  })
});

