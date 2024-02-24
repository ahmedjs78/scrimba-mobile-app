import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref,push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://realtime-database-b4c14-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "books")


const shopingEl = document.getElementById("shopping-list")
const inputFieldEl = document.querySelector(".input-field")
const addButtonEl = document.querySelector(".add-button")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue.trim() === "" ){
        inputFieldEl.placeholder = "Please enter a value";
    }else{
        renderItems(listItems)
        push(shoppingListInDB,inputValue)
    }
    
    
})


onValue(shoppingListInDB, function(snapshot){
    clearUl ()
    let turnSnapShotDataToArry = Object.values(snapshot.val())
    console.log(Array.isArray(turnSnapShotDataToArry))
    let listItems = ""
    for(let i = 0;i < turnSnapShotDataToArry.length;i++){
        listItems += `<li>${turnSnapShotDataToArry[i]}</li>`

    }
    renderItems(listItems) 

})

function clearUl (){
    inputFieldEl.innerHTML = ""
    
}

function renderItems(itemsValue){
    shopingEl.innerHTML = itemsValue
}