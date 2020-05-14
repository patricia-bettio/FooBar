"use strict"

//-----------------------------------IMPORT--------------------------------------//
//-----formatted time-----//
import dateFormatter from "./modules/extra";

//-----------------------------------INITIALIZE--------------------------------------//
document.addEventListener("DOMContentLoaded", start);

function start(){
    fetchData();
    //setTimeout(fetchData, 5000);
}

const url = "https://beer-waffle.herokuapp.com/";

function fetchData(){

    fetch (url, {
        method: "get",
    })

    .then((e)=>e.json())
    .then((e)=> {
        //console.log(e);
        
        init(e);
        //setTimeout(fetchData, 5000);
        
    });
    

}

function init(data) {
    console.log(data);
    //-----TIME-----//
    //console.log(data.timestamp)
    //import and fire formatting function:
    //console.log(dateFormatter(data.timestamp))
    document.querySelector(".localTime").textContent = dateFormatter(data.timestamp);

    //-----QUEUE-----//
    //console.log(data.queue)
    data.queue.forEach(queueUnit);

    //-----BARTENDERS-----//
    //console.log(data.bartenders)
    data.bartenders.forEach(bartendersUnit);
    //bartendersUnit(data);

    //-----TAPS-----//
    //data.taps.forEach(tapsUnit);
    //console.log(data.taps)
    data.taps.forEach(tapsUnit);

    //-----SERVING-----//
    //console.log(data.serving)
    data.serving.forEach(servingUnit);

    //-----STORAGE-----//
    //console.log(data.storage)
    let storageSort = data.storage;
    //sort by left in stock:
    //console.log(storageSort)
    //console.log(storageSort.sort())
    storageSort.sort((a, b) => (a.amount > b.amount) ? 1 : -1);
    //show each:
    data.storage.forEach(storageUnit);
 
}

//-----------------------------------TIME--------------------------------------//

//-----------------------------------QUEUE--------------------------------------//
function queueUnit(showQueue) {
    //console.log(showQueue)
    //-----get template and clone-----//
    const templateQueue = document.querySelector("#queueTemplate").content;
    const queueArea = document.querySelector("#queueUnit");
    const cloneQueue = templateQueue.cloneNode(true);
    //-----elements in template-----//
    cloneQueue.querySelector("p.id").textContent = `order number: ${showQueue.id}`;
    cloneQueue.querySelector("p.order").textContent = `order details: ${showQueue.order}`;
    //-----adjust time-----//
    //import function that converts time:
    //console.log(dateFormatter(showQueue.startTime))
    // return the newTimeFormatted!
    cloneQueue.querySelector("p.startTime").textContent = dateFormatter(showQueue.startTime);
    //-----append-----//
    queueArea.appendChild(cloneQueue);
    
}

//-----------------------------------BARTENDERS--------------------------------------//
function bartendersUnit(oneBartender){
    //console.log(oneBartender.name)
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
    bartendersArea.appendChild(cloneBartender)

}

//-----------------------------------TAPS UNIT--------------------------------------//
function tapsUnit(showTap) {
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
    tapsArea.appendChild(cloneTaps)

}

//-----------------------------------BARTENDERS--------------------------------------//
function servingUnit(servingNext){
    //console.log(servingNext)
    //-----get template and clone-----//
    const templateServing = document.querySelector("#servingTemplate").content;
    const servingArea = document.querySelector("#servingUnit");
    const cloneServing = templateServing.cloneNode(true);
    //-----elements in template-----//
    cloneServing.querySelector("p.id").textContent = servingNext.id;
    cloneServing.querySelector("p.order").textContent = servingNext.order;
    //import dateformatter to convert time:
    cloneServing.querySelector("p.startTime").textContent = dateFormatter(servingNext.startTime);;
    //-----append-----//
    servingArea.appendChild(cloneServing);

}

//-----------------------------------STORAGE--------------------------------------//
function storageUnit(showStock){
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
    cloneStorage.querySelector("p.amount").textContent = `(left in stock) ${showStock.amount}`;
    //-----append-----//
    storageArea.appendChild(cloneStorage);

}
