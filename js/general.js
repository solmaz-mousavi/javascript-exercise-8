// select elements - variables ----------------------------------------------------------------------------
const navbarElem = document.querySelector('.navbar');
const cartNumberElem = document.querySelector('.cart-number');


// navbar style handler based on page scrolling -----------------------------------------------------------
function ChangeScrollY(){
    let verticalScroll = document.documentElement.scrollTop;

   if (verticalScroll > 100) {
    navbarElem.classList.add('navbar-sticky')
    } else{
    navbarElem.classList.remove('navbar-sticky')
   }
}

// shopcart Number ----------------------------------------------------------------------------------------
function cartNumberUpdate(cart){
    cartNumberElem.innerHTML = '(' + cart.length + ')'
}

let cart = JSON.parse(localStorage.getItem('shopCart')) || [];
cartNumberUpdate(cart)


