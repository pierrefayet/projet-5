const url = window.location.search
const urlParams = new URLSearchParams(url)
const id = urlParams.get("id")


fetch("http://localhost:3000/api/products/" + id)
.then((response) => response.json())
.then((res) => handleData(res))   

function handleData(kanap) {
  console.log({kanap})
const { altTxt, colors, description, imageUrl, name, price, _id} = kanap
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
      // option.value = color
      // option.textContent = color
      // Selection.appendChild(option)
    });
  }
}