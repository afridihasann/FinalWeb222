function validate() {
  let form = document.querySelector("#observation-form");
  let lat = document.querySelector("#latitude").value;
  let lng = document.querySelector("#longitude").value;
  let errMessageLat = document.querySelector("#wrng-lati");
  let errMessageLng = document.querySelector("#wrng-long");

  if (!form.checkValidity()) {
    return false;
  }

  if (isNaN(lat) || !(lat >= -90 && lat <= 90)) {
    errMessageLat.innerText = " must be a valid Latitude (-90 to 90)";
    return false;
  } else {
    errMessageLat.innerText = "";
  }

  if (isNaN(lat) || !(lng >= -180 && lng <= 180)) {
    errMessageLng.innerText = " must be a valid Longitude (-180 to 180)";
    return false;
  } else {
    errMessageLng.innerText = "";
  }

  return true;
}

// Wait for the window to load, then set up the submit event handler for the form.
window.onload = function () {
  const form = document.querySelector("form");
  form.onsubmit = validate;
};
