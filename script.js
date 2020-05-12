"use strict"

document.addEventListener("DOMContentLoaded", start);

function start(){
    fetchData();
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
    });

}

function init(data) {
    console.log(data);
    //-----find current time-----//
    //console.log(data.timestamp)
    setUpTime(data.timestamp);
    //-----bartenders-----//
    //console.log(data.bartenders)
    data.bartenders.forEach(bartendersUnit);
    //data.taps.forEach(tapsUnit);
    console.log(data.taps)
    data.taps.forEach(tapsUnit);
 
}

//-----------------------------------TIME--------------------------------------//
function setUpTime(localTime) {
    //console.log(localTime)
}

//-----------------------------------BARTENDERS--------------------------------------//

function bartendersUnit(oneBartender){
    //console.log(oneBartender)
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
    console.log(showTap)
    console.log(showTap.beer)
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