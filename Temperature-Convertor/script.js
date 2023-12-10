
let res=document.getElementById("result");
let convert_heading = document.getElementById("ConvertHeading");
let temp= document.getElementById("Temperature");
let inputSymbol= document.getElementById("inputSymbol");
let resultSymbol = document.getElementById("resultSymbol");
function fToC(){
    convert_heading.innerText= "Fahrenhite to Celsius";
    inputSymbol.innerHTML="&deg;F";
    resultSymbol.innerHTML="&deg;C";
    dropdown();
}
function cToF(){
    convert_heading.innerText= "Celsius to Fahrenhite";
    inputSymbol.innerHTML="&deg;C";
    resultSymbol.innerHTML="&deg;F";
    dropdown();
}
function kToC(){
    convert_heading.innerText= "Kelvin to Celsius";
    inputSymbol.innerHTML="K";
    resultSymbol.innerHTML="&deg;C";
    dropdown();
}
function cToK(){
    convert_heading.innerText= "Celsius to Kelvin";
    inputSymbol.innerHTML="&deg;C";
    resultSymbol.innerHTML="K";
    dropdown();
}
function fToK(){
    convert_heading.innerText= "Fahrenhite to Kelvin";
    inputSymbol.innerHTML="&deg;F";
    resultSymbol.innerHTML="K";
    dropdown();
}
function kToF(){
    convert_heading.innerText= "Kelvin to Fahrenhite";
    inputSymbol.innerHTML="K";
    resultSymbol.innerHTML="&deg;F";
    dropdown();
}
function inputSymbolClicked(){
    dropdown();
}

function convert(){
    temperature= temp.value;
    if(temperature==""){
        res.innerText = "Please enter something!"
    } else{
    if(convert_heading.innerText == "Fahrenhite to Celsius"){
        res.innerText = (temperature-32)*(5/9);
    }
    if(convert_heading.innerText == "Celsius to Fahrenhite"){
        res.innerText = (temperature*9/5)+32;
    }
    if(convert_heading.innerText == "Kelvin to Celsius"){
        res.innerText = temperature-273.15;
    }
    if(convert_heading.innerText == "Celsius to Kelvin"){
        res.innerText = (temperature/1+273.15); //dividing by 1 so that it doesn't get concatinated as a string
    }
    if(convert_heading.innerText == "Fahrenhite to Kelvin"){
        res.innerText = (temperature-32)*5/9+273.15;
    }
    if(convert_heading.innerText == "Kelvin to Fahrenhite"){
        res.innerText = (temperature-273.15)*9/5+32;
    }}
}
function clr(){
    temp.value=null;
    res.innerText="";
}
// options menu js
let drop = document.getElementById("drop");
function dropdown(){
    if(drop.style.height=="0px"){
        drop.style.height="150px";
        drop.style.border="2px solid var(--hover-color)";
    } else{
        drop.style.height="0px";
        drop.style.border="none";
    }
}
// menu toggle js

let menuline1=document.getElementById("menuline1");
let menuline2=document.getElementById("menuline2");
let menuline3=document.getElementById("menuline3");
let menuicon=document.getElementById("menuicon");
menuline1.style.transform="none";
let sidebar=document.getElementById("sidebar");
function toggleMenu(){
    if (menuline1.style.transform=="none"){
        menuline1.style.position="relative";
        menuline1.style.top="7px";
        menuline1.style.transform="rotate(45deg)";
        menuline2.style.transform="rotateY(90deg)";
        menuline3.style.transform="rotate(-45deg)";
        menuline3.style.position="relative";
        menuline3.style.bottom="7px";
        sidebar.style.width="50vw"
    }
    else
    {
        menuline1.style.transform="none";
        menuline2.style.transform="none";
        menuline3.style.transform="none";
        menuline1.style.position="sticky";
        menuline3.style.position="sticky";
        sidebar.style.width="0vw";
    }
}