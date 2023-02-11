const menuArray = [
  {
    name: "Pizza",
    ingredients: ["pepperoni", "mushroom", "mozarella"],
    id: 0,
    price: 14,
    emoji: "🍕",
  },
  {
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    emoji: "🍔",
    id: 1,
  },
  {
    name: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 8,
    emoji: "🍺",
    id: 2,
  }, 
  {
    name: "Fries",
    ingredients: ["potato, love"],
    price: 4,
    emoji: "🍟",
    id: 3,
  }, 
];

let foodItems = "";
let orderedItems = [];
let totalAmount = 0

document.addEventListener('click', (e) => {
    if(e.target.classList.value === "remove"){
        let targetId = Number(e.target.id)
        const removedItem = orderedItems.splice(targetId,1)[0]
        generateBill()
        totalAmount -= removedItem.price
        renderTotal()

    }
    if(e.target.id === "complete-order"){
        toggleCheckout(true)
    }
    if(e.target.id === "exit-confirmation"){
        document.getElementById('confirmation-screen').classList.add('hidden')
    }
})

//displays the menu items, COMPLETED DONT TOUCH
function generateItems() {
    menuArray.forEach((item) => {
      foodItems += `
      <div class = "main-food-container">
              <div class = 'image'>
                  <p class = "food-img"> ${item.emoji} </p>
              </div>
              <div class = 'food-info'>
                  <h3 class = "food-item">${item.name}</h3>
                  <h4 class = 'ingredients'> ${item.ingredients} </h4>
                  <p class = 'price'> $${item.price} </p>  
              </div>
          <div class = 'add-to-cart'>
              <button id ='add' data-item = ${item.id}> + </button>
          </div>
      </div>
      `;
      render();
    });
  }

//Listens for click event on (+) button, and gets the id of the item that was added

document.addEventListener("click", (e) => {
    if(e.target.id === "add"){
        getOrderArray(e.target.dataset.item)
    }
});


//Creates a new object that filters out the item that was clicked based on its id, then renderBill() is called to add it to the bill

function getOrderArray(id) {
    const newArray = menuArray.filter(item => {
        return Number(id) === item.id })[0]

    orderedItems.push(newArray) 
    calculateTotal(newArray)
    generateBill()
}

function generateBill(){
    let billItems = ""
    orderedItems.forEach((item,i) => {
        billItems += `
        <div>
            <div class = "item-order">
                    <p class ='item-name'>${item.name}</p>
                    <p class ='remove' id = ${i}>remove</p>
                    <p class = 'item-price'>$${item.price}</p>
            </div>
        </div>`
        })
    renderBill(billItems)
}

function calculateTotal(array){
    totalAmount += array.price
    renderTotal()
}



function render(items) {
  document.getElementById("food-container").innerHTML = foodItems;
}

function renderBill(billItems){
    document.getElementById('order').innerHTML = billItems

}

function renderTotal(){
    document.getElementById('total-amount').innerHTML = `<p> $${totalAmount} </p>`
}

generateItems();


//PAYMENT SCREEN CODE

function toggleCheckout(isReady){
    if(isReady){
        document.getElementById('payment-screen').classList.remove('hidden')
    }else{
        document.getElementById('payment-screen').classList.add('hidden')
    }
}


//return to cart - hides the payment screen
document.getElementById('return-to-cart').addEventListener('click', () => toggleCheckout(false))

// payment completed - brings up the confirmation screen and logs out name of customer

document.getElementById('complete-payment').addEventListener('submit', (e) => {
    e.preventDefault()
    const loginFormData = new FormData(document.getElementById('complete-payment'))
    const name = loginFormData.get('name')
    generateConfirmation(name)
})

function generateConfirmation(name){
    toggleCheckout(false)
    document.getElementById('confirmation-screen').classList.remove('hidden')
    document.getElementById('confirmation-screen').innerHTML = `
    <div>
        <p class ='confirmation-text'>Thank you for shopping with us today, ${name}. </p>
        <p class ='confirmation-text'> Your order will be ready in 10 hours </p>
        <button id = "exit-confirmation"> X </button>
    </div>
    `
}

