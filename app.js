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
  
}

function fetchBeers(beers) {
  console.log(beers);

  beers.forEach(displayBeer);
  /* showDetails(); */


}


function displayBeer(beer) {
  //console.log(beer);

  const beerTemplate = document.querySelector("template").content;
  const beerList = document.querySelector("#beerArea");
  const beerClone = beerTemplate.cloneNode(true);
  
  //const dropDownArea = document.querySelector(".dropdown");
  
  beerClone.querySelector("h2.name").textContent = `${beer.name}`;
  beerClone.querySelector("h2.category").textContent = `${beer.category}`;
  beerClone.querySelector("p.alcohol").textContent = `ABV: ${beer.alc} %`;
  console.log(`images/${beer.label}`);
  //hidden deatails in template:
  beerClone.querySelector(".aroma").textContent = `Aroma: ${beer.description.aroma}`;
  beerClone.querySelector(".appearance").textContent = `Appearance: ${beer.description.appearance}`;
  beerClone.querySelector(".flavor").textContent = `Flavor: ${beer.description.flavor}`;
  beerClone.querySelector(".mouthfeel").textContent = `Mouthfeel: ${beer.description.mouthfeel}`;
  beerClone.querySelector(".overallImpression").textContent = `Overall Impression: ${beer.description.overallImpression}`;
  //SHOW DETAILS
  //console.log(beerClone.querySelector(".showMore"))
  //console.log(beerClone.querySelector(".dropdown"))
  let selectedBeer= beerClone.querySelector(".dropdown")
  selectedBeer.classList.add("hide");
  beerClone.querySelector(".showMore").addEventListener("click", (e)=>{
  selectedBeer.classList.toggle("hide") 
  })

  beerList.appendChild(beerClone);
}

