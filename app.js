"use strict";

import { urlDetails, urlApi } from "./modules/extra";

document.addEventListener("DOMContentLoaded", init);

let allBeers = [];
let alcNumber = [];
let orderQuantity = [];

let orders = [];

function init() {
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
    console.dir(e.target.value);
    //beer name
    const name = beer.name;
    console.log(name);
    //amount
    const amount = form.elements.quantity.value;
    console.log(amount);
  });

  document.querySelector(".testPost").addEventListener("click", (e) => {
    e.preventDefault();

    let validForm = true;

    const amount = form.elements.quantity.value;

    //add only amount > 0
    if (amount === "") {
      //console.log("zero")
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
      .then((data) => console.log(data));
  }
  post(orderQuantity);
}

function showErrors(data) {
  console.log(data);
  console.log(data.message);
  let dataMessage = data.message;
  console.log(data.contains("We are not serving: "));
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

// ------------ modal ---------- //
function setUpModal() {
  const modal = document.querySelector("#modal");
  const modalBtn = document.querySelector("#modalBtn");
  const span = document.querySelector(".closeModal");

  modalBtn.addEventListener("click", (e) => {
    modal.style.display = "block";
  });
  span.addEventListener("click", (e) => {
    modal.style.display = "none";
  });

  //close modal when clicked outside of box
  window.addEventListener("click", (e) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  setUpForm();
}

// PAYMENT FORM
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
