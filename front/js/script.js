//Je récupère tous les produits et les affiches sur ma page Accueil
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    
    data.forEach(product => {
      const el = document.createElement('a');
      el.setAttribute('href',`./product.html?id=${product._id}`);
      el.innerHTML += `
      <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}"</h3>
          <p class="productDescription">${product.description}"</p>
      </article>`

      document.querySelector("#items").appendChild(el);
      
  });
}); 


