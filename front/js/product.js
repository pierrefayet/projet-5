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
  console.log({kanap})
const { altTxt, colors, description, imageUrl, name, price} = kanap
kanapPrice= price
kanapImgUrl = imageUrl
kanapAltTxt = altTxt
productImg(imageUrl, altTxt)
productPrice(price)
productTitle(name)
productDescription(description)
productColors(colors)
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
  if (price != null) elPrice.price = elPrice.textContent = price
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


function recordCart(color,quantity) {
  const object = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: kanapPrice,
    imageUrl: kanapImgUrl,
    altTxt: kanapAltTxt 
  }
  localStorage.setItem(id, JSON.stringify(object))
}
function lookIfOrderIsNotOk(color, quantity){
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("please choose a color and quantity")
    return true
  }
}