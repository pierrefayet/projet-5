//je calcule le prix par rapport au la quantité
function setTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach((product) => {
        totalPrice += product.price * product.quantity;
    })
    const totalPriceEl = document.querySelector('#totalPrice');
    totalPriceEl.textContent = totalPrice;
}

//je récupère le produit avec l'api et parcours le tableau pour récupérer ses données et les insérer dans le html 
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = 0;

cart.forEach((product) => {
    fetch(`http://localhost:3000/api/products/${product.id}`)
        .then((response) => response.json())
        .then((res) => {
            issueDeSecour = res.name;
            product.name = res.name;
            product.imageUrl = res.imageUrl;
            product.altTxt = res.altTxt;
            product.price = res.price;
            product.quantity;
            const article = document.createElement("article");
            article.classList.add("cart__item");
            article.dataset.id = product.id;
            article.dataset.color = product.color;
            document.querySelector("#cart__items").appendChild(article);
            const div = document.createElement("div");
            div.classList.add("cart__item__img");
            const image = document.createElement("img");
            image.src = product.imageUrl;
            image.alt = product.altTxt;
            div.appendChild(image);
            article.appendChild(div);

            const divContent = document.createElement("div");
            divContent.classList.add("cart__item__content");

            const description = document.createElement("div");
            const h2 = document.createElement("h2");
            h2.textContent = product.name;
            description.appendChild(h2);

            description.classList.add("cart__item__content__description");
            divContent.appendChild(description);

            const pColor = document.createElement("p");
            pColor.textContent = product.color;
            description.appendChild(pColor);

            const pPrice = document.createElement("p");
            pPrice.textContent = product.price + " €";
            description.appendChild(pPrice);
            article.appendChild(divContent);

            const divContentSetting = document.createElement("div");
            divContentSetting.classList.add("cart__item__content__settings");
            divContent.appendChild(divContentSetting);;

            const divContentSettingQuantity = document.createElement("div");
            divContentSettingQuantity.classList.add("cart__item__content__settings__quantity");
            divContentSetting.appendChild(divContentSettingQuantity);

            const inputQuantity = document.createElement("input");
            inputQuantity.id = "itemQuantity";
            inputQuantity.name = "itemQuantity";
            inputQuantity.min = "1";
            inputQuantity.max = "100";
            inputQuantity.type = "number";
            inputQuantity.value = product.quantity;
            divContentSetting.appendChild(inputQuantity);
            inputQuantity.addEventListener('change', (event) => {
                const productToUpdate = cart.find(item => item.id === product.id && item.color === product.color)
                productToUpdate.quantity = event.target.value;
                setTotalPrice(cart);
                localStorage.setItem('cart', JSON.stringify(cart));
            })

            setTotalPrice(cart);
            const divContentDelete = document.createElement("div");
            divContentDelete.classList.add("cart__item__content__settings__delete");
            divContentSetting.appendChild(divContentDelete);

            const pDelete = document.createElement("p");
            pDelete.classList.add("deleteItem");
            pDelete.textContent = "Supprimer";
            divContentDelete.appendChild(pDelete);

            pDelete.addEventListener("click", function (event) {
                article.remove();
                cart = cart.filter(item => item.id !== product.id && item.color !== product.color);
                setTotalPrice(cart);
                localStorage.setItem('cart', JSON.stringify(cart));
            });

        })
});
//creer un nouveau array contact et on pousse dedans l'articleet on vérifie que les champs sont au bon format
const regexName = /^[A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ'-\s]+$/i;
const regexAddress = /^[A-za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9-\s]{5,200}$/;
const regexEmail = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
contact = [];
let inputFirstName = document.querySelector("#firstName");

inputFirstName.addEventListener('change', (event) => {
    if (!regexName.test(event.target.value)) {
        const errorFirstNameMsg = document.querySelector('#firstNameErrorMsg');
        errorFirstNameMsg.textContent = "saisir votre prénom en toute lettre sans chiffre";
        alert("saisir votre prénom en toute lettre sans chiffre");
    }
})

let inputLastName = document.querySelector("#lastname");
inputLastName.addEventListener('change', (event) => {
    if (!regexName.test(event.target.value)) {
        const errorLastNameMsg = document.querySelector('#lastNameErrorMsg');
        errorLastNameMsg.textContent = "saisir votre nom de famille en toute lettre sans chiffre";
        alert("saisir votre nom de famille en toute lettre sans chiffre");
    }
})

let inputAddress = document.querySelector("#address");
inputAddress.addEventListener('change', (event) => {
    if (!regexAddress.test(event.target.value)) {
        const errorAddressErrorMsg = document.querySelector('#addressErrorMsg');
        errorAddressErrorMsg.textContent = "l'adresse doit contenir que des lettres sans ponctuation et des chiffres";
        alert("l'adresse doit contenir que des lettres sans ponctuation et des chiffres");
    }
})

let inputCity = document.querySelector("#city");
inputCity.addEventListener('change', (event) => {
    if (!regexAddress.test(event.target.value)) {
        const errorCityMsg = document.querySelector('#cityErrorMsg');
        errorCityMsg.textContent = "saisir votre ville en toute lettre";
        alert("saisir votre ville en toute lettre");
    }
})

let inputMail = document.querySelector("#email");
inputMail.addEventListener('change', (event) => {
    if (!regexEmail.test(event.target.value)) {
        const errorMailMsg = document.querySelector('#emailErrorMsg');
        errorMailMsg.textContent = "saisir votre mail comme ceci: eaze@ada.ada";
        alert("saisir votre mail comme ceci: eaze@ada.ada");
    }
})
const submitValidation = document.querySelector('#order');
const formErrorMsg = document.createElement('p');
formErrorMsg.classList.add('error_form_not_valid');
submitValidation.appendChild(formErrorMsg);

const inputCheked = document.querySelector("#order");
inputCheked.addEventListener('click', (e) => {
    
    if (
        !inputFirstName.value ||
        !inputLastName.value ||
        !inputCity.value ||
        !inputAddress.value ||
        !inputMail.value ||
        cart.length === 0 ||
        !localStorage.length
        
    ) {
        alert("veuillez renseigner tous les champs");
        e.prevent.default()
    } else {
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        }
        
        let products = [];
        localStorage.getItem('cart')
        cart.forEach((product) => {
        products.push(product.id);
        });
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact, products })
        })
            .then((response) => response.json())
            .then((res) =>  {
            localStorage.clear();
            window.location.href = `confirmation.html?orderId=${res.orderId}`;
            })
    }
})












