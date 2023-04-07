import { data } from "../data/data.js";
import { displayConnection } from "../script/connexion.js";


const elementTab = document.querySelector('.article__item')
const catButton = document.querySelectorAll('.list__cat__item')
const basketSection = document.querySelector('.basket__item');
const validate = document.querySelector('.validateBasket')
const paye = document.querySelector('.private__data__form')
const cardData = document.querySelector('.card__data')
const cardBasket = document.querySelector('.card__basket');
const card = document.querySelector('.card')
const conForm = document.querySelector('.connexion__form')


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
const displayBasket = (arr, node) =>{
    node.innerHTML=''
    
    for(let i in arr){
    const articleBasket = document.createElement('div')
    
    const articleBasketText = document.createTextNode("id : " + arr[i].id +"  " + arr[i].name + " " + arr[i].brand + " "+ arr[i].price +"€" + " Quantité : " + arr[i].Quantity)
    articleBasket.appendChild(articleBasketText)
    node.appendChild(articleBasket)

        if(arr[i].Quantity === 0){
            articleBasket.innerHTML='';
        }
    }
    const priceBasket =addition(arr)
    const totalBasket = document.createElement("div");
    const totalBasketText = document.createTextNode("Prix total de la commande : " + priceBasket )
    totalBasket.appendChild(totalBasketText)
    node.appendChild(totalBasket)

    validate.classList.add( "validateBasketShow")
    if(arr[0].Quantity === 0){
        validate.classList.remove("validateBasketShow")
    }
    if(priceBasket === 0){
        node.innerHTML=''
    }
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
    let uniqueBasket = [];
    let uniqueObject = {};
    const id = event.target.parentNode.parentNode.getAttribute('id');
    
    const value = parseInt(event.target.value);
    data.map((item) => {  
    if (item.id == id) {  
        item.Quantity = value;
        basket.push(item)
    }
    });

    for (let i in basket) {
        let objId = basket[i]['id'];
        uniqueObject[objId] = basket[i];
    }
    for ( let i in uniqueObject) {
        uniqueBasket.push(uniqueObject[i]);
    }

    displayBasket(uniqueBasket, basketSection)
    displayBasket(uniqueBasket,cardBasket)
}
const addition = (arr) => {
    let amount = 0;
    for(let i =0 ; i <arr.length; i++){
        amount += ((arr[i].price) * (arr[i].Quantity))
        }
        return amount
}
const sendData = (e) => {
    e.preventDefault();
    const formData = new FormData(paye);
    
    const dataSend = [];

    for (const i of formData) {
    dataSend.push(i)
    console.log(dataSend, "poile")
    }
    setTimeout(() => {
        displayCard(dataSend,cardData )
    }, 2000)

    return dataSend
}

const displayCard = (dataCustommer,node) => {
    const min=100000; 
    const max=999999;  
    const  random = Math.round(Math.random() * (max - min) + min) ;
    const orderNumber = document.querySelector('.order__number');
    orderNumber.textContent = random;
    card.classList.add('cardShow')
    for(let i of dataCustommer){
        const name = document.createElement('p')
        const nameText = document.createTextNode(i[0] + " : " +i[1]) ;
        name.appendChild(nameText)
        node.appendChild(name)
        console.log(i[1])
    }
    
    
}

const checkUserStorage = () => {
    let a ;
    if(!localStorage.getItem('user')){
        conForm.addEventListener('submit',displayConnection)
        conForm.classList.replace('connexion__form--hidden', 'connexion__form--show')
        
    } else {
        a = localStorage.getItem('user')
        const form = document.querySelector('.private__data')
        form.classList.replace('hiddenForm', 'showForm')
    }
    return a;
}
for(const sortButton of catButton){
    sortButton.addEventListener('click', getId)
}
validate.addEventListener('click', ()=>{
    checkUserStorage();
    const form = document.querySelector('.private__data')
    form.classList.replace('hiddenForm', 'showForm')
})
paye.addEventListener('submit', sendData)

displayData(data);

