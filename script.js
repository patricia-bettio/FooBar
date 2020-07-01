"use strict";

//-----------------------------------IMPORT--------------------------------------//
//----- formatted time -----//
import { urlApi } from "./modules/extra";
import { dateFormatter } from "./modules/extra";

//----- moment.js -----//
var moment = require("moment"); // require
moment().format();

//-----------------------------------GLOBAL--------------------------------------//
/*Avatar*/
let randomAvatar = [
  "images/avatar/avatar1.png",
  "images/avatar/avatar2.png",
  "images/avatar/avatar3.png",
  "images/avatar/avatar4.png",
  "images/avatar/avatar5.png",
  "images/avatar/avatar6.png",
];

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
      setInterval(fetchDataInterval, 4000);
    });
}
function showData(data) {
  setCurrentTime(data.timestamp);
  queueUnit(data.queue);
  bartendersUnit(data.bartenders);
  console.log(data.storage.sort())
  
  //storageUnit(data.storage.sort((a, b) => (a.amount > b.amount ? 1 : -1)));
  
  let testStorage = data.storage.sort(((a, b) => a.amount - b.amount));
  storageUnit(testStorage)
  
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
  setCurrentTime(data.timestamp);
  updatedQueueUnit(data.queue);
  updatedBartendersUnit(data.bartenders);

 // updatedStorageUnit(data.storage.sort((a, b) => (a.amount > b.amount ? 1 : -1)));

  let testStorage = data.storage.sort(((a, b) => a.amount - b.amount));
  updatedStorageUnit(testStorage)
  
  updatedTapsUnit(data.taps);
  updatedServingUnit(data.serving);
}

//---------------------------------NEXT IN LINE--------------------------------------//
function queueUnit(queue) {
  setQueueSize(queue);
  //clone
  const templateQueue = document.querySelector("#queueTemplate").content;
  const queueArea = document.querySelector("#queueUnit");
  //clear
  queueArea.innerHTML = "";
  updatedQueueUnit(queue);
}

function updatedQueueUnit(queue) {

  updatedQueueSize(queue);
  //1.remove old nodes
  document.querySelectorAll("#queueUnit article").forEach((node) => {
    const found = queue.find(item => item.id == node.dataset.id)
    if (!found) {
      node.remove()
    }
  })
  //2.add new
  queue.forEach((item) => {
    if (document.querySelector(`#queueUnit article[data-id="${item.id}"]`)) {
      //console.log("id is there")
      return
    }
    const templateQueue = document.querySelector("#queueTemplate").content;
    const cloneQueue = templateQueue.cloneNode(true);
    const queueArea = document.querySelector("#queueUnit");
    //dataset
    cloneQueue.querySelector("article").dataset.id = item.id;
    //elements
    cloneQueue.querySelector("p.id").textContent = `order #${item.id}`;
    cloneQueue.querySelector("p.startTime").textContent = dateFormatter(item.startTime).slice(0, 5);

    //AVATAR
    let numberImg = Math.floor(Math.random() * randomAvatar.length);
    let displayedAvatar = randomAvatar[numberImg];

    cloneQueue.querySelector(".avatar").src = displayedAvatar;

    //IMAGES
    const queueFormat = item.order;
    //console.log(typeof queueFormat)
    queueFormat.forEach((e) => {
      //console.log(typeof e)
      //console.log(e)
      let image = new Image();
      image.src = `images/circle_logo/${e.toLowerCase().split(" ")[0]}_circle.png`;
      cloneQueue.querySelector(".queueLogo").appendChild(image);
    });
    queueArea.appendChild(cloneQueue);
  });
}

//-----------------------------------BARTENDERS--------------------------------------//
function bartendersUnit(bartenders) {
  const templateBartenders = document.querySelector("#bartendersTemplate").content;
  const bartendersArea = document.querySelector("#bartendersUnit");

  bartendersArea.innerHTML = "";
  bartenders.forEach((oneBartender) => {
    const cloneBartender = templateBartenders.cloneNode(true);
    cloneBartender.querySelector("p.name").textContent = oneBartender.name;
    //console.log(typeof oneBartender.name)
    //console.log(oneBartender.name == "Jonas")
    if (oneBartender.name === "Jonas") {
      cloneBartender.querySelector(".bartender").src = "images/jonas.jpeg";
    } else if (oneBartender.name === "Peter") {
      cloneBartender.querySelector(".bartender").src = "images/peter.jpg";
    } else if (oneBartender.name === "Dannie") {
      cloneBartender.querySelector(".bartender").src = "images/dannie.jpeg";
    }
    bartendersArea.appendChild(cloneBartender);
  });
  updatedBartendersUnit(bartenders);
}

