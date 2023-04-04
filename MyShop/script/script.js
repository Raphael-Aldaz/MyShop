import { data } from "../data/data.js";
const elementTab = document.querySelector('.article__item')
const catButton = document.querySelectorAll('.list__cat__item')
const basketSection = document.querySelector('.basket__item');
let a ;
let basket = [];

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
const diplayBasket = (arr) =>{
    console.log(arr)
    const test = arr.entries.id
    basketSection.appendChild(test)
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

const handleChange = (event) => {
    
    const id = event.target.parentNode.parentNode.getAttribute('id');
    const value = parseInt(event.target.value);
    data.map((item) => {
        
    if (item.id == id) {
        
        item.Quantity = value;
        basket.push(item)
    }
    });
    const uniqueBasket = new Set(basket);
    const sortedbasket = Array.from(uniqueBasket).sort();

    diplayBasket(uniqueBasket);
}
let test = handleChange

console.log(test)
for(const sortButton of catButton){
    sortButton.addEventListener('click', getId)
}

displayData(data);
