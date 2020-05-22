"use strict";

//-----------------------------------IMPORT--------------------------------------//
//-----formatted time-----//
import { urlApi  } from "./modules/extra";
import {dateFormatter} from "./modules/extra";


//-----------------------------------GLOBAL--------------------------------------//
/*Avatar*/
let randomAvatar = ["/images/avatar/avatar1.png", "/images/avatar/avatar2.png", "/images/avatar/avatar3.png", "/images/avatar/avatar4.png", "/images/avatar/avatar5.png", "/images/avatar/avatar6.png"]
let topFive;
let sortStorage;

//-----------------------------------INITIALIZE--------------------------------------//
document.addEventListener("DOMContentLoaded", init);

function init() {

  fetchData();

  setTimeToClose();
 

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
  setCurrentTime(data.timestamp)
  queueUnit(data.queue);
  bartendersUnit(data.bartenders);
  storageUnit(data.storage.sort((a, b) => (a.amount > b.amount ? 1 : -1)))
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
  setCurrentTime(data.timestamp)
  //updatedQueueUnit(data.queue);
  updatedBartendersUnit(data.bartenders);
  updatedStorageUnit(data.storage.sort((a, b) => (a.amount > b.amount ? 1 : -1)));
  updatedTapsUnit(data.taps);
  //updatedServingUnit(data.serving);
}

//---------------------------------NEXT IN LINE--------------------------------------//
function queueUnit(queue) {
  console.log({ queue });
  const templateQueue = document.querySelector("#queueTemplate").content;
  const queueArea = document.querySelector("#queueUnit");
 
  queueArea.innerHTML = "";
  
  queue.forEach((queue) => {
   
    templateQueue.querySelector("article").dataset.name = queue.id;
  
    //console.log(queue.id)
    //templateQueue.querySelector("article").dataset.id = queue.id;
    const cloneQueue = templateQueue.cloneNode(true);
    //console.log(cloneQueue.querySelector("article"))
   
    //console.log(queue.id)
    cloneQueue.querySelector("p.id").textContent = `Order # ${queue.id}`;
    cloneQueue.querySelector("p.startTime").textContent = `Placed at: ${dateFormatter(queue.startTime)}`;
    //cloneQueue.querySelector("p.order").textContent = queue.order;

    /*
    cloneBartender.querySelector("p.id").textContent = oneQueue.id;
    cloneBartender.querySelector("p.startTime").textContent = oneQueue.startTime;
    cloneBartender.querySelector("p.order").textContent = oneQueue.order; */
      //-----append-----//
  

      //AVATAR *random - will change every 5 sec
      let numberImg = Math.floor(Math.random()*randomAvatar.length);
      let displayedAvatar = randomAvatar[numberImg];
      cloneQueue.querySelector(".avatar").src = displayedAvatar;
      //IMAGES
      const queueFormat = queue.order;
      queueFormat.forEach((e)=>{
      let image = new Image()
      image.src =  `/images/circle_logo/${e.toLowerCase().split(" ")[0]}_circle.png`;
      cloneQueue.querySelector(".queueLogo").appendChild(image);
 
   })

      
    queueArea.appendChild(cloneQueue);
  });
  //updatedQueueUnit(queue); 
}

function updatedQueueUnit(queue) {
  //console.log({ queue });
 
  queue.forEach((queue)=>{
   
    
   // console.log(document.querySelector(`#queueUnit article[data-id="${queue.id}"]`))
    const datasetId = document.querySelector(`#queueUnit article[data-name="${queue.id}"]`);
    //console.log(datasetId)


      //console.log(datasetId.querySelector("p.id"))
      datasetId.querySelector("p.id").textContent = queue.id;
      datasetId.querySelector("p.startTime").textContent = queue.startTime;
      datasetId.querySelector("p.order").textContent = queue.order;
      //console.log(datasetId.querySelector("p.order"))
    

  });

/*   document.querySelectorAll("#queueUnit article").forEach((oneQueue, index) => {
  
    console.log(queue[index].id);
    oneQueue.querySelector("p.id").textContent = queue[index].id; 
    oneQueue.querySelector("p.startTime").textContent = queue[index].startTime;
    oneQueue.querySelector("p.order").textContent = queue[index].order;
  }) */
}

