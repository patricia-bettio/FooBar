"use strict";

import { urlDetails, urlApi } from "./modules/extra";
import {resdbEndpoint, resdbApiKey} from "./modules/extra";

document.addEventListener("DOMContentLoaded", init);

let allBeers = [];

let orders = [];

//testing
let amountBeerEdit;
let nameBeerEdit;
//object stored
let userLastOption = []



let currentServing = [];
let notAvailable;


function init() {
  
  fetchDashboard();
  getPrices();
  fetchData();
  setUpModal();
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


function fetchDashboard(){
  fetch(urlApi, {
    method: "get",
  })
    .then((e) => e.json())
    .then((e) => {
      seeDashboard(e);
    });
}

//currently serving:
function seeDashboard(seeDashboard){
seeDashboard.taps.forEach((oneTap)=>{
  currentServing.push(oneTap.beer);
})
}

function fetchBeers(beers) {
  //make global:
  allBeers = beers;
  //console.log(allBeers)
  //set Filter:
  setFilters(beers);
  //disable unavailable
  //unavailableBeers(beers);
  //show on template:
  displayBeer(beers);
}

function unavailableBeers(beers){
  beers.forEach((oneBeer)=>{
   // console.log(oneBeer.name)
   // console.log(currentServing.includes(oneBeer.name))
    if (currentServing.includes(oneBeer.name)){
     // console.log("do nothing, beer is available")
    } else {
      console.log("This beer is NOT avaialble")
      console.log(oneBeer.name)
          
    }
  })
}


function displayBeer(beers) {
  //console.log(beers);
  //clear
  document.querySelector("#beerArea").innerHTML = "";
  beers.forEach(displaySingleBeer);
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
 
 
  //form
  const form = beerClone.querySelector("form");
  window.form = form;
  const elements = form.elements;
  window.elements = elements;

  
  elements.quantity.addEventListener("keyup", (e) => {
    //console.log(e)
    //console.dir(e.target.value);

    let objectReview = {
       name: "",
       amount: 0
     }

    // nameBeerEdit.find(beer => beer.name === beer.name); // either smth, either undefined
    // if undefined add to array
    // else change value

    //beer name
    const name = beer.name;
    //console.log(name);
    //amount
    const amount = form.elements.quantity.value;
    //console.log(amount);

    //PROBLEM
    nameBeerEdit = name;
    amountBeerEdit = form.elements.quantity.value;
     
     //TESTING
/*      objectReview.name = name;
     objectReview.amount = form.elements.quantity.value;
     console.log(objectReview)
     userLastOption.push(objectReview);
     console.log(userLastOption)
     console.log(objectReview.name) */


  /* console.log(nameBeerEdit.find(beer => beer.name === objectReview.name))
    if(nameBeerEdit.find(beer => beer.name === objectReview.name)){
      console.log("name is there")
    }
    console.log(nameBeerEdit) */
  });

 
  //console.log(document.querySelector(".formSubmit"))
  document.querySelector(".formSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    let validForm = true;

    const name = beer.name;
    const amount = form.elements.quantity.value;

  
  
    //add only amount > 0
    if (amount === "") {
      console.log("zero")
      validForm = false;
      
    }

    //post
    if (form.checkValidity() && validForm) {
      
      console.log("form is valid");
      
      postOrder({
        name: beer.name,
        amount: form.elements.quantity.value,
      });
      
    }
  });

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
  beerClone.querySelector(".showingMore").addEventListener("click", (e) => {
    //show deatils and turn glass onclick
    selectedBeer.classList.toggle("hide");
    showMoreGlass.classList.toggle("rotate");
  });
  selectedBeer.addEventListener("click", (e) => {
    selectedBeer.classList.toggle("hide");
    showMoreGlass.classList.toggle("rotate");
  });
  //append
  beerList.appendChild(beerClone);
}

//--------------------------------- +/- BEERS FORM -----------------------------------//
function postOrder(orderQuantity) {
  console.log("Added to cart: ", orderQuantity);


  /*---------------------POST--------------------*/

  function post(orderQuantity) {
    console.log("POST", orderQuantity);

    orders.push(orderQuantity);
    const postData = JSON.stringify(orders);
    console.log(postData);
    fetch("https://beer-waffles.herokuapp.com/order", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },

      body: postData,
    })
      .then((res) => res.json())
      .then((data) => showErrors(data));
  }
  post(orderQuantity);
 
}

function showErrors(data) {
  console.log(data);
  console.log(data.message);
  let dataMessage = data.message;
  if (dataMessage.includes("We are not serving:")){
    alert(`Oops...${dataMessage}`);
    setTimeout((e) => {
      location.reload()
    }, 1000)
  }
}
//--------------------------------EDIT-------------------------------------------//

