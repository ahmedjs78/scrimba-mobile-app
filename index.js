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
    clearUl()
    let inputValue = inputFieldEl.value
    if(inputValue.trim() === "" ){
        inputFieldEl.placeholder = "Please enter a value";
        renderItems(bomba)
    }else{
        renderItems(bomba)
        push(shoppingListInDB,inputValue)
    }
    
    
})
let bomba 
onValue(shoppingListInDB, function(snapshot){
    clearUl()
    let turnSnapShotDataToArry = Object.entries(snapshot.val())
    console.log(Array.isArray(turnSnapShotDataToArry))

    let currentValue
    for(let i =0 ; i < turnSnapShotDataToArry.length; i++){
    
    let currentitem = turnSnapShotDataToArry[i]
    console.log(currentitem)
    let currentId = currentitem[0]
    currentValue = currentitem[1]
    console.log(currentValue)

    }



    bomba = currentValue
    
    renderItems()
})

function clearUl(){
    shopingEl.innerHTML = ""
}

function renderItems(x){
    let listItems = ""
    for(let i = 0;i < 8;i++){
        listItems += `<li>${x}</li>`
    }
    
    shopingEl.innerHTML = listItems
}