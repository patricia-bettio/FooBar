"use strict";

//-----------------------------------IMPORT--------------------------------------//
//-----formatted time-----//
import {urlApi, dateFormatter} from "./modules/extra";

//-----------------------------------INITIALIZE--------------------------------------//
document.addEventListener("DOMContentLoaded", start);

function start() {

  fetchData();

}



function fetchData() {
  fetch(urlApi, {
    method: "get",
  })
    .then((e) => e.json())
    .then((data) => {
    //console.log(data);
    init(data);
    setInterval(fetchDataInterval, 2000);
    //console.log(data)
    });
}

function init(data) {
  console.log(data);
  //-----TIME-----//
  //console.log(data.timestamp)
  //import and fire formatting function:
  //console.log(dateFormatter(data.timestamp))
  //document.querySelector(".localTime").textContent = dateFormatter(data.timestamp);

  //-----QUEUE-----//
  //console.log(data.queue)
  //queueUnit(data.queue)

  //-----BARTENDERS-----//
  //console.log(data.bartenders)
  //data.bartenders.forEach(bartendersUnit);
  bartendersUnit(data.bartenders);

  //-----TAPS-----//
  //data.taps.forEach(tapsUnit);
  //console.log(data.taps)
  //data.taps.forEach(tapsUnit);

  //-----SERVING-----//
  //console.log(data.serving)
  //data.serving.forEach(servingUnit);

  //-----STORAGE-----//
  //console.log(data.storage)
  //let storageSort = data.storage;
  //sort by left in stock:
  //console.log(storageSort)
  //console.log(storageSort.sort())
  //storageSort.sort((a, b) => (a.amount > b.amount ? 1 : -1));
  //show each:
  //data.storage.forEach(storageUnit);
}

function fetchDataInterval(){
  fetch(urlApi, {
    method: "get",
  })
    .then((e) => e.json())
    .then((data) => {
      console.log(data) 
      updateInit(data);
      
    });
}


function updateInit(data){ 
  console.log(data)
  //document.querySelector("#bartendersUnit").innerHTML = "";
  //let testing = data.bartenders;
  //console.log(typeof)
  bartendersUnit(data.bartenders)
}

//-----------------------------------TIME--------------------------------------//

//-----------------------------------QUEUE--------------------------------------//
/* function queueUnit(showQueue) {
  //console.log(showQueue)
    showQueue.forEach((showQueue)=>{
  //-----get template and clone-----//
  const templateQueue = document.querySelector("#queueTemplate").content;
  const queueArea = document.querySelector("#queueUnit");
  const cloneQueue = templateQueue.cloneNode(true);
  //-----elements in template-----//
  cloneQueue.querySelector(
    "p.id"
  ).textContent = `order number: ${showQueue.id}`;
  cloneQueue.querySelector(
    "p.order"
  ).textContent = `order details: ${showQueue.order}`;
  //-----adjust time-----//
  //import function that converts time:
  //console.log(dateFormatter(showQueue.startTime))
  // return the newTimeFormatted!
  //cloneQueue.querySelector("p.startTime").textContent = dateFormatter(showQueue.startTime);
  //-----append-----//
  queueArea.appendChild(cloneQueue);

    })

} */

//-----------------------------------BARTENDERS--------------------------------------//
function bartendersUnit(oneBartender) {
  console.log(oneBartender);
  
    //document.querySelector("#bartendersUnit").innerHTML = "";
    //oneBartender =  [];
    oneBartender.forEach((oneBartender) => {

    // console.log(typeof oneBartender)
    //console.log(oneBartender.status)
    //console.log(oneBartender.statusDetail)
    //-----get template and clone-----//
    const templateBartenders = document.querySelector("#bartendersTemplate").content;
    const bartendersArea = document.querySelector("#bartendersUnit");

    const cloneBartender = templateBartenders.cloneNode(true);
    //-----elements in template-----//
    cloneBartender.querySelector("p.name").textContent = oneBartender.name;
    cloneBartender.querySelector("p.status").textContent = oneBartender.status;
    cloneBartender.querySelector("p.servingCustomer").textContent = oneBartender.servingCustomer;
    cloneBartender.querySelector("p.usingTap").textContent = oneBartender.usingTap;
    cloneBartender.querySelector("p.statusDetail").textContent = oneBartender.statusDetail;
    
    //-----append-----//
    bartendersArea.appendChild(cloneBartender);
    
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