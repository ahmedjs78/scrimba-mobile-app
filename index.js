import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref,push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://realtime-database-b4c14-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
let bomba = []
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
        shopingEl.innerHTML = ""
        renderItems(bomba)
    }else{
        shopingEl.innerHTML = ""
        renderItems(bomba)
        push(shoppingListInDB,inputValue)
    }
    
    
})

onValue(shoppingListInDB, function(snapshot){
    
    let turnSnapShotDataToArry = Object.entries(snapshot.val())
    console.log(Array.isArray(turnSnapShotDataToArry))

    
    for(let i =0 ; i < turnSnapShotDataToArry.length; i++){
    
    let currentitem = turnSnapShotDataToArry[i]
    let currentId = currentitem[0]
    let currentValue = currentitem[1]
    bomba.push(currentitem)
    }


    renderItems(bomba)
})

function clearUl() {
        shopingEl.innerHTML = "";
   
}

function renderItems(x){
    console.log('called')
    for(let i = 0;i < x.length;i++){
        let currentItem = x[i]
        let itemId = currentItem[0]
        let itemValue = currentItem[1]

        let newEl = document.createElement("li")
        newEl.textContent = itemValue
        newEl.style.cursor = 'pointer'
        newEl.addEventListener("dblclick", function() {
            let exactLocationOfBooksInDB = ref(database, "books/" + itemId)
            remove(exactLocationOfBooksInDB)

                
            
                // Once removed from the database, re-render the items
                console.log("Item removed from the database:", itemId);
    

        })
        
        shopingEl.append(newEl)
        
    }
}