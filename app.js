"use strict";

import { urlDetails, urlApi } from "./modules/extra";
import { resdbEndpoint, resdbApiKey } from "./modules/extra";

document.addEventListener("DOMContentLoaded", init);

let allBeers = [];
let orders = [];
let userLastOption = [];
let currentServing = [];
let allThePrices = [];

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

function fetchDashboard() {
  fetch(urlApi, {
    method: "get",
  })
    .then((e) => e.json())
    .then((e) => {
      seeDashboard(e);
    });
}

//currently serving:
function seeDashboard(seeDashboard) {
  seeDashboard.taps.forEach((oneTap) => {
    currentServing.push(oneTap.beer);
  });
}

function fetchBeers(beers) {
  allBeers = beers;
  setFilters();
  displayBeer(beers);
}

function unavailableBeers(beers) {
  beers.forEach((oneBeer) => {
    if (currentServing.includes(oneBeer.name)) {
      // console.log("do nothing, beer is available")
    } else {
      console.log("This beer is NOT avaialble");
      console.log(oneBeer.name);
    }
  });
}

function displayBeer(beers) {
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
    let objectReview = {
      name: "",
      amount: 0,
    };
    //beer name
    const name = beer.name;
    //amount
    const amount = form.elements.quantity.value;
    //EDIT
    objectReview.name = name;
    objectReview.amount = form.elements.quantity.value;
    const getLastInstance = userLastOption.findIndex((beer) => beer.name === name);

    if (getLastInstance === -1) {
      userLastOption.push(objectReview);
    } else {
      userLastOption[getLastInstance] = objectReview;
    }
    
    userLastOption = userLastOption;
   
    editOptionModal(userLastOption);
    //PRICE
    let oneItemPrice;
    let finalTotalPrice = 0;
    userLastOption.forEach((singleChoice) => {
      let filteredResult = allThePrices.find(
        (el) => el.name === singleChoice.name
      );
      console.log(filteredResult)
      let onePrice = filteredResult.price;
      let oneAmount = singleChoice.amount;
      
      //console.log(typeof onePrice)
      //console.log(typeof oneAmount)

      oneItemPrice = parseInt(onePrice) * oneAmount;
      showTotalPrice(oneItemPrice);
      finalTotalPrice += oneItemPrice;
      showCheckoutPrice(finalTotalPrice);
    });
  });
  document.querySelector(".formSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    setUpPayment();
    let validForm = true;
    const name = beer.name;
    const amount = form.elements.quantity.value;
    //add only amount > 0
    if (amount === "") {
      //console.log("zero");
      validForm = false;
    }
    //post
    if (form.checkValidity() && validForm) {
      //console.log("form is valid");
      postOrder({
        name: beer.name,
        amount: form.elements.quantity.value,
      });
    }
  });
  //DROPDOWN
  beerClone.querySelector(".aroma span").textContent = ` ${beer.description.aroma}`;
  beerClone.querySelector(".appearance span").textContent = ` ${beer.description.appearance}`;
  beerClone.querySelector(".flavor span").textContent = ` ${beer.description.flavor}`;
  beerClone.querySelector(".mouthfeel span").textContent = ` ${beer.description.mouthfeel}`;
  beerClone.querySelector(".overallImpression span").textContent = ` ${beer.description.overallImpression}`;
  //ICONS
  beerClone.querySelector(".dropdown .aromaImage").src = "icons/aroma.png";
  beerClone.querySelector(".dropdown .appearanceImage").src = "icons/appearance.png";
  beerClone.querySelector(".dropdown .flavorImage").src = "icons/flavor.png";
  beerClone.querySelector(".dropdown .mouthfeelImage").src = "icons/mouthfeel.png";
  beerClone.querySelector(".dropdown .overallImage").src = "icons/overallImpression.png";
  //grab by category
  const formatCategory = beer.category.toLowerCase().split(" ")[0];
  //console.log(beer.category)
  //console.log(formatCategory)
  
  let showMoreGlass = beerClone.querySelector(".showMore");
  showMoreGlass.src = `svg/glasses/${formatCategory}_glass.svg`;
  
  //SHOW DETAILS
  let selectedBeer = beerClone.querySelector(".dropdown");
  selectedBeer.classList.add("hide");
  beerClone.querySelector(".showingMore").addEventListener("click", (e) => {
    //show deatils and turn glass onclick
    selectedBeer.classList.toggle("hide");
    showMoreGlass.classList.toggle("rotate");
    //showMoreGlass.classList.add("dropdownTransition");
  });
  selectedBeer.addEventListener("click", (e) => {
    selectedBeer.classList.toggle("hide");
    showMoreGlass.classList.toggle("rotate");
  });
  //append
  beerList.appendChild(beerClone);
}

