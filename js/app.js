// Name: Afridi Hasan
// StudentID: 125653196

let map;

function updateMap(observations, map) {
  map.clear();
  observations.forEach((observation) => map.addObservation(observation));
}

function updateCards(observations) {
  clearAllCards();

  observations.forEach((observation) => {
    const observationCard = buildCardForObservation(observation);
    addCard(observationCard);
  });
}

function showObservations(observations, title) {
  updateMap(observations, map);
  updateCards(observations);
  updateTitle(`${title} (${observations.length})`);
}

function showAll() {
  const observations = getAllObservations();
  showObservations(observations, "All Species");
}

function showOnlyNative() {
  const observations = getAllObservations();
  const native = filterOnlyNative(observations);
  showObservations(native, "Only Native Species");
}

function showOnlyIntroduced() {
  const observations = getAllObservations();
  const introduced = filterOnlyIntroduced(observations);
  showObservations(introduced, "Only Introduced Species");
}

function start() {
  map = new SimpleMap("map-container", 43.7955, -79.3496);

  const btnShowAll = document.querySelector("#show-all");
  btnShowAll.onclick = showAll;
  const btnOnlyNative = document.querySelector("#show-native");
  btnOnlyNative.addEventListener("click", function () {
    showOnlyNative();
  });
  const btnOnlyIntroduced = document.querySelector("#show-introduced");
  btnOnlyIntroduced.onclick = () => showOnlyIntroduced();

  const searchForm = document.querySelector("form");
  searchForm.onsubmit = function (event) {
    event.preventDefault();
    const searchValue = document.querySelector("#search-bar").value;
    console.log(`${search(searchValue)}`);
  };

  showAll();
}

window.onload = start;
