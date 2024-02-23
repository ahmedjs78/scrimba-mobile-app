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
    push(shoppingListInDB,inputValue)
    
    clearINputField()
    
    renderItems(inputValue)
        
})


onValue(shoppingListInDB, function(snapshot){
    
    let turnSnapShotDataToArry = Object.values(snapshot.val())

    for(let i = 0;i <turnSnapShotDataToArry.length;i++){
       
        console.log(turnSnapShotDataToArry[i])
    
    }

    console.log(turnSnapShotDataToArry)

})

function clearINputField (){
    inputFieldEl.value = ""
    
}

function renderItems(itemsValue){
    shopingEl.innerHTML += `<li>${itemsValue}}</li>`
}