function updatedBartendersUnit(bartenders) {
  document.querySelectorAll("#bartendersUnit article").forEach((oneBartender, index) => {

      oneBartender.querySelector("p.status").textContent = bartenders[index].status;
      if (bartenders[index].servingCustomer == null) {
      oneBartender.querySelector("p.servingCustomer").textContent = "N/A";
      } else {
        oneBartender.querySelector("p.servingCustomer").textContent = `#${bartenders[index].servingCustomer}`;
      }
      oneBartender.querySelector("p.usingTap").textContent = `Tap ${bartenders[index].usingTap}`;
      if (bartenders[index].usingTap == null){
      oneBartender.querySelector("p.usingTap").textContent = " n/a";
    }
    let formatStatusNow = bartenders[index].statusDetail;

  // console.log(typeof formatStatusNow)
    if (formatStatusNow === "pourBeer") {
      oneBartender.querySelector("p.statusDetail").textContent = "Pouring beer";
    } else if (formatStatusNow === "receivePayment") {
      oneBartender.querySelector("p.statusDetail").textContent = "Receiving payment";
    } else if (formatStatusNow === "reserveTap") {
      oneBartender.querySelector("p.statusDetail").textContent = "Reserving tap";
    } else if (formatStatusNow === "startServing") {
      oneBartender.querySelector("p.statusDetail").textContent = "Started serving";
    } else if (formatStatusNow === "replaceKeg") {
      oneBartender.querySelector("p.statusDetail").textContent = "Replacing keg";
    } else if (formatStatusNow === "ready") {
      oneBartender.querySelector(".bartender").classList.add("glowingBartender");
      oneBartender.querySelector("p.statusDetail").textContent = "READY";
    }
  });
}

//-----------------------------------STORAGE--------------------------------------//
function storageUnit(storage) {
  const templateStorage = document.querySelector("#storageTemplate").content;
  const storageArea = document.querySelector("#storageUnit");
  storageArea.innerHTML = "";
  storage.forEach((oneKeg) => {
    const cloneStorage = templateStorage.cloneNode(true);
    storageArea.appendChild(cloneStorage);
  });
  updatedStorageUnit(storage);
}

function updatedStorageUnit(storage) {
  //display
  document.querySelectorAll("#storageUnit article").forEach((oneKeg, index) => {
    oneKeg.querySelector("p.name").textContent = storage[index].name;
    oneKeg.querySelector("p.amount").textContent = `Kegs: ${storage[index].amount}`;
    //console.log(storage)
    //console.log(storage[index])
    //console.log(storage[index].name)
    //IMAGE
    let kegFormat = storage[index].name;
    oneKeg.querySelector(".kegImage").src = `svg/bottles/${kegFormat.toLowerCase().split(" ")[0]}_bottle.svg`;
  });
}