//-----------------------------------BARTENDERS--------------------------------------//
function bartendersUnit(bartenders) {
  //console.log({ bartenders });
  const templateBartenders = document.querySelector("#bartendersTemplate").content;
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
  //console.log({ bartenders });
  document.querySelectorAll("#bartendersUnit article").forEach((oneBartender, index) => {
    
      oneBartender.querySelector("p.status").textContent = bartenders[index].status;
      oneBartender.querySelector("p.servingCustomer").textContent = bartenders[index].servingCustomer;
      oneBartender.querySelector("p.usingTap").textContent = bartenders[index].usingTap;
      oneBartender.querySelector("p.statusDetail").textContent = bartenders[index].statusDetail;
    });
}

//-----------------------------------STORAGE--------------------------------------//
function storageUnit(storage) {
  //top5
  //console.log(storage.slice(0,5))
  //display
  const templateStorage = document.querySelector("#storageTemplate").content;
  const storageArea = document.querySelector("#storageUnit");
  //clear
  storageArea.innerHTML = "";
  //template
  storage.forEach((oneKeg) => {
    const cloneStorage = templateStorage.cloneNode(true);
    //elements
    cloneStorage.querySelector("p.name").textContent = oneKeg.name;
    cloneStorage.querySelector("p.amount").textContent = oneKeg.amount;
    //IMAGE
    let kegFormat = oneKeg.name;
    cloneStorage.querySelector(".kegImage").src =  `/svg/bottles/${kegFormat.toLowerCase().split(" ")[0]}_bottle.svg`;
    //-----append-----//
    storageArea.appendChild(cloneStorage);
  });
  updatedStorageUnit(storage);
}

function updatedStorageUnit(storage) {
  //display
  document.querySelectorAll("#storageUnit article").forEach((oneKeg, index) => {
    oneKeg.querySelector("p.name").textContent = storage[index].name;
    oneKeg.querySelector("p.amount").textContent = storage[index].amount;
    //IMAGE
    let kegFormat = storage[index].name;
    oneKeg.querySelector(".kegImage").src =  `/svg/bottles/${kegFormat.toLowerCase().split(" ")[0]}_bottle.svg`;
  });
}

//-----------------------------------TAPS UNIT--------------------------------------//
function tapsUnit(taps) {
  //console.log(taps);
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
    //oneTap.querySelector("p.inUse").textContent = taps[index].inUse;
    oneTap.querySelector("p.level").textContent = taps[index].level;
    //USE
    if (taps[index].inUse === false){
    oneTap.querySelector(".bulletUse").style.background = "red";
    } else {
    oneTap.querySelector(".bulletUse").style.background = "green";
    }

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
  //console.log(serving);

  const templateServing = document.querySelector("#servingTemplate").content;
  const servingArea = document.querySelector("#servingUnit");


  servingArea.innerHTML = "";


  serving.forEach((oneCustomer) => {
    const cloneServing = templateServing.cloneNode(true);

    cloneServing.querySelector("p.id").textContent = `Order #${oneCustomer.id}`;
    //cloneServing.querySelector("p.order").textContent = oneCustomer.order;
 
    const orderFormat = oneCustomer.order;
      orderFormat.forEach((e)=>{
      //console.log(e)
      let image = new Image()
      //console.log(image)
      //console.log(image.src)
      image.src =  `/svg/logoGlasses/${e.toLowerCase().split(" ")[0]}_glass_logo.svg`;
      cloneServing.querySelector(".servingBeerGlass").appendChild(image);

   })


    //--------append-------//
    servingArea.appendChild(cloneServing);
  });
  //updatedServingUnit(serving);
}

function updatedServingUnit(serving) {
  serving.forEach((oneCustomer) => {
    /* console.log({ oneCustomer }); */

    /* document.querySelectorAll("#servingUnit article").forEach((oneCustomer) => { */
    document.querySelector("p.id").textContent = `Order # ${oneCustomer.id}`;
    //document.querySelector("p.order").textContent = oneCustomer.order;
    //document.querySelector("p.startTime").textContent = oneCustomer.startTime;

    const orderFormat = oneCustomer.order;
    orderFormat.forEach((e)=>{
    let image = new Image()
    image.src =  `/svg/logoGlasses/${e.toLowerCase().split(" ")[0]}_glass_logo.svg`;
  
 })
  });
}


// ------------timer---------- //
function setCurrentTime(localTime){
  document.querySelector("#localTime").innerHTML = dateFormatter(localTime);
}
function setTimeToClose(){
  
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

}