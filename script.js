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
      setInterval(fetchDataInterval, 1000);
    });
}
function showData(data) {
  bartendersUnit(data.bartenders);
  storageUnit(data.storage);
  queueUnit(data.queue);
  tapsUnit(data.taps);
  servingUnit(data.serving);
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
  updatedStorageUnit(data.storage);
  updatedQueueUnit(data.queue);
  updatedTapsUnit(data.taps);
  updatedServingUnit(data.serving);
}

//---------------------------------NEXT IN LINE--------------------------------------//
function queueUnit(queue) {
  console.log(queue);
  const templateQueue = document.querySelector("#queueTemplate").content;
  const queueArea = document.querySelector("#queueUnit");

  queueArea.innerHTML = "";
  queue.forEach((inQueue) => {
    const storageQueue = templateQueue.cloneNode(true);

    storageQueue.querySelector("p.id").textContent = inQueue.id;
    storageQueue.querySelector("p.startTime").textContent = inQueue.startTime;
    storageQueue.querySelector("p.order").textContent = inQueue.order;

    //-----append-----//
    queueArea.appendChild(storageQueue);
  });
  updatedQueueUnit(queue);
}

function updatedQueueUnit(queue) {
  console.log({ queue });

  queue.forEach((inQueue) => {
    /* document.querySelectorAll("#queueUnit article").forEach((inQueue) => { */
    console.log({ inQueue });

    document.querySelector("p.id").textContent = inQueue.id;
    document.querySelector("p.startTime").textContent = inQueue.startTime;
    document.querySelector("p.order").textContent = inQueue.order;
  });
}

//-----------------------------------BARTENDERS--------------------------------------//
function bartendersUnit(bartenders) {
  console.log(bartenders);
  const templateBartenders = document.querySelector("#bartendersTemplate")
    .content;
  const bartendersArea = document.querySelector("#bartendersUnit");

  bartendersArea.innerHTML = "";
  bartenders.forEach((oneBartender) => {
    const cloneBartender = templateBartenders.cloneNode(true);

    cloneBartender.querySelector("p.name").textContent = oneBartender.name;
    if (oneBartender.name === "Jonas") {
      cloneBartender.querySelector(".bartender").src = "images/jonas.jpeg";
    } else if (oneBartender.name === "Peter") {
      cloneBartender.querySelector(".bartender").src = "images/peter.jpg";
    } else if (oneBartender.name === "Dannie") {
      cloneBartender.querySelector(".bartender").src = "images/dannie.jpeg";
    }

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

//-----------------------------------STORAGE--------------------------------------//
function storageUnit(storage) {
  console.log(storage);
  const templateStorage = document.querySelector("#storageTemplate").content;
  const storageArea = document.querySelector("#storageUnit");

  storageArea.innerHTML = "";
  storage.forEach((oneKeg) => {
    const cloneStorage = templateStorage.cloneNode(true);

    /* cloneStorage.querySelector("p.name").textContent = oneKeg.name; */

    //-----append-----//
    storageArea.appendChild(cloneStorage);
  });
  updatedStorageUnit(storage);
}

function updatedStorageUnit(storage) {
  document.querySelectorAll("#storageUnit article").forEach((oneKeg, index) => {
    oneKeg.querySelector("p.name").textContent = storage[index].name;
    oneKeg.querySelector("p.amount").textContent = storage[index].amount;
    //sort by most to least popular
    /* storage.sort((a, b) => (a.amount > b.amount ? 1 : -1)); */
  });
}

//-----------------------------------TAPS UNIT--------------------------------------//
function tapsUnit(taps) {
  console.log(taps);
  const templateTaps = document.querySelector("#tapsTemplate").content;
  const tapsArea = document.querySelector("#tapsUnit");

  tapsArea.innerHTML = "";
  taps.forEach((oneTap) => {
    const cloneTaps = templateTaps.cloneNode(true);

    tapsArea.appendChild(cloneTaps);
  });
  updatedTapsUnit(taps);
}

function updatedTapsUnit(taps) {
  document.querySelectorAll("#tapsUnit article").forEach((oneTap, index) => {
    oneTap.querySelector("p.id").textContent = taps[index].id;
    oneTap.querySelector("p.beer").textContent = taps[index].beer;
    oneTap.querySelector("p.inUse").textContent = taps[index].inUse;
    oneTap.querySelector("p.level").textContent = taps[index].level;
  });
  showTapsData(taps);
}

function showTapsData(taps) {
  /* if (taps.beer === "El Hefe") {
    oneTap.querySelector("p.beer").classList.add(".elHefe");
  } */
}

//---------------------------------SERVING NEXT--------------------------------------//
function servingUnit(serving) {
  console.log(serving);

  const templateServing = document.querySelector("#servingTemplate").content;
  const servingArea = document.querySelector("#servingUnit");

  servingArea.innerHTML = "";
  serving.forEach((oneCustomer) => {
    const cloneServing = templateServing.cloneNode(true);

    cloneServing.querySelector("p.id").textContent = oneCustomer.id;
    cloneServing.querySelector("p.order").textContent = oneCustomer.order;
    cloneServing.querySelector("p.startTime").textContent =
      oneCustomer.startTime;

    //--------append-------//
    servingArea.appendChild(cloneServing);
  });
  updatedServingUnit(serving);
}

function updatedServingUnit(serving) {
  serving.forEach((oneCustomer) => {
    /* console.log({ oneCustomer }); */

    /* document.querySelectorAll("#servingUnit article").forEach((oneCustomer) => { */
    document.querySelector("p.id").textContent = oneCustomer.id;
    document.querySelector("p.order").textContent = oneCustomer.order;
    document.querySelector("p.startTime").textContent = oneCustomer.startTime;
  });
}

/* function updatedServingUnit(serving) {
  document.querySelectorAll("#servingUnit article").forEach((oneCustomer) => {
    oneCustomer.querySelector("p.id").textContent = serving.id;
    oneCustomer.querySelector("p.order").textContent = serving.order;
    oneCustomer.querySelector("p.startTime").textContent = serving.startTime;
  });
} */

// ------------timer---------- //
const timeSpan = document.getElementById("timer");
const mins = 60;
const now = Date.now();
let date = new Date();
// Set deadline hours, minutes, seconds, milliseconds
date.setHours(22, 0, 0, 0);
let deadline = date.getTime();

setInterval(() => {
  let currentTime = new Date().getTime();
  let distance = deadline - currentTime;
  let hours = Math.floor((distance % (1000 * 60 * 3600)) / (1000 * 3600));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timeSpan.innerHTML =
    "Time until closing: " + hours + ":" + minutes + ":" + seconds;
}, 50);
