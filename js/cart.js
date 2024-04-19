// select page elements and variables-------------------------------------------------------
const cartContainerElem = document.querySelector('.cart-container');
const titleElem = document.querySelector('.cart-title span');
const totalPriceElem = document.querySelector('.cart-total span');

// functions -------------------------------------------------------------------------------
// cart item quantity changer buttons -------------------------------------
const plusHandler = event => {
    const cartId = event.target.parentElement.parentElement.id;
    console.log(cartId);
    let cartIndex = cart.findIndex(item => item.id === cartId);
    console.log(cartIndex);

    cart[cartIndex].qty ++;
    localStorage.setItem('shopCart',JSON.stringify(cart))
    createCartItems(cart);
    updateTotalPrice(cart);
}

const minusHandler = event => {
    const cartId = event.target.parentElement.parentElement.id;
    let cartIndex = cart.findIndex(item => item.id === cartId);

    if(cart[cartIndex].qty > 1){
        cart[cartIndex].qty --;
        localStorage.setItem('shopCart',JSON.stringify(cart))
        createCartItems(cart);
        updateTotalPrice(cart);
    }
}

// cart item remover handler -----------------------------------------------
const removeHandler = event =>{
    const cartId = event.target.parentElement.parentElement.id;
    let cartIndex = cart.findIndex(item => item.id === cartId);

    cart.splice(cartIndex,1);
    localStorage.setItem('shopCart',JSON.stringify(cart))

    createCartItems(cart);
    updateTitle(cart);
    cartNumberUpdate(cart);
    updateTotalPrice(cart);
}

// cart items creator handler ----------------------------------------------
function createCartItems(cart){
    cartContainerElem.innerHTML = '';

    cart.forEach(item => {
        const cartItemElem = document.createElement('div');
        cartItemElem.classList = 'cart-item';
        cartItemElem.id = item.id;
        
        cartItemElem.innerHTML += `<div class="number">
                                        <span class="plus" onclick="plusHandler(event)">+</span>
                                        <input type="number" class="number" value="${item.qty}" min="1" max="20" readonly="true">
                                        <span class="minus" onclick="minusHandler(event)">-</span>
                                    </div>
                                    <div class="item-image">
                                        <img src="${item.image}" alt="">
                                    </div>
                                    <p>${item.name} ( ${item.type} )</p>
                                    <p>${item.price} تومان</p>
                                    <p class="item-number">${item.qty} عدد</p>
                                    <p class="item-total-price">${item.qty * item.price} تومان</p>
                                    <a class="item-remove" onclick="removeHandler(event)">
                                        <i class="fa fa-close fa-2x"></i>
                                    </a>`;

        cartContainerElem.appendChild(cartItemElem);
    });
}

// Title update -------------------------------------------------------------
const updateTitle = cart => titleElem.innerHTML = '(' + cart.length + ')' ;

// Total price update -------------------------------------------------------
const updateTotalPrice = cart => {
    let totalPrice = 0;
    cart.forEach(item => totalPrice += (item.price * item.qty));
    totalPriceElem.innerHTML = totalPrice;
}

// page onload function ---------------------------------------------------------------------
window.onload = function(){
    createCartItems(cart);
    updateTitle(cart);
    updateTotalPrice(cart);
}

