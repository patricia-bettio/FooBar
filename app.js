"use strict";

import { urlDetails } from "./modules/extra";

document.addEventListener("DOMContentLoaded", init);



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
      
    });
  
}

function fetchBeers(beers) {
  console.log(beers);

  beers.forEach(displayBeer);
  beers.forEach(addToCart);


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
  console.log(beer.label)
  console.log(`images/${beer.label}`);
  beerClone.querySelector(".logo").src = `images/${beer.label}`
  console.log(beerClone.querySelector(".logo").src)
  //test
  //document.querySelector(".testPNG").style.backgroundImage = `images/${beer.label}`



  //hidden deatails in template:
  beerClone.querySelector(".aroma").textContent = `Aroma: ${beer.description.aroma}`;
  beerClone.querySelector(".appearance").textContent = `Appearance: ${beer.description.appearance}`;
  beerClone.querySelector(".flavor").textContent = `Flavor: ${beer.description.flavor}`;
  beerClone.querySelector(".mouthfeel").textContent = `Mouthfeel: ${beer.description.mouthfeel}`;
  beerClone.querySelector(".overallImpression").textContent = `Overall Impression: ${beer.description.overallImpression}`;
  //grab by category
  const formatCategory = beer.category.toLowerCase().split(" ")[0];
  beerClone.querySelector(".showMore").src = `svg/${formatCategory}_glass.svg`;
  //SHOW DETAILS
  let selectedBeer= beerClone.querySelector(".dropdown")
  selectedBeer.classList.add("hide");
  beerClone.querySelector(".showMore").addEventListener("click", (e)=>{
  selectedBeer.classList.toggle("hide") 
  })


  beerList.appendChild(beerClone);
}

function addToCart(addBeer){
console.log(addBeer)


}
