const url = window.location.search
const urlParams = new URLSearchParams(url)
const id = urlParams.get("id")
if (id != null) {
let kanapPrice = 0
let kanapImgUrl, kanapAltTxt
}

fetch("http://localhost:3000/api/products/" + id)
.then((response) => response.json())
.then((res) => handleData(res))   

function handleData(kanap) {
  console.log(kanap)
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
function productPrice(kanap.price) {
  const elPrice = document.querySelector("#price")
  if (price != null) elPrice.price = elPrice.textContent = kanap.price
}

function productTitle(kanap.name) {
const elTitle  = document.querySelector("#title")
if (elTitle != null) elTitle.name = elTitle.textContent = kanap.name
}

function productDescription(kanap.description) {
const elDescription = document.querySelector("#description")
if (elDescription != null) elDescription.description = elDescription.textContent = kanap.description
}

function productColors(kanap.colors) {
  const elColors = document.querySelector("#colors")
  if(elColors != null) {
    kanap.colors.forEach((color) => {
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
    
    recordCart(kanap.color, kanap.quantity)
    
    window.location.href = "cart.html"
  })
}

const productArray = []
function recordCart(color,quantity) {
  const object = {
    id: id,
    color: color,
    quantity: Number(quantity),
  }
  if (localStorage.getItem(object) !== null) 
  productArray = localStorage.setItem(id, JSON.stringify(object))


  console.log(productArray )
}
function lookIfOrderIsNotOk(color, quantity){
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("please choose a color and quantity")
    return true
  }
}