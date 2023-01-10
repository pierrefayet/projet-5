
const cart = [];

// Récupérer les produits depuis le LocalStorage et les stocker dans le tableau
function findAndParseProduct() {
    for(let i = 0; i < localStorage.length; i++) {
        const productString = localStorage.getItem(localStorage.key(i));
        const product = JSON.parse(productString);
        cart.push(product);
    }
    return cart;
}
const myCart = findAndParseProduct();

// Pour chaque produit, créer les éléments HTML et les ajouter à la structure
cart.forEach((product) => {
    const article = createArticle(product);
    displayArticle(article);
    const imgDiv = productImgForDiv(product);
    article.appendChild(imgDiv);

    const cardItemcontent = cardItemContent(product);
    article.appendChild(cardItemcontent);
});

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function createArticle(product) {
    const article = document.createElement("article")
    
    article.classList.add("cart__item")
    article.dataset.id = product.id
    article.dataset.color = product.color
    return article
}

function productImgForDiv(product) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = product.imageUrl
    image.alt = product.altTxt
    div.appendChild(image)
    return div
}

function cardItemContent(product) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content")

    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = product.name

    const pColor = document.createElement("p")
    pColor.textContent = product.color

    const pPrice = document.createElement("p")
    pPrice.textContent = product.price + " €"


    return div

}

