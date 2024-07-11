'use strict';
import products from './product.js';

let cart = () => {
  const openCart = document.querySelector('.icon-cart');
  const listCartHTML = document.querySelector('.listCart');
  const closeBtn = document.querySelector('.close');
  const body = document.querySelector('body');
  let cart = [];

  openCart.addEventListener('click', () =>
    body.classList.toggle('activeTabCart')
  );
  closeBtn.addEventListener('click', () =>
    body.classList.toggle('activeTabCart')
  );

  const setProductInCart = function (idProduct, quantity, position) {
    if (quantity > 0) {
      if (position < 0) {
        cart.push({
          products_id: idProduct,
          quantity: quantity,
        });
      } else {
        cart[position].quantity = quantity;
      }
    } else {
      cart.splice(position, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    refreshCartHtml();
  };

  const refreshCartHtml = function () {
    let listHtml = document.querySelector('.listCart');
    let totalHtml = document.querySelector('.icon-cart span');
    let totalQuantity = 0;
    listCartHTML.innerHTML = '';
    cart.forEach(item => {
      totalQuantity = totalQuantity + item.quantity;
      let position = products.findIndex(value => value.id == item.products_id);
      let info = products[position];
      let newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.innerHTML = `
      
      <div class = 'image'>
      <img src ='img-${info.image}'/>
      </div>
      <div class = 'name'>${info.name}</div>
      <div class = 'totalPrice'>$${info.price * item.quantity}</div>
      <div class = 'quantity'>
        <span class = 'minus' data-id = '${info.id}'>-</span>
        <span>${item.quantity}</span>
        <span class = 'plus' data-id = '${info.id}'>+</span>
      </div>


      `;
      listCartHTML.appendChild(newItem);
    });
    totalHtml.innerText = totalQuantity;
  };

  document.addEventListener('click', event => {
    let buttonClick = event.target;
    let idProduct = buttonClick.dataset.id;
    let position = cart.findIndex(value => value.products_id === idProduct);
    let quantity = position < 0 ? 0 : cart[position].quantity;

    if (
      buttonClick.classList.contains('addCart') ||
      buttonClick.classList.contains('plus')
    ) {
      quantity++;
      setProductInCart(idProduct, quantity, position);
    } else if (buttonClick.classList.contains('minus')) {
      quantity--;
      setProductInCart(idProduct, quantity, position);
    }
  });
  const initApp = () => {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    refreshCartHtml();
  };
  initApp();
};

export default cart;
