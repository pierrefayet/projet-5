const cart = []

findAndParseProduct()

cart.forEach((product) => displayProduct(product))

function findAndParseProduct() {
    const obectAdded = localStorage.length
    for(let i = 0; i < obectAdded; i++) {
        const product = localStorage.getItem(localStorage.key(i))
        const productObject = JSON.parse(product)
        cart.push(productObject)

    }
    
    
}

// altTxt
// : 
// "Photo d'un canapé d'angle, vert, trois places"
// color
// : 
// "Green"
// id
// : 
// "055743915a544fde83cfdfc904935ee7"
// imageUrl
// : 
// "http://localhost:3000/images/kanap03.jpeg"
// price
// : 
// 3199
// quantity
// : 


function displayProduct(product){
    const article = createArticle(product)
    displayArticle(article)
    productImgForDiv(product)
    const div = productImgForDiv(product)
    article.appendChild(div)

    const cardItemcontent = cardItemcontent(product)
    article.appenchild(cardItemcontent)
    displayArticle(article)

}

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
    description.classList.add(cart__item__content__description)

    const h2 = document.createElement("h2")
    h2.textContent = product.name

    const pColor = document.createElement("p")
    pColor.textContent = product.color

    const pPrice = document.createElement("p")
    pPrice.textContent = product.price + "€"

    description.appendChild(h2, pColor, pPrice)
    div.appenchild(description)
    console.log(div)
    return div
}

// <!-- <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//                 <div class="cart__item__img">
//                   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//                 </div>
//                 <div class="cart__item__content">
//                   <div class="cart__item__content__description">
//                     <h2>Nom du produit</h2>
//                     <p>Vert</p>
//                     <p>42,00 €</p>
//                   </div>
//                   <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                       <p>Qté : </p>
//                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                       <p class="deleteItem">Supprimer</p>
//                     </div>
//                   </div>
//                 </div>
//               </article> -->