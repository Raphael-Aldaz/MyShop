import { data } from "../data/data.js";
const elementTab = document.querySelector('.article__item')
const catButton = document.querySelectorAll('.list__cat__item')

let a ;

const displayData = (arr) => {
   elementTab.innerHTML=""
    
    arr.map((e) => {
        const elementTr = document.createElement('tr')
        elementTr.setAttribute('id', e.id)
        
        elementTab.appendChild(elementTr)

        for(const [key, item] of Object.entries(e)){
            if(key === 'Quantity'){
                const elementTd = document.createElement('td')
                const elementInput = document.createElement('input')

                elementInput.setAttribute('type', 'number')
                elementInput.setAttribute('min', '0')
                elementInput.setAttribute('value', 0)
                elementInput.classList = 'quantity__articles'

                elementInput.addEventListener('change',handleChange)
                elementInput.addEventListener('click',  ()=> {
                    a = e
                })
              
                elementTr.appendChild(elementTd)
                elementTd.appendChild(elementInput)
            }
            if(key != 'category' && key != 'Quantity'){
                const elementTd = document.createElement('td')
                const elementTdText = document.createTextNode(item)
                elementTd.appendChild(elementTdText)
                elementTr.appendChild(elementTd)
            }
        }

    })
}

const getId = (e) => {
    const newData = [];
    data.map((article)=> {
        if(e.target.id === article.category){
            newData.push(article)
        } else if (e.target.id === "All"){
            newData.push(article)
        }
    })
    displayData(newData);
    }
const handleChange =(e) => {
 const basket = []
 basket.push(a)
 if(a  < 0){
    console.log("vide")
 } else {
    console.log(basket)
 }
 

}

for(const sortButton of catButton){
    sortButton.addEventListener('click', getId)
}

displayData(data);
