"use strict";
document.addEventListener("DOMContentLoaded", init);

const url = "https://beer-waffle.herokuapp.com/beertypes";

function init() {
  fetchData();
}

function fetchData() {
  fetch(url, {
    method: "get",
  })
    .then((e) => e.json())
    .then((e) => {
      fetchBeers(e);
      //fetchDetails(e);
    });
  console.log(btn);
}

function fetchBeers(beers) {
  console.log(beers);

  beers.forEach(displayBeer);
  /* showDetails(); */
}

function displayBeer(beer) {
  console.log(beer);

  const beerTemplate = document.querySelector("template").content;
  const beerList = document.querySelector("body");
  const beerClone = beerTemplate.cloneNode(true);
  const btn = document.querySelector(".showMore");
  const dropDown = document.querySelector(".dropdown");

  beerClone.querySelector("h2.name").textContent = `${beer.name}`;
  beerClone.querySelector("h2.category").textContent = `${beer.category}`;
  beerClone.querySelector("p.alcohol").textContent = `ABV: ${beer.alc} %`;
  console.log(`images/${beer.label}`);

  /* beerClone.querySelector(
    ".aroma"
  ).textContent = `Aroma: ${beer.description.aroma}`;
  beerClone.querySelector(
    ".appearance"
  ).textContent = `Appearance: ${beer.description.appearance}`;
  beerClone.querySelector(
    ".flavor"
  ).textContent = `Flavor: ${beer.description.flavor}`;
  beerClone.querySelector(
    ".mouthfeel"
  ).textContent = `Mouthfeel: ${beer.description.mouthfeel}`;
  beerClone.querySelector(
    ".overallImpression"
  ).textContent = `Overall Impression: ${beer.description.overallImpression}`; */

  // dropdown details
  beerClone.querySelector(".showMore").addEventListener("click", () => {
    dropDown.classList.remove("hide");

    beerClone.querySelector(
      ".aroma"
    ).textContent = `Aroma: ${beer.description.aroma}`;
    beerClone.querySelector(
      ".appearance"
    ).textContent = `Appearance: ${beer.description.appearance}`;
    beerClone.querySelector(
      ".flavor"
    ).textContent = `Flavor: ${beer.description.flavor}`;
    beerClone.querySelector(
      ".mouthfeel"
    ).textContent = `Mouthfeel: ${beer.description.mouthfeel}`;
    beerClone.querySelector(
      ".overallImpression"
    ).textContent = `Overall Impression: ${beer.description.overallImpression}`;
  });

  beerList.appendChild(beerClone);
}

/* function showDetails() {
  document.querySelector(".dropdown").classList.remove("hide");
}
 */
