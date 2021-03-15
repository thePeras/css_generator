//consts
const values = ["Shadow Color","Horizontal-offset","Vertical-offset","Blur","Spread","Opacity","Box Color","Background Color"]
const box = document.querySelector('#box');
const background_box = document.querySelector('#background_box')
const code = document.querySelector("#code")

//selectors
//color + horizontal + vertical + blur + spread
box.style.boxShadow = 'rgba(0,0,0,0.42) 41px -2px 43px 0px'
document.querySelector("#levels").querySelectorAll('input').forEach(input => input.addEventListener('change', e => InputChange(e)))


function InputChange(e){
    //select type
    let mainInput = e.target.previousElementSibling.tag === "p" ? e.target.previousElementSibling.previousElementSibling : e.target
    let index = values.indexOf(mainInput.previousElementSibling.innerHTML)
    
    if(values[index] === "Opacity") ChangeOpacityProperty();
    else if(!values[index].includes("Color")){
        //non color input
        ChangeShadowProperty(index, mainInput)
    }else{
        //color input
        if(values[index] === "Shadow Color") ChangeShadowBackground();
        if(value[index] === "Box Color") box.style.background = mainInput.value;
        if(value[index] === "Background Color") background_box.style.background = mainInput.value;
    }
}

function ChangeShadowProperty(index, input){
    let splashIndex = box.style.boxShadow.indexOf(")")
    let old_style = [box.style.boxShadow.slice(0, splashIndex + 1), ...box.style.boxShadow.slice(splashIndex + 2).split(" ")] //box.style.boxShadow.split(" ")
    old_style[index] = input.value + "px"
    let new_style = old_style.join(" ")
    box.style.boxShadow = new_style
    //for webkit etc...

    input.nextElementSibling.nextElementSibling.value = input.value
    ChangeCode(new_style)
}

function ChangeOpacityProperty(){

}
function ChangeShadowBackground(){
    
}

function ChangeCode(new_style){
    code.innerHTML = `
        <p>box-shadow: ${new_style};</p>
        <p>-moz-box-shadow: ${new_style}</p>
        <p>-webkit-box-shadow: ${new_style}</p>
    `
}