function editOptionModal(){
  console.log(nameBeerEdit)
  console.log(amountBeerEdit)

  document.querySelector(".modalContent .reviewTheOrder").innerHTML = "";
  const areaReviw = document.querySelector(".modalContent .reviewTheOrder");
  var reviewOrder = document.createElement('p');
  reviewOrder.textContent = `${nameBeerEdit} x${amountBeerEdit}`;

  areaReviw.appendChild(reviewOrder);

}
//-------------------------------------- FILTER -------------------------------------//
function setFilters(allBeers) {
  //console.log(allBeers);
  //show filters:
  document.querySelector(".filterButton").addEventListener("click", (e) => {
    document.querySelector(".filterOptions").classList.toggle("showFilters");
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
  displayBeer(ipaBeers);
  document.querySelector(".filterOptions").classList.remove("showFilters")
}

function filterHefe() {
  console.log(allBeers);
  let hefeBeers = allBeers.filter(function (hefe) {
    return hefe.category == "Hefeweizen";
  });
  displayBeer(hefeBeers);
  document.querySelector(".filterOptions").classList.remove("showFilters")
}

function filterOkt() {
  console.log(allBeers);
  let oktBeers = allBeers.filter(function (okt) {
    return okt.category == "Oktoberfest";
  });
  displayBeer(oktBeers);
  document.querySelector(".filterOptions").classList.remove("showFilters")
}

function filterEuro() {
  console.log(allBeers);
  let euroBeers = allBeers.filter(function (euro) {
    return euro.category == "European Lager";
  });
  displayBeer(euroBeers);
  document.querySelector(".filterOptions").classList.remove("showFilters")
}

function filterStout() {
  console.log(allBeers);
  let stoutBeers = allBeers.filter(function (stout) {
    return stout.category == "Stout";
  });
  displayBeer(stoutBeers);
  document.querySelector(".filterOptions").classList.remove("showFilters")
}

function filterBelgian() {
  console.log(allBeers);
  let belgianBeers = allBeers.filter(function (belgian) {
    return belgian.category == "Belgian Specialty Ale";
  });
  displayBeer(belgianBeers);
  document.querySelector(".filterOptions").classList.remove("showFilters")
}

function filterCalif() {
  console.log(allBeers);
  let califBeers = allBeers.filter(function (calif) {
    return calif.category == "California Common";
  });
  displayBeer(califBeers);
  document.querySelector(".filterOptions").classList.remove("showFilters")
}

function resetFilter() {
  location.reload()
}

//--------sorting-------------//
function sortAlc() {
  console.log(allBeers);
  document.querySelector("#beerApp").classList.add("backgroundAdjust");
  if (event.target.dataset.sortDirection === "asc") {
    event.target.dataset.sortDirection = "desc";
    //console.log( document.querySelector(".sortOptions li"));
    document.querySelector(".sortOptions li").classList.remove("arrowDownSort")
    document.querySelector(".sortOptions li").classList.add("arrowUpSort")
    firstAsc(allBeers);
  } else {
    console.log("sort desc");
    firstDesc(allBeers);
    event.target.dataset.sortDirection = "asc";
    document.querySelector(".sortOptions li").classList.remove("arrowUpSort")
    document.querySelector(".sortOptions li").classList.add("arrowDownSort")
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

// ------------ modal ---------- //
const modal = document.querySelector("#modal");
const modalBtn = document.querySelector("#modalBtn");
const span = document.querySelector(".closeModal");
const editBtn = document.querySelector("#editBtn");
const modal2 = document.querySelector("#modal2");
const modalBtn2 = document.querySelector("#modalBtn2");
const span2 = document.querySelector(".closeModal2");

function setUpModal() {
  modalBtn.addEventListener("click", (e) => {
    
   console.log(amountBeerEdit)
   console.log(userLastOption)
   if(!amountBeerEdit){
     alert("select at least one")
   } else {
     modal.style.display = "block";
     editOptionModal()
   }
  
  });
  span.addEventListener("click", (e) => {
    modal.style.display = "none";
  });
  //close modal when "edit" btn clicked
  editBtn.addEventListener("click", (e) => {
    modal.style.display = "none";
  });
  setUpPayment();
}

// ------- payment modal ------ //
function setUpPayment() {
  modalBtn2.addEventListener("click", (e) => {
    modal2.style.display = "block";
  });
  span2.addEventListener("click", (e) => {
    modal2.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (event.target == modal) {
      modal2.style.display = "none";
    }
  });
  setUpForm();

  function setUpForm() {
    const body = document.querySelector("body");
    window.form = form;
    window.elements = elements;
    const form = document.querySelector("form");
    const elements = form.elements;

    form.setAttribute("novalidate", true);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formElements = form.querySelectorAll("input");
      formElements.forEach((el) => {
        el.classList.remove("invalid");
      });

      if (form.checkValidity()) {
        body.classList.add("noForm");
        body.classList.add(
          "loadingGif"
        ); /* &&
            location.assign("http://localhost:1234/app.html") */
      } else {
        formElements.forEach((el) => {
          if (!el.checkValidity()) {
            el.classList.add("invalid");
          }
        });
      }
    });

    // ------ code copied from https://codepen.io/murani/pen/KyVbrp --------
    let ccNumberInput = document.querySelector(".cc-number-input"),
      ccNumberPattern = /^\d{0,16}$/g,
      ccNumberSeparator = " ",
      ccNumberInputOldValue,
      ccNumberInputOldCursor,
      ccExpiryInput = document.querySelector(".cc-expiry-input"),
      ccExpiryPattern = /^\d{0,4}$/g,
      ccExpirySeparator = "/",
      ccExpiryInputOldValue,
      mask = (value, limit, separator) => {
        var output = [];
        for (let i = 0; i < value.length; i++) {
          if (i !== 0 && i % limit === 0) {
            output.push(separator);
          }

          output.push(value[i]);
        }

        return output.join("");
      },
      unmask = (value) => value.replace(/[^\d]/g, ""),
      checkSeparator = (position, interval) =>
        Math.floor(position / (interval + 1)),
      ccNumberInputKeyDownHandler = (e) => {
        let el = e.target;
        ccNumberInputOldValue = el.value;
        ccNumberInputOldCursor = el.selectionEnd;
      },
      ccNumberInputInputHandler = (e) => {
        let el = e.target,
          newValue = unmask(el.value),
          newCursorPosition;

        if (newValue.match(ccNumberPattern)) {
          newValue = mask(newValue, 4, ccNumberSeparator);

          newCursorPosition =
            ccNumberInputOldCursor -
            checkSeparator(ccNumberInputOldCursor, 4) +
            checkSeparator(
              ccNumberInputOldCursor +
                (newValue.length - ccNumberInputOldValue.length),
              4
            ) +
            (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

          el.value = newValue !== "" ? newValue : "";
        } else {
          el.value = ccNumberInputOldValue;
          newCursorPosition = ccNumberInputOldCursor;
        }

        el.setSelectionRange(newCursorPosition, newCursorPosition);
      },
      // expiry date
      ccExpiryInputKeyDownHandler = (e) => {
        let el = e.target;
        ccExpiryInputOldValue = el.value;
        ccExpiryInputOldCursor = el.selectionEnd;
      },
      ccExpiryInputInputHandler = (e) => {
        let el = e.target,
          newValue = el.value;

        newValue = unmask(newValue);
        if (newValue.match(ccExpiryPattern)) {
          newValue = mask(newValue, 2, ccExpirySeparator);
          el.value = newValue;
        } else {
          el.value = ccExpiryInputOldValue;
        }
      };

    // card number
    ccNumberInput.addEventListener("keydown", ccNumberInputKeyDownHandler);
    ccNumberInput.addEventListener("input", ccNumberInputInputHandler);

    ccExpiryInput.addEventListener("keydown", ccExpiryInputKeyDownHandler);
    ccExpiryInput.addEventListener("input", ccExpiryInputInputHandler);
    // code copied from https://codepen.io/murani/pen/KyVbrp
  }
}

//**-----------------PRICES----------------* */
function getPrices(){
   
  fetch(resdbEndpoint, {
  method: "get",
  headers: {
  "accept": "application/json",
  "x-apikey": resdbApiKey,
  "cache-control": "no-cache",
}
})
.then((res) => res.json())
.then((data) => data.forEach(showPrices));
};

function showPrices(onePrice){
  document.querySelectorAll("#beerList").forEach((e)=>{
    let templateNameBeer = e.querySelector(".name").innerHTML;
    if( onePrice.name === templateNameBeer){
     console.log(e.querySelector(".price"))
     console.log(onePrice.price)
     e.querySelector(".price").textContent = onePrice.price;
    }
  })
  //option2 - match by order
  /* console.log(onePrice)
    document.querySelectorAll("#beerArea article").forEach((oneItem, index)=>{
    oneItem.querySelector(".price").textContent = onePrice[index].price;
  }) */
}

//**-----------------------------------------* */