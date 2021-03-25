//Consts
const values = ["Shadow Color", "Horizontal-offset","Vertical-offset","Blur","Spread","Opacity"]
const box = document.querySelector('#box');
const background_box = document.querySelector('#background_box')
const code = document.querySelector("#code")
const colors = document.querySelector("#colors").children
const scripts = document.querySelectorAll(".script")

//Initial
let initial_code = window.localStorage.getItem('code') || 'rgba(0,0,0,0.42) 41px -2px 43px 0px'
let colors_cache = window.localStorage.getItem('colors') ? window.localStorage.getItem('colors').split(",") : ["#000000", "#777777", "#3b3b3b"] //depends of style
console.log(colors_cache)
box.style.boxShadow = initial_code;
box.style.background = colors_cache[1]
background_box.style.background = colors_cache[2];
colors[0].value = colors_cache[0]
colors[1].value = colors_cache[1]
colors[2].value = colors_cache[2]
//set levels propertys
ChangeCode(initial_code)

document.querySelector("#levels").querySelectorAll('input').forEach(input => input.addEventListener('input', e => InputChange(e)))
document.querySelector("#colors").querySelectorAll('input').forEach(input => input.addEventListener('input', e => ChangeColor(e)))

function InputChange(e){
    //select type
    let mainInput = e.target.parentElement.tagName === "DIV" ? e.target : e.target.parentElement.parentElement.nextElementSibling
    let rangeBoolean =  e.target.parentElement.tagName === "DIV" ? true : false
    let index = values.indexOf(mainInput.previousElementSibling.children[0].innerHTML)
    
    let splashIndex = box.style.boxShadow.indexOf(")")
    let old_style = [box.style.boxShadow.slice(0, splashIndex + 1), ...box.style.boxShadow.slice(splashIndex + 2).split(" ")] 
    
    if(values[index] === "Opacity"){
        old_style[0] = old_style[0].split(",")
        if(old_style[0].length === 3){
            old_style[0][2] = old_style[0][2].replace(")", "")
            old_style[0].push("1)")
            console.log(old_style[0])
        }
        old_style[0].pop()
        old_style[0].push(e.target.value + ")")
        old_style[0] = old_style[0].join(", ")
    }else old_style[index] = e.target.value + "px"

    let new_style = old_style.join(" ")
    box.style.boxShadow = new_style
    //for webkit etc...

    if(rangeBoolean) mainInput.previousElementSibling.children[1].children[0].value = e.target.value
    if(!rangeBoolean) mainInput.value = e.target.value
    
    ChangeCode(new_style)
}
function ChangeColor(e){
    switch(e.target.name){
        case "shadow":
            let splashIndex = box.style.boxShadow.indexOf(")")
            let old_style = [box.style.boxShadow.slice(0, splashIndex + 1), ...box.style.boxShadow.slice(splashIndex + 2).split(" ")] 
        
            let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.target.value);
            rgb.shift()
            rgb = rgb.map(color => parseInt(color, 16))

            old_style[0] = "rgba(" + rgb.join(", ") +  "," + old_style[0].split(",")[3]
            console.log(old_style[0])
            let new_style = old_style.join(" ")
            box.style.boxShadow = new_style
            ChangeCode(new_style)

            colors_cache[0] = e.target.value;
            window.localStorage.setItem('colors',colors_cache)
            break;
        case "box":
            box.style.background = e.target.value
            colors_cache[1] = e.target.value;

            window.localStorage.setItem('colors', colors_cache)
            break;
        case "background": 
            background_box.style.background = e.target.value;
            colors_cache[2] = e.target.value;
            window.localStorage.setItem('colors', colors_cache)
            break;
    }
}

function ChangeCode(new_style){
    scripts.forEach(script => script.innerHTML = new_style)
    window.localStorage.setItem("code", new_style)
}