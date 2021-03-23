//consts
const values = ["Shadow Color", "Horizontal-offset","Vertical-offset","Blur","Spread","Opacity"]
const box = document.querySelector('#box');
const background_box = document.querySelector('#background_box')
const code = document.querySelector("#code")
const colors = document.querySelector("#colors").children
const scripts = document.querySelectorAll(".script")

//selectors
//color + horizontal + vertical + blur + spread
box.style.boxShadow = 'rgba(0,0,0,0.42) 41px -2px 43px 0px';
box.style.background = '#777777'
background_box.style.background = 'rgb(59, 59, 59)';
colors[0].value = "#000000"
colors[1].value = "#777777"
colors[2].value = "#3b3b3b"
ChangeCode("41px -2px 43px 0px rgba(0,0,0,0.42)")

document.querySelector("#levels").querySelectorAll('input').forEach(input => input.addEventListener('input', e => InputChange(e)))
document.querySelector("#colors").querySelectorAll('input').forEach(input => input.addEventListener('input', e => ChangeColor(e)))


function InputChange(e){
    //select type
    let mainInput = e.target.parentElement.tagName === "DIV" ? e.target : e.target.parentElement.parentElement.nextElementSibling
    let index = values.indexOf(mainInput.previousElementSibling.children[0].innerHTML)
    
    ChangeShadowProperty(index, mainInput)

}
function ChangeColor(e){
    switch(e.target.name){
        case "shadow":
            
            break;
        case "box":
            box.style.background = e.target.value
            break;
        case "background": background_box.style.background = e.target.value;
    }
}
function ChangeShadowProperty(index, input, value = input.value){
    let splashIndex = box.style.boxShadow.indexOf(")")
    let old_style = [box.style.boxShadow.slice(0, splashIndex + 1), ...box.style.boxShadow.slice(splashIndex + 2).split(" ")] //box.style.boxShadow.split(" ")
    console.log(old_style)
    if(values[index] === "Opacity"){
        old_style[0] = old_style[0].split(",")
        old_style[0].pop()
        old_style[0].push(value + ")")
        old_style[0] = old_style[0].join(", ")
    }else old_style[index] = value + "px"

    let new_style = old_style.join(" ")
    box.style.boxShadow = new_style
    //for webkit etc...

    input.previousElementSibling.children[1].children[0].value = value
    ChangeCode(new_style)
    box.style.boxShadow = new_style
}

function ChangeOpacityProperty(){

}
function ChangeShadowBackground(){
    
}

function ChangeCode(new_style){
    scripts.forEach(script => script.innerHTML = new_style)
}
