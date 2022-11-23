
const productsList = document.querySelector(".products-list");
const cartProductList = document.querySelector('.cart-content__list');
const cartEl = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart_quantity');
const fullPrice = document.querySelector('.fullprice');
const orderModalOpenProd = document.querySelector(".fa-caret-down");
const orderModalList = document.querySelector('.order-modal__list');
let price = 0;
const shoppingCart =  document.querySelector(".fa-cart-shopping");
let selectorInputTel = document.querySelectorAll('input[type="tel"]');
let productArray = [];



function fetchProducts() {
  fetch("../data/products.json")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((product) => renderProductList(product))
    .catch((error) => console.log(error));
}

fetchProducts();

const plusFullPrice = (currentPrice) => {
  return price += currentPrice;
}

const minusFullPrice = (currentPrice) => {
  return price -= currentPrice;;
}

const printFullPrice = () => {
  fullPrice.innerHTML = `${price} kr.`;
}

const printQuantity = () => {
  let length = document.querySelector(".cart-content__list").children.length;
  cartQuantity.textContent = length;
  length > 0 ? cartEl.classList.add("active") : cartEl.classList.remove("active");
  length > 0 ?  shoppingCart.classList.add("active") : shoppingCart.style.color = "var(--light-grey-color)";
}



// const randomOrderNumber = document.querySelector('.order-modal__number span').textContent;
// randomNumber(randomOrderNumber);

function renderProductList(product) {
    const markup = product
      .map((product) => {
        if (product.recommended === true)
        { 
        return `<li class="product-item" id="${product.id}">
        <img class="product-image" src="${product.image}">
        <p class="product-title">${product.title}</p>
        <p class="product-price">${product.price} kr.</p>
        ${product.discountInPercent ? `<div class="discount">Spar ${product.discountInPercent}%</div>` : ''}
        <button type="button" class="btn-product">Læg i kurv</button>
        </li>`
        }})

        .join("");
    productsList.innerHTML = markup;

    const productsBtn = document.querySelectorAll('.btn-product');
    

    productsBtn.forEach(el => {
    let idEl =  el.closest(".product-item").getAttribute("id");
    
    el.addEventListener("click",  (e) => {
    let self = e.currentTarget;
    let parent = self.closest(".product-item");
    let imgEl = parent.querySelector(".product-image").getAttribute('src');
    let titleEl = parent.querySelector(".product-title").textContent;
    let priceEl = parseInt(parent.querySelector(".product-price").textContent);
   
    plusFullPrice(priceEl);
    document.querySelector(".cart-content__list").insertAdjacentHTML("afterbegin", generateCartProduct(imgEl, titleEl, priceEl, idEl));
    printFullPrice();
    printQuantity();
    })
    })   
}

const deleteProducts = (productParent) => {
 
  let currentPriceCart = parseInt(productParent.querySelector(".cart-product__price").textContent);
  console.log(currentPriceCart);
  minusFullPrice(currentPriceCart);
  printFullPrice();
  productParent.remove();
  printQuantity();
}
 
  
 

cartProductList.addEventListener("click", (e) => {
  e.preventDefault();
  if(e.target.classList.contains("fa-trash")){
 deleteProducts(e.target.closest(".cart-content__item"));
}
});


const generateCartProduct = (image, title, price, id ) => {
  return `
  <li class="cart-content__item">
  <article class="cart-content__product cart-product" data-id="${id}">
  <img class="cart-product__img" src="${image}">
  <div class="cart-product__text">
      <h3 class="cart-product__title">${title}</h3>
      <span class="cart-product__price">${price} kr.</span>
  </div>
  <button class="cart-product__delete" aria-label="delete-product">
      <i class="fa-solid fa-trash"></i>
  </button>
  </article>
</li>
  `
}

let flag = 0;

orderModalOpenProd.addEventListener('click', (e) => {
if(flag == 0) {
  orderModalOpenProd.classList.add('open');
  orderModalList.style.display = "block";
  flag = 1;
} else {
  orderModalOpenProd.classList.remove('open');
  orderModalList.style.display = "none";
  flag = 0;
}
})

let inputMask = new Inputmask('+45-99-99-99-99');
inputMask.mask(selectorInputTel);


const generateModalProduct = (image, title, price, id ) => {
  return `
  <li class="order-modal__item">
  <article class="order-modal__product order-product" data-id="${id}">
      <img src="${image}" alt="${title}" class="order-product__img">
      <div class="order-product__text">
          <h3 class="order-product__title">${title}</h3>
          <span class="order-product__price">${price} kr.</span>
      </div>
  </article>
</li>
  `
}


const modal = new GraphModal({
	isOpen: (modal) => {
	  console.log('opened');
  
    let array = document.querySelector('.cart-content__list').children;
    let fullprice = fullPrice.textContent;
    let length = array.length;

    document.querySelector('.order-modal__quantity span').textContent = `${length} stk.`;
    document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
    for(item of array) {
      console.log(item);
      let image = item.querySelector('.cart-product__img').getAttribute('src');
      let title = item.querySelector('.cart-product__title').textContent;
      let price = item.querySelector('.cart-product__price').textContent;
      let id = item.querySelector('.cart-product').dataset.id;

      orderModalList.insertAdjacentHTML("afterbegin", generateModalProduct(image, title, price, id));

      let obj = {};
      obj.title = title;
      obj.price = price;
      productArray.push(obj);
    }
	},
	isClose: () => {
	  console.log('closed');
	}
  })

 const formEl = document.querySelector('.order-modal__form');


 formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  let self = e.currentTarget;
    let formData = new FormData(self);
    let name = self.querySelector('[name="Name"]').value;
    let tel = self.querySelector('[name="tel"]').value;
    let mail = self.querySelector('[name="Email"]').value;

    formData.append('Bestilling', JSON.stringify(productArray));
    formData.append('Name', name);
    formData.append('Telefon', tel);
    formData.append('Email', mail);

    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          console.log("Sendt!");
        }
      }
    }
    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);
  
    self.reset();
 })


  



