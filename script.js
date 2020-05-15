"use strict";

//-----------------------------------IMPORT--------------------------------------//
//-----formatted time-----//
import { urlApi, dateFormatter } from "./modules/extra";

//-----------------------------------INITIALIZE--------------------------------------//
document.addEventListener("DOMContentLoaded", init);

function init() {
  fetchData();
}

function fetchData() {
  fetch(urlApi, {
    method: "get",
  })
    .then((e) => e.json())
    .then((data) => {
      showData(data);
      setInterval(fetchDataInterval, 2000);
    });
}

function showData(data) {
  bartendersUnit(data.bartenders);
}

function fetchDataInterval() {
  fetch(urlApi, {
    method: "get",
  })
    .then((e) => e.json())
    .then((data) => {
      updateData(data);
    });
}

function updateData(data) {
  updatedBartendersUnit(data.bartenders);
}

//-----------------------------------BARTENDERS--------------------------------------//
function bartendersUnit(bartenders) {
  console.log(bartenders);

  const templateBartenders = document.querySelector("#bartendersTemplate")
    .content;
  const bartendersArea = document.querySelector("#bartendersUnit");

  bartendersArea.innerHTML = "";
  bartenders.forEach((oneBartender) => {
    /* console.log(oneBartender); */
    const cloneBartender = templateBartenders.cloneNode(true);

    cloneBartender.querySelector("p.name").textContent = oneBartender.name;

    //-----append-----//
    bartendersArea.appendChild(cloneBartender);
  });
  updatedBartendersUnit(bartenders);
}

function updatedBartendersUnit(bartenders) {
  document
    .querySelectorAll("#bartendersUnit article")
    .forEach((oneBartender, index) => {
      oneBartender.querySelector("p.status").textContent =
        bartenders[index].status;
      oneBartender.querySelector("p.servingCustomer").textContent =
        bartenders[index].servingCustomer;
      oneBartender.querySelector("p.usingTap").textContent =
        bartenders[index].usingTap;
      oneBartender.querySelector("p.statusDetail").textContent =
        bartenders[index].statusDetail;
    });
}

//-----------------------------------TAPS UNIT--------------------------------------//
/* function tapsUnit(showTap) {
  //console.log(showTap)
  //console.log(showTap.beer)
  //-----get template and clone-----//
  const templateTaps = document.querySelector("#tapsTemplate").content;
  const tapsArea = document.querySelector("#tapsUnit");
  const cloneTaps = templateTaps.cloneNode(true);
  //-----elements in template-----//
  cloneTaps.querySelector("p.beer").textContent = showTap.beer;
  cloneTaps.querySelector("p.id").textContent = showTap.id;
  cloneTaps.querySelector("p.inUse").textContent = showTap.inUse;
  cloneTaps.querySelector("p.level").textContent = showTap.level;
  //-----append-----//
  tapsArea.appendChild(cloneTaps);
} */

//-----------------------------------BARTENDERS--------------------------------------//
/* function servingUnit(servingNext) {
  //console.log(servingNext)
  //-----get template and clone-----//
  const templateServing = document.querySelector("#servingTemplate").content;
  const servingArea = document.querySelector("#servingUnit");
  const cloneServing = templateServing.cloneNode(true);
  //-----elements in template-----//
  cloneServing.querySelector("p.id").textContent = servingNext.id;
  cloneServing.querySelector("p.order").textContent = servingNext.order;
  //import dateformatter to convert time:
  //cloneServing.querySelector("p.startTime").textContent = dateFormatter(servingNext.startTime);
  //-----append-----//
  servingArea.appendChild(cloneServing);
} */

//-----------------------------------STORAGE--------------------------------------//
/* function storageUnit(showStock) {
  //console.log(showStock)
  //console.log(showStock.amount)
  //let topSellers = showStock.amount;
  //console.log(topSellers)
  //-----get template and clone-----//
  const templateStorage = document.querySelector("#storageTemplate").content;
  const storageArea = document.querySelector("#storageUnit");
  const cloneStorage = templateStorage.cloneNode(true);
  //-----elements in template-----//
  cloneStorage.querySelector("p.name").textContent = showStock.name;
  cloneStorage.querySelector(
    "p.amount"
  ).textContent = `(left in stock) ${showStock.amount}`;
  //-----append-----//
  storageArea.appendChild(cloneStorage);
}
 */
