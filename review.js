"use strict";
document.addEventListener("DOMContentLoaded", init);

import { urlDetails } from "./modules/extra";

function init() {
  fetchData();
}

function fetchData() {
  fetch(urlDetails + "/order", {
    method: "get",
  })
    .then((e) => e.json())
    .then((e) => {
      fetchBeers(e);
    });
}

function fetchBeers(beers) {
  console.log(beers);

  beers.forEach(displayBeer);
}

function displayBeer(beer) {
  console.log(beer);

  const beerTemplate = document.querySelector("template").content;
  const beerList = document.querySelector("body");
  const beerClone = beerTemplate.cloneNode(true);

  beerClone.querySelector("h2.name").textContent = `${beer.name}`;
  beerClone.querySelector("h2.category").textContent = `${beer.category}`;
  beerClone.querySelector("img.logo").src = `images/${beer.label}`;
  console.log(`images/${beer.label}`);

  beerList.appendChild(beerClone);
}
