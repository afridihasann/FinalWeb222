function lookupAddress(address, callback) {
  const q = encodeURIComponent(address);
  let url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`;

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (!this.responseText) {
      return callback(null);
    }

    try {
      const data = JSON.parse(this.responseText);

      console.info("Got the following address data", data);

      if (!data.length) {
        return callback(null);
      }

      const result = data[0];

      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);

      callback({ lat, lng });
    } catch (err) {
      console.error(err);
      callback(null);
    }
  };

  xhr.onerror = function () {
    console.error("Unable to lookup address info");
    callback(null);
  };

  xhr.open("GET", url);
  xhr.send();
}

function loadObservationsByLocation(lat, lng, callback) {
  const url = `https://api.inaturalist.org/v1/observations?per_page=30&order_by=observed_on&acc=true&lat=${lat}&lng=${lng}&radius=1`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `unable to lookup observations (got ${res.status}: ${res.statusText}`
        );
      }
      return res.json();
    })
    .then((data) => {
      console.info(
        `Got the following iNaturalist data for position ${lat}, ${lng}`,
        data
      );
      window.data = data;
      callback(getAllObservations());
    })
    .catch((err) => {
      console.error(err);
      return callback(null);
    });
}

function search(query) {
  toggleLoading(true);

  lookupAddress(query, function (coords) {
    if (!coords) {
      alert("Unable to lookup address. No results found.");
      toggleLoading(false);
      return;
    }

    const { lat, lng } = coords;

    loadObservationsByLocation(lat, lng, function (observations) {
      toggleLoading(false);

      if (!observations) {
        alert("Unable to get observation data for this location.");
        return;
      }

      map.setLocation(lat, lng);
      showObservations(observations, "All Species");
    });
  });
}