//--------------------------------- BEERS FORM -----------------------------------//
function postOrder(orderQuantity) {
  console.log("Added to cart: ", orderQuantity);
  /*---------------------POST--------------------*/
  function post(orderQuantity) {
    orders.push(orderQuantity);
    const postData = JSON.stringify(orders);
    console.log(postData);
    fetch("https://beer-waffle-again.herokuapp.com/order", {
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

//------------------------------------ERRORS MODAL -------------------------------//
function showErrors(data) {
  let dataMessage = data.message;
  const errorUnavailable = document.getElementById("errorModal1");
  const span = errorUnavailable.querySelector("span");
  if (dataMessage.includes("We are not serving:")) {
    errorUnavailable.classList.add("errorShow");
    errorUnavailable.querySelector(
      ".notServing"
    ).textContent = `Oops...${dataMessage}`;
    span.addEventListener("click", (e) => {
      location.reload();
    });
    errorUnavailable.addEventListener("click", (e) => {
      location.reload();
    });
  }
  const modalAdd = document.getElementById("modalAdd");
  const spanAdd = modalAdd.querySelector("span");
  if (dataMessage == "added") {
    //console.log("was added");
    modalAdd.classList.add("errorShow");
    spanAdd.addEventListener("click", (e) => {
      location.reload();
    });
    modalAdd.addEventListener("click", (e) => {
      location.reload();
    });
  }
}

function showErrorAtLeastOne() {
  const minimumError = document.querySelector(".minimumOrder");
  minimumError.classList.add("minimumErrorShow");
}
//--------------------------------EDIT-------------------------------------------//

function editOptionModal(userLastOption) {
  document.querySelector(".modalContent .reviewTheOrder").innerHTML = "";
  userLastOption.forEach((oneSelection) => {
    if (oneSelection.amount > 0) {
      document.querySelector(".minimumOrder").classList.remove("minimumErrorShow");
      const areaReviw = document.querySelector(".modalContent .reviewTheOrder");
      let reviewOrder = document.createElement("p");
      reviewOrder.className = "priceAmount";
      reviewOrder.textContent = `${oneSelection.name} x${oneSelection.amount} `;
      areaReviw.appendChild(reviewOrder);
    } else {
      document.querySelector(".minimumOrder").classList.add("minimumErrorShow");
    }
  });
}
//-----------------------------------PRICE-------------------------------------------//

function showTotalPrice(oneItemPrice) {
  if (oneItemPrice) {
    const beerArea = document.querySelector(".modalContent .reviewTheOrder");
    let singleAmount = document.createElement("p");
    singleAmount.className = "singleAmount";
    singleAmount.textContent = `${oneItemPrice}kr`;
    beerArea.appendChild(singleAmount);
  }
}
function showCheckoutPrice(checkOut) {
  document.querySelector(".modalContent2 .totalPrice span").textContent = ` ${checkOut}dkk`;
}
//-------------------------------------- FILTER -------------------------------------//
function setFilters() {
  //show filters:
  document.querySelector(".filterButton").addEventListener("click", (e) => {
    document.querySelector(".filterOptions").classList.toggle("showFilters");
  });
  //event listeners:
  document.querySelector("[data-filter='IPA']").addEventListener("click", filterIPA);
  document.querySelector("[data-filter='Hefeweizen']").addEventListener("click", filterHefe);
  document.querySelector("[data-filter='Oktoberfest']").addEventListener("click", filterOkt);
  document.querySelector("[data-filter='European Lager']").addEventListener("click", filterEuro);
  document.querySelector("[data-filter='Stout']").addEventListener("click", filterStout);
  document.querySelector("[data-filter='Belgian Specialty Ale']").addEventListener("click", filterBelgian);
  document.querySelector("[data-filter='California Common']").addEventListener("click", filterCalif);
  document.querySelector("[data-sort='alc']").addEventListener("click", sortAlc);
  document.querySelector(".resetFilter").addEventListener("click", resetFilter);
}

function filterIPA() {
  console.log(allBeers);
  let ipaBeers = allBeers.filter(function (IPA) {
    return IPA.category == "IPA";
  });
  displayBeer(ipaBeers);
  getPrices();
  document.querySelector(".filterOptions").classList.remove("showFilters");
}

function filterHefe() {
  console.log(allBeers);
  let hefeBeers = allBeers.filter(function (hefe) {
    return hefe.category == "Hefeweizen";
  });
  displayBeer(hefeBeers);
  getPrices();
  document.querySelector(".filterOptions").classList.remove("showFilters");
}

function filterOkt() {
  console.log(allBeers);
  let oktBeers = allBeers.filter(function (okt) {
    return okt.category == "Oktoberfest";
  });
  displayBeer(oktBeers);
  getPrices();
  document.querySelector(".filterOptions").classList.remove("showFilters");
}

function filterEuro() {
  console.log(allBeers);
  let euroBeers = allBeers.filter(function (euro) {
    return euro.category == "European Lager";
  });
  displayBeer(euroBeers);
  getPrices();
  document.querySelector(".filterOptions").classList.remove("showFilters");
}

function filterStout() {
  console.log(allBeers);
  let stoutBeers = allBeers.filter(function (stout) {
    return stout.category == "Stout";
  });
  displayBeer(stoutBeers);
  getPrices();
  document.querySelector(".filterOptions").classList.remove("showFilters");
}

function filterBelgian() {
  console.log(allBeers);
  let belgianBeers = allBeers.filter(function (belgian) {
    return belgian.category == "Belgian Specialty Ale";
  });
  displayBeer(belgianBeers);
  getPrices();
  document.querySelector(".filterOptions").classList.remove("showFilters");
}

function filterCalif() {
  console.log(allBeers);
  let califBeers = allBeers.filter(function (calif) {
    return calif.category == "California Common";
  });
  displayBeer(califBeers);
  getPrices();
  document.querySelector(".filterOptions").classList.remove("showFilters");
}

function resetFilter() {
  location.reload();
}

//--------sorting-------------//
function sortAlc() {
  //console.log(allBeers);
  document.querySelector("#beerApp").classList.add("backgroundAdjust");
 console.log(event.target.dataset)
  if (event.target.dataset.sortDirection === "asc") {
    event.target.dataset.sortDirection = "desc";
    
    document.querySelector(".sortOptions li").classList.remove("arrowDownSort");
    document.querySelector(".sortOptions li").classList.add("arrowUpSort");

    //let sortTest = allBeers.sort((a , b) => (a.alc > b.alc ? 1 : -1))
    let sortTest = allBeers.sort(function(a,b){return a.alc - b.alc}); 
    console.log(sortTest)
    displayBeer(sortTest)
    getPrices();
    
  } else {
    //console.log("sort desc");
    
    event.target.dataset.sortDirection = "asc";

    //let sortTest = allBeers.sort((a , b) => (a.alc < b.alc ? 1 : -1))
    let sortTest = allBeers.sort(function(a,b){return b.alc - a.alc}); 
   

    document.querySelector(".sortOptions li").classList.remove("arrowUpSort");
    document.querySelector(".sortOptions li").classList.add("arrowDownSort");

    displayBeer(sortTest)
    getPrices();
  }
}

//condition - ascending
/* function firstAsc() {
 
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
} */
//condition - descending
/* function firstDesc() {
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
} */

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
     if (userLastOption == "" ) {
      //console.log("select at least one");
      showErrorAtLeastOne();
    } else {
      modal.style.display = "block";
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
    const body = document.querySelector("#modal2");

    const form = document.querySelector(".formSection form");
    window.form = form;
    const elements = form.elements;
    window.elements = elements;
    form.setAttribute("novalidate", true);

    document.querySelector(".confirm").addEventListener("click", (e) => {
      e.preventDefault();

      const formElements = form.querySelectorAll("input");
      formElements.forEach((el) => {
        el.classList.remove("invalid");
      });

      if (form.checkValidity()) {
        formElements.forEach((el) => {
          el.classList.add("valid");
        });
        document.querySelector(".formSubmit").classList.add("formSubmitShow");
        document.querySelector(".confirm").classList.add("confirmHide");
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
function getPrices() {
  fetch(resdbEndpoint, {
    method: "get",
    headers: {
      accept: "application/json",
      "x-apikey": resdbApiKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => showPrices(data));
}

function showPrices(thePrices) {
  //console.log(thePrices)
  
  thePrices.forEach((onePrice) => {
    document.querySelectorAll("#beerList").forEach((e) => {
      //console.log(e)
      let templateNameBeer = e.querySelector(".name").innerHTML;
      //console.log(templateNameBeer)
      //console.log(typeof templateNameBeer)
      if (onePrice.name === templateNameBeer) {
        e.querySelector(".price").textContent = `${onePrice.price}kr`;
      }
    });
  });
  allThePrices = thePrices;
}

