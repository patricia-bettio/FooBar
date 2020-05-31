"use strict";

//-----------------------------------IMPORT--------------------------------------//
//-----formatted time-----//
import { urlApi } from "./modules/extra";
import { dateFormatter } from "./modules/extra";

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
let topFive;
let sortStorage;

//-----------------------------------INITIALIZE--------------------------------------//
document.addEventListener("DOMContentLoaded", init);

function init() {
  fetchData();

  /* displayDesktopScene(); */

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
  storageUnit(data.storage.sort((a, b) => (a.amount > b.amount ? 1 : -1)));
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
  updatedStorageUnit(
    data.storage.sort((a, b) => (a.amount > b.amount ? 1 : -1))
  );
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
  queue.forEach((queue) => {
    const cloneQueue = templateQueue.cloneNode(true);
    queueArea.appendChild(cloneQueue);
  });
  updatedQueueUnit(queue);
}

function updatedQueueUnit(queue) {
  //console.log({ queue });
  updatedQueueSize(queue);


  document.querySelectorAll("#queueUnit article").forEach((oneQueue, index) => {
    //oneQueue.querySelector(".queueLogo").innerHTML = "";
    //oneQueue.querySelector("p.id").innerHTML = "";
    //console.log(oneQueue.querySelector(".queueLogo"));
    oneQueue.querySelector(".queueLogo").innerHTML = "";
    oneQueue.querySelector("p.id").innerHTML = "";
    oneQueue.querySelector("p.startTime").innerHTML = "";


/*     let filteredResult = queue.find(
      (el) => el.id === queue[index].id
    );
    console.log(filteredResult.id)
    console.log(queue[index].id === filteredResult.id) */
    //elements
    oneQueue.querySelector("p.id").textContent = `order #${queue[index].id}`;
    //oneQueue.querySelector("p.order").textContent = queue[index].order;
    oneQueue.querySelector("p.startTime").textContent = dateFormatter(
      queue[index].startTime
    ).slice(0, 5);

    /*     //AVATAR *random - will change every 5 sec
       let numberImg = Math.floor(Math.random()*randomAvatar.length);
       let displayedAvatar = randomAvatar[numberImg];
       oneQueue.querySelector(".avatar").src = displayedAvatar; */

    //IMAGES

    const queueFormat = queue[index].order;
    queueFormat.forEach((e) => {
      let image = new Image();
      image.src = `images/circle_logo/${
        e.toLowerCase().split(" ")[0]
      }_circle.png`;
      oneQueue.querySelector(".queueLogo").appendChild(image);
    });
  });
}

//-----------------------------------BARTENDERS--------------------------------------//
function bartendersUnit(bartenders) {
  //console.log({ bartenders });
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
  //console.log({ bartenders });
  document
    .querySelectorAll("#bartendersUnit article")
    .forEach((oneBartender, index) => {
      oneBartender.querySelector("p.status").textContent =
        bartenders[index].status;
      oneBartender.querySelector("p.servingCustomer").textContent =
        bartenders[index].servingCustomer;
      oneBartender.querySelector("p.usingTap").textContent =
        bartenders[index].usingTap;
      let formatStatusNow = bartenders[index].statusDetail;

      if (formatStatusNow === "pourBeer") {
        oneBartender.querySelector("p.statusDetail").textContent =
          "Pouring beer";
      } else if (formatStatusNow === "receivePayment") {
        oneBartender.querySelector("p.statusDetail").textContent =
          "Receiving payment";
      } else if (formatStatusNow === "reserveTap") {
        oneBartender.querySelector("p.statusDetail").textContent =
          "Reserving tap";
      } else if (formatStatusNow === "startServing") {
        oneBartender.querySelector("p.statusDetail").textContent =
          "Started serving";
      } else if (formatStatusNow === "replaceKeg") {
        oneBartender.querySelector("p.statusDetail").textContent =
          "Replacing keg";
      } else if (formatStatusNow === "ready") {
        oneBartender
          .querySelector(".bartender")
          .classList.add("glowingBartender");
        oneBartender.querySelector("p.statusDetail").textContent = "READY";
      }
      /* oneBartender.querySelector("p.statusDetail").textContent =
        formatStatusNow.charAt(0).toUpperCase() + formatStatusNow.slice(1); */
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

    //-----append-----//
    storageArea.appendChild(cloneStorage);
  });
  updatedStorageUnit(storage);
}

