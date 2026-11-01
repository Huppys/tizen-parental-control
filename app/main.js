document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("confirm");
  var hint = document.getElementById("fallback-hint");

  function showHint() {
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