//-----------------------------------TAPS UNIT--------------------------------------//
function tapsUnit(taps) {
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
    oneTap.querySelector("p.level").textContent = taps[index].level;
    //alert
    let findLevel = taps[index].level;
    if (findLevel < 500) {
      oneTap.querySelector(".tapImage").classList.add("glowLowLevel");
    } else {
      oneTap.querySelector(".tapImage").classList.remove("glowLowLevel");
    }
    //IMAGE
    let tapFormat = taps[index].beer;
    oneTap.querySelector(".tapImage").src = `svg/taps/${tapFormat.toLowerCase().split(" ")[0]}_tap.svg`;
    //stout
    let beerPath = oneTap.querySelector(".tapImage").src;
    //USE
    //console.log(taps[index].inUse == false)
    if (taps[index].inUse === false) {
      oneTap.querySelector(".bulletUse").style.background = "red";
      //glass
      oneTap.querySelector(".glassServed").classList.remove("glassServedRotate");
      oneTap.querySelector(".glassServed").src = "";
      oneTap.querySelector(".pouringBeer").classList.remove("pouringBeerAnimation");
      oneTap.querySelector(".pouringBeer").src = "";
     }else if (taps[index].inUse === true) {
      oneTap.querySelector(".bulletUse").style.background = "green";
      //glass
      oneTap.querySelector(".glassServed").src = `svg/logoGlasses/${tapFormat.toLowerCase().split(" ")[0]}_glass_logo.svg`;
      oneTap.querySelector(".glassServed").classList.add("glassServedRotate");
  
  
      if (beerPath.includes("row_tap.svg")) {
        oneTap.querySelector(".pouringBeer").src = "svg/pouringBeerStout.svg";
      } else if (beerPath.includes("hollaback")) {
        oneTap.querySelector(".pouringBeer").src = "svg/pouringBeerGold.svg";
      } else if (beerPath.includes("steampunk")){
        oneTap.querySelector(".pouringBeer").src = "svg/pouringBeerBrown.svg";
      } else if (beerPath.includes("mowintime")){
        oneTap.querySelector(".pouringBeer").src = "svg/pouringBeerGold.svg";
      } else {
        oneTap.querySelector(".pouringBeer").src = "svg/pouringBeer.svg";
      }
       oneTap.querySelector(".pouringBeer").classList.add("pouringBeerAnimation");

      }
      

      
  });
}

//---------------------------------SERVING NEXT--------------------------------------//
function servingUnit(serving) {
  //clone
  const templateServing = document.querySelector("#servingTemplate").content;
  const servingArea = document.querySelector("#servingUnit");
  //clear
  servingArea.innerHTML = "";
  updatedServingUnit(serving);
}

function updatedServingUnit(serving) {

  document.querySelectorAll("#servingUnit article").forEach((node) => {
    const found = serving.find(item => item.id == node.dataset.id)
    if (!found) {
      node.remove();
    }
  })
  serving.forEach((item) => {
    if (document.querySelector(`#servingUnit article[data-id="${item.id}"]`)) {
      return
    }
    const templateServing = document.querySelector("#servingTemplate").content;
    const cloneServing = templateServing.cloneNode(true);
    const servingArea = document.querySelector("#servingUnit");

    cloneServing.querySelector("article").dataset.id = item.id;
    //elements
    cloneServing.querySelector("p.id").textContent = `order #${item.id}`;
    //build images
    const orderFormat = item.order;
    //console.log(typeof item.order)
    orderFormat.forEach((e) => {
      let image = new Image();
      image.src = `svg/logoGlasses/${e.toLowerCase().split(" ")[0]}_glass_logo.svg`;
      cloneServing.querySelector(".servingBeerGlass").appendChild(image);

      //console.log(item)
     //console.log(orderFormat.find(item => item.order == item.order))
     //console.log(orderFormat.find(item => item == e))
     //console.log(orderFormat)
     //console.log(e)
    });
    servingArea.appendChild(cloneServing);
  });
}

//----------------------QUEUE SIZE --------------------------------------//
function setQueueSize(queueSize) {
  document.querySelector(".queueCount span").textContent = queueSize.length;
  updatedQueueSize(queueSize);
}
function updatedQueueSize(queueSize) {
  document.querySelector(".queueCount span").textContent = queueSize.length;
}

// ------------ timer ---------- //
function setCurrentTime(localTime) {
  document.querySelector("#localTime").innerHTML = "Time: " + dateFormatter(localTime);
}
function setTimeToClose() {
  const timeSpan = document.getElementById("timer");
  const mins = 60;
  const now = moment();
  let date = new Date();
  // Set deadline hours, minutes, seconds, milliseconds
  date.setHours(22, 0, 0, 0);
  let deadline = date.getTime();

  setInterval(() => {
    let now = moment();
    let distance = deadline - now;
    let hours = Math.floor((distance % (1000 * 60 * 3600)) / (1000 * 3600));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timeSpan.innerHTML = "We close in: " + hours + ":" + minutes + ":" + seconds;
  }, 50);
}
