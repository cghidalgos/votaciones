(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    // use the current host so the app works when served from the backend
    window["env"]["apiUrl"] = window.location.origin + "/api/v1";
    window["env"]["debug"] = true;
})(this);