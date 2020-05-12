"use strict"

document.addEventListener("DOMContentLoaded", init);

function init(){
    fetchData();
}

const url = "https://beer-waffle.herokuapp.com/";

function fetchData(){

    fetch (url, {
        method: "get",
    })

    .then((e)=>e.json())
    .then((e)=> {
        console.log(e);
       // showData(e);
    });

}

function showData(data) {
    console.log(data);
}