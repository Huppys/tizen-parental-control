document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("confirm");
  var hint = document.getElementById("fallback-hint");

  function showHint(reason) {
    hint.textContent = reason === "exit-failed"
      ? "Beenden fehlgeschlagen – bitte Home-Taste drücken"
      : "App würde jetzt beenden";
    hint.hidden = false;
  }

  button.focus();
  button.addEventListener("click", function () {
    window.ParentalLogic.exitApp(window.tizen, showHint);
  });

  document.addEventListener("keydown", function (e) {
    if (window.ParentalLogic.shouldBlockKey(window.tizen, e.keyCode)) e.preventDefault();
  });
});
