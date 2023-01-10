const url = window.location.search
const urlParams = new URLSearchParams(url)
const id = urlParams.get("id")
if (id != null) {
let kanapPrice = 0
let kanapImgUrl, kanapAltTxt, kanapName
}

fetch("http://localhost:3000/api/products/" + id)
.then((response) => response.json())
.then((res) => handleData(res))   

function handleData(kanap) {
  console.log({kanap})
kanapName = kanap.name 
kanapPrice = kanap.price
kanapImgUrl = kanap.imageUrl
kanapAltTxt = kanap.altTxt
productImg(kanap.imageUrl, kanap.altTxt)
productPrice(kanap.price)
productTitle(kanap.name)
productDescription(kanap.description)
productColors(kanap.colors)
}


function productImg(imageUrl, altTxt) {
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  const addImage = document.querySelector(".item__img")
  if (addImage != null) addImage.appendChild(image)
}
function productPrice(price) {
  const elPrice = document.querySelector("#price")
  if (price != null)  elPrice.setAttribute('price', price)
  elPrice.textContent = price
  
}

function productTitle(name) {
const elTitle  = document.querySelector("#title")
if (elTitle != null) elTitle.name = elTitle.textContent = name
}

function productDescription(description) {
const elDescription = document.querySelector("#description")
if (elDescription != null) elDescription.description = elDescription.textContent = description
}

function productColors(colors) {
  const elColors = document.querySelector("#colors")
  if(elColors != null) {
    colors.forEach((color) => {
      const option = document.createElement("option")
      option.value = color
      option.textContent = color
      elColors.appendChild(option)
    });
  }
}

const button = document.querySelector("#addToCart")
if(button != null) {
  button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value 
    if (lookIfOrderIsNotOk(color, quantity)) {
      return
    }
    recordCart(color, quantity)
    
    window.location.href = "cart.html"
  })
}

arrayOfKanapSave = []

// function recordCart(color,quantity) {
//   const object = {
//     id: id,
//     color: color,
//     quantity: Number(quantity),
//   }
//   // if(localStorage.getItem(id) !== null) {
//   //   arrayOfKanapSave = JSON.parse(localStorage.getItem(id))
//   // }
//     arrayOfKanapSave.push(object);
//     localStorage.setItem(id,  JSON.stringify(arrayOfKanapSave))
//     //localStorage.setItem(id, JSON.stringify(object))
// }
let cartItems = JSON.parse(localStorage.getItem('cart')) || []

function recordCart(color,quantity) {
  if(isNaN(quantity) || quantity <= 0) {
    alert("quantity is not valid");
    return;
  }
  const existingProduct = cartItems.find(item => item.id === id);
  if(existingProduct !== undefined) {
    existingProduct.quantity += Number(quantity);
  } else {
    const object = {
    id: id,
    color: color,
    quantity: Number(quantity),
    }
    cartItems.push(object)
  }
  localStorage.setItem("cart",  JSON.stringify(cartItems))
}




function lookIfOrderIsNotOk(color, quantity){
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("please choose a color and quantity")
    return true
  
  }
}  