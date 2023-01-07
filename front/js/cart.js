const cart = []

findAndParseProduct()
cart.forEach((product) => displayProduct(product))

function findAndParseProduct() {
    const obectAdded = localStorage.length
    for(let i = 0; i <= obectAdded; i++) {
        const product = localStorage.getItem(localStorage.key(i))
        const productObject = JSON.parse(product)
        cart.push(productObject)
    }
}

function displayProduct(product){
    const article = createArticle(product)
 const imageProduct = productImg(product)
}

function productImg(product) {
    const img = document.createElement("img")
    img.src = product.ImageUrl
    img.alt = product.altTxt
    return img
}

// function createArticle(product) {
//     const article = 
// }


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