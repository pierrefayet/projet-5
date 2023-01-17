const url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get("id");
let kanapPrice = 0;
let kanapImgUrl;
let kanapAltTxt;
let kanapName;
fetch(`http://localhost:3000/api/products/${id}`).then((response) => response.json()).then((res) => handleData(res));

function handleData(kanap) {
	productImg(kanap.imageUrl, kanap.altTxt);
	productPrice(kanap.price);
	productTitle(kanap.name);
	productDescription(kanap.description);
	productColors(kanap.colors);
}

function productImg(imageUrl, altTxt) {
	const image = document.createElement("img");
	image.src = imageUrl;
	image.alt = altTxt;
	const addImage = document.querySelector(".item__img");
	addImage.appendChild(image);
}

function productPrice(price) {
	const elPrice = document.querySelector("#price");
	elPrice.setAttribute("price", price);
	elPrice.textContent = price;
}

function productTitle(name) {
	const elTitle = document.querySelector("#title");
	elTitle.textContent = name;
	elTitle.name = elTitle.textContent;
}

function productDescription(description) {
	const elDescription = document.querySelector("#description");
	elDescription.textContent = description;
	elDescription.description = elDescription.textContent;
}

function productColors(colors) {
	const elColors = document.querySelector("#colors");
	colors.forEach((color) => {
		const option = document.createElement("option");
		option.value = color;
		option.textContent = color;
		elColors.appendChild(option);
	});
}
const button = document.querySelector("#addToCart");
button.addEventListener("click", () => {
	const color = document.querySelector("#colors").value;
	const quantity = document.querySelector("#quantity").value;
	if(lookIfOrderIsNotOk(color, quantity)) {
		return;
	}
	recordCart(color, quantity);
	window.location.href = "cart.html";
});
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function recordCart(color, quantity) {
	const existingProduct = cartItems.find(item => item.id === id && item.color === color);
	if(existingProduct !== undefined) {
		existingProduct.quantity += Number(quantity);
	} else {
		const object = {
			id: id,
			color: color,
			quantity: Number(quantity),
		}
		cartItems.push(object);
	}
	localStorage.setItem("cart", JSON.stringify(cartItems));
}
// si le client n'a pas renseigné tout les champs renvoi un message d'erreur
function lookIfOrderIsNotOk(color, quantity) {
	if(color == null || color === "" || quantity == null || quantity == 0 || isNaN(quantity) || quantity <= 0) {
		alert("please choose a color and quantity");
		return true;
	} else {
		return false;
	};
}