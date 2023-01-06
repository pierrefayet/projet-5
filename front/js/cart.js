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

