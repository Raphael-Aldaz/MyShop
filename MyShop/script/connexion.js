import { user } from "../data/data.js";
import { checkUserStorage } from "./script.js";
const conForm = document.querySelector('.connexion__form')
let userConnexion = [];

const checkUser = () => {
    console.log("b")
    const formDataConnexion = new FormData(conForm);
    
    const email = formDataConnexion.get('connexion__email')
    const pswd = formDataConnexion.get('connexion__psw')

    
    user.find((u) => {
        if(u.email === email && u.password === pswd){
            userConnexion.push(u)
        } else {
            console.log('user not found')
        }
    })
    return userConnexion
}


export const displayConnection = () => {
    const userChecked =  checkUser();
    localStorage.setItem('user', userChecked[0].email)
    checkUserStorage(); 
}