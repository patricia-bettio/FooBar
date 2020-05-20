"use strict";

import { urlDetails } from "./modules/extra";

document.addEventListener("DOMContentLoaded", init);

let allBeers = [];
let alcNumber = [];
let orderQuantity = [];

function init() {
  fetchData();
  
 
}

function fetchData() {
  fetch(urlDetails, {
    method: "get",
  })
    .then((e) => e.json())
    .then((e) => {
      fetchBeers(e);
     
      
     
      
    });
    
}

function fetchBeers(beers) {
 
  //make global:
  allBeers = beers;
  //console.log(allBeers)
  //set Filter:
  setFilters(beers);


  //show on template:
  displayBeer(beers);
}

function displayBeer(beers) {
  //console.log(beers);
  //clear
  document.querySelector("#beerArea").innerHTML = "";
  beers.forEach(displaySingleBeer);
  setUpForm()
  //form (quantity input) setup
  //beers.forEach(setUpForm);
}

function displaySingleBeer(beer) {
  //console.log(beer);
  const beerTemplate = document.querySelector("template").content;
  const beerList = document.querySelector("#beerArea");
  const beerClone = beerTemplate.cloneNode(true);

  //properties:
  beerClone.querySelector("h2.name").textContent = `${beer.name}`;
  beerClone.querySelector("h2.category").textContent = `${beer.category}`;
  beerClone.querySelector("p.alcohol").textContent = `ABV: ${beer.alc} %`;
  beerClone.querySelector(".logo").src = `images/${beer.label}`;

  //hidden details in template:
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

  //grab by category
  const formatCategory = beer.category.toLowerCase().split(" ")[0];
  let showMoreGlass = beerClone.querySelector(".showMore");
  showMoreGlass.src = `svg/glasses/${formatCategory}_glass.svg`;

  //SHOW DETAILS
  let selectedBeer = beerClone.querySelector(".dropdown");
  selectedBeer.classList.add("hide");
  beerClone.querySelector(".showMore").addEventListener("click", (e) => {
    //show deatils and turn glass onclick
    selectedBeer.classList.toggle("hide");
    showMoreGlass.classList.toggle("rotate");
  });
  //append
  beerList.appendChild(beerClone);
  
}

function setUpForm() {
    //select all forms:
    const form = document.querySelectorAll("form");
    window.form = form;
    console.log(form)
  console.log(form.elements)

   
    //form.forEach(getSingleInput);
/* 
form.addEventListener("click", (e) => {
  console.log(form)
    let orderQuantity = form.elements.quantity.value;
    console.log(orderQuantity);

    //addToCart(orderQuantity);
  })  */

}

function getSingleInput(form){
  console.log(form.value)




/*   if (form.checkValidity()){
    console.log("is valid")
    //post 
  } else {
    console.log("its not valid")
  } */

  

}
//-------------------------------------- FORM--------------------------------------//
function addToCart(orderQuantity) {
  console.log("Added to cart: ", orderQuantity, "beers");

  const nextReviewBtn = document.querySelector(".nextReview");

  /*---------------------POST--------------------*/
  nextReviewBtn.addEventListener("click", (e) => {
    function post() {
      const data = [];
      const postData = JSON.stringify(data);
      fetch(urlApi + "/order", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: postData,
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
    post();
  });
}

//-------------------------------------- FILTER -------------------------------------//
function setFilters(allBeers) {
  //console.log(allBeers);
  //show filters:
  document.querySelector(".filterButton").addEventListener("click", (e) => {
    document.querySelector(".filterOptions").classList.toggle("showFilters");
  });
  //show sorting:
  document.querySelector(".sortButton").addEventListener("click", (e) => {
    document.querySelector(".sortOptions").classList.toggle("showSorting");
  });
  // filters event listeners:
  document
    .querySelector("[data-filter='IPA']")
    .addEventListener("click", filterIPA);
  document
    .querySelector("[data-filter='Hefeweizen']")
    .addEventListener("click", filterHefe);
  document
    .querySelector("[data-filter='Oktoberfest']")
    .addEventListener("click", filterOkt);
  document
    .querySelector("[data-filter='European Lager']")
    .addEventListener("click", filterEuro);
  document
    .querySelector("[data-filter='Stout']")
    .addEventListener("click", filterStout);
  document
    .querySelector("[data-filter='Belgian Specialty Ale']")
    .addEventListener("click", filterBelgian);
  document
    .querySelector("[data-filter='California Common']")
    .addEventListener("click", filterCalif);
  document
    .querySelector("[data-sort='alc']")
    .addEventListener("click", sortAlc);
  document.querySelector(".resetFilter").addEventListener("click", resetFilter);
}

function filterIPA() {
  console.log(allBeers);
  let ipaBeers = allBeers.filter(function (IPA) {
    return IPA.category == "IPA";
  });
  //console.log(ipaBeers)
  displayBeer(ipaBeers);
}

function filterHefe() {
  console.log(allBeers);
  let hefeBeers = allBeers.filter(function (hefe) {
    return hefe.category == "Hefeweizen";
  });
  displayBeer(hefeBeers);
}

function filterOkt() {
  console.log(allBeers);
  let oktBeers = allBeers.filter(function (okt) {
    return okt.category == "Oktoberfest";
  });
  displayBeer(oktBeers);
}

function filterEuro() {
  console.log(allBeers);
  let euroBeers = allBeers.filter(function (euro) {
    return euro.category == "European Lager";
  });
  displayBeer(euroBeers);
}

function filterStout() {
  console.log(allBeers);
  let stoutBeers = allBeers.filter(function (stout) {
    return stout.category == "Stout";
  });
  displayBeer(stoutBeers);
}

function filterBelgian() {
  console.log(allBeers);
  let belgianBeers = allBeers.filter(function (belgian) {
    return belgian.category == "Belgian Specialty Ale";
  });
  displayBeer(belgianBeers);
}

function filterCalif() {
  console.log(allBeers);
  let califBeers = allBeers.filter(function (calif) {
    return calif.category == "California Common";
  });
  displayBeer(califBeers);
}

function resetFilter() {
  console.log(allBeers);
  displayBeer(allBeers);
}

//--------sorting-------------//
function sortAlc() {
  console.log(allBeers);
  if (event.target.dataset.sortDirection === "asc") {
    event.target.dataset.sortDirection = "desc";
    console.log("sort asc");
    firstAsc(allBeers);
  } else {
    console.log("sort desc");
    firstDesc(allBeers);
    event.target.dataset.sortDirection = "asc";
  }
}
//condition - ascending
function firstAsc() {
  console.log(allBeers);
  function compareAlc(a, b) {
    if (a.alc < b.alc) {
      return -1;
    } else if (a.alc > b.alc) {
      return 1;
    }
  }
  allBeers.sort(compareAlc);
  displayBeer(allBeers);
}
//condition - descending
function firstDesc() {
  console.log(allBeers);
  function compareAlc(a, b) {
    if (a.alc < b.alc) {
      return 1;
    } else if (a.alc > b.alc) {
      return -1;
    }
  }
  allBeers.sort(compareAlc);
  displayBeer(allBeers);
}