function updatedStorageUnit(storage) {
  //display
  document.querySelectorAll("#storageUnit article").forEach((oneKeg, index) => {
    oneKeg.querySelector("p.name").textContent = storage[index].name;
    oneKeg.querySelector(
      "p.amount"
    ).textContent = `Kegs: ${storage[index].amount}`;
    //IMAGE
    let kegFormat = storage[index].name;
    oneKeg.querySelector(".kegImage").src = `svg/bottles/${
      kegFormat.toLowerCase().split(" ")[0]
    }_bottle.svg`;
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
    //oneTap.querySelector("p.beer").textContent = taps[index].beer;
    //oneTap.querySelector("p.inUse").textContent = taps[index].inUse;
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
    oneTap.querySelector(".tapImage").src = `svg/taps/${
      tapFormat.toLowerCase().split(" ")[0]
    }_tap.svg`;

    //USE
    if (taps[index].inUse === false) {
      oneTap.querySelector(".bulletUse").style.background = "red";
      //glass
      oneTap
        .querySelector(".glassServed")
        .classList.remove("glassServedRotate");
      oneTap.querySelector(".glassServed").src = "";
      oneTap
        .querySelector(".pouringBeer")
        .classList.remove("pouringBeerAnimation");
      oneTap.querySelector(".pouringBeer").src = "";
    } else if (taps[index].inUse === true) {
      oneTap.querySelector(".bulletUse").style.background = "green";
      //glass
      oneTap.querySelector(".glassServed").src = `svg/logoGlasses/${
        tapFormat.toLowerCase().split(" ")[0]
      }_glass_logo.svg`;
      oneTap.querySelector(".glassServed").classList.add("glassServedRotate");
      oneTap.querySelector(".pouringBeer").src = "svg/pouringBeer.svg";
      oneTap
        .querySelector(".pouringBeer")
        .classList.add("pouringBeerAnimation");

      // TODO: fix this
    } else if (tapImage.src === "svg/taps/row_tap.svg") {
      oneTap.querySelector(".pouringBeer").src = "svg/pouringBeerStout.svg";
      oneTap
        .querySelector(".pouringBeer")
        .classList.add("pouringBeerAnimation");
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
  serving.forEach((oneCustomer) => {
    const cloneServing = templateServing.cloneNode(true);
    //--------append-------//
    servingArea.appendChild(cloneServing);
  });
  updatedServingUnit(serving);
}

function updatedServingUnit(serving) {
  document
    .querySelectorAll("#servingUnit article")
    .forEach((oneServing, index) => {
      //clear images
      oneServing.querySelector(".servingBeerGlass").innerHTML = "";
      //elements
      oneServing.querySelector("p.id").textContent = `order #${serving[index].id}`;
      //build images
      const orderFormat = serving[index].order;
      orderFormat.forEach((e) => {
        let image = new Image();
        image.src = `svg/logoGlasses/${
          e.toLowerCase().split(" ")[0]
        }_glass_logo.svg`;
        oneServing.querySelector(".servingBeerGlass").appendChild(image);
      });
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
// ----------------------- dashboard desktop query ---------------------- //
/* function displayDesktopScene() {
  // media query event handler
  if (matchMedia) {
    const desktop = window.matchMedia("(min-width: 1200px)");
    desktop.addListener(widthChange);
    widthChange(desktop);
  }
}

function widthChange(desktop) {
  const fooBar = desktop.matches
    ? document.body.classList.add("match-media-1-component-css")
    : document.body.classList.remove("match-media-1-component-css");
} */

// ------------ timer ---------- //
function setCurrentTime(localTime) {
  document.querySelector("#localTime").innerHTML =
    "Time: " + dateFormatter(localTime);
}
function setTimeToClose() {
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
      "We close in: " + hours + ":" + minutes + ":" + seconds;
  }, 50);
}
