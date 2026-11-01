(function () {
  var BACK_KEY_CODE = 10009;

  function exitApp(tizenApi, showFallback) {
    try {
      tizenApi.application.getCurrentApplication().exit();
      return true;
    } catch (e) {
      console.log("tizen exit nicht verfügbar:", e && e.message);
      showFallback();
      return false;
    }
  }

  function shouldBlockKey(tizenApi, keyCode) {
    return Boolean(tizenApi) && keyCode === BACK_KEY_CODE;
  }

  var api = { exitApp: exitApp, shouldBlockKey: shouldBlockKey };
  if (typeof module !== "undefined") module.exports = api;
  else window.ParentalLogic = api;
})();
