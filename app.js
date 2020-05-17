"use strict";

import { urlDetails } from "./modules/extra";

document.addEventListener("DOMContentLoaded", init);

let allBeers = [];
let ipaBeers = [];
let alcNumber = [];

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
      //fetchDetails(e);
      
      addToCart()
      

            
    });

}

function fetchBeers(beers) {
  //make global:

  allBeers = beers;
  //console.log(allBeers)
  
  setFilters(beers);
  //console.log(ipaBeers)

  //show on template:
  beers.forEach(displayBeer);
  

}

function displayBeer(beer) {
  //console.log(beer)
  const beerTemplate = document.querySelector("template").content;
  const beerList = document.querySelector("#beerArea");
  const beerClone = beerTemplate.cloneNode(true);

  //const dropDownArea = document.querySelector(".dropdown");

  beerClone.querySelector("h2.name").textContent = `${beer.name}`;
  beerClone.querySelector("h2.category").textContent = `${beer.category}`;
  beerClone.querySelector("p.alcohol").textContent = `ABV: ${beer.alc} %`;
  beerClone.querySelector(".logo").src = `images/${beer.label}`;

  //hidden details in template:
  beerClone.querySelector(".aroma").textContent = `Aroma: ${beer.description.aroma}`;
  beerClone.querySelector(".appearance").textContent = `Appearance: ${beer.description.appearance}`;
  beerClone.querySelector(".flavor").textContent = `Flavor: ${beer.description.flavor}`;
  beerClone.querySelector(".mouthfeel").textContent = `Mouthfeel: ${beer.description.mouthfeel}`;
  beerClone.querySelector(".overallImpression").textContent = `Overall Impression: ${beer.description.overallImpression}`;
  //grab by category
  
  //beerClone.querySelector(".logo").src = `images/${beer.label}`;
  const formatCategory = beer.category.toLowerCase().split(" ")[0];
  let showMoreGlass = beerClone.querySelector(".showMore")
  showMoreGlass.src = `svg/glasses/${formatCategory}_glass.svg`;
  //SHOW DETAILS
  let selectedBeer = beerClone.querySelector(".dropdown");
  selectedBeer.classList.add("hide");
  beerClone.querySelector(".showMore").addEventListener("click", (e) => {
  //show deatils and turn glass onclick
  selectedBeer.classList.toggle("hide");
  showMoreGlass.classList.toggle("rotate");
  });
  //FORM
  const form = beerClone.querySelector("form");
  window.form = form;
  //console.log(form)
  const elements = form.elements;
  window.elements = elements;
  //console.log(elements);
  //console.log(elements.quantity.value)
  //console.log(form.checkValidity())
  form.addEventListener("submit", addToCart);
  //SORT
  alcNumber = beer.alc;



  
 
  //append
  beerList.appendChild(beerClone);

}

//-------------------------------------- FORM--------------------------------------//
function addToCart() {
  //console.log("added")

 
}

//-------------------------------------- FILTER -------------------------------------//
function setFilters(allBeers){
  console.log(allBeers)
  // filters event listeners:
  document.querySelector("[data-filter='IPA']").addEventListener("click", filterIPA)
  document.querySelector("[data-sort='alc']").addEventListener("click", sortAlc);

}

function filterIPA(){
  console.log(allBeers)
  ipaBeers =  allBeers.filter(function(IPA) {
  return IPA.category == "IPA";
  });
  //filter WORKS - check console
  //missing: display ONLY the ipa category
  console.log(ipaBeers)
  //displayBeer(ipaBeers)

}

function sortAlc(){
console.log(allBeers)
console.log(alcNumber)
    if (event.target.dataset.sortDirection === "asc") {
        event.target.dataset.sortDirection = "desc";
        console.log("sort asc")
        firstAsc();
    } else {
        console.log("sort desc")
        firstDesc();
        event.target.dataset.sortDirection = "asc";
    }
  
}

//condition - ascending
function firstAsc(){
  console.log(allBeers)

 
}
//condition - descending
function firstDesc(){

}

