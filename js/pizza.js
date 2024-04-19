// select DOM elements --------------------------------------------------------------------
const dropElem = document.querySelector('#pizza-dough');
const itemsBoxElem = document.querySelector('#item-box');
const priceElem = document.querySelector('#total-price');
const calorieElem = document.querySelector('#total-calorie');
const btnElem = document.querySelector('#cart-button');
const refreshElem = document.querySelector('#refresh-button');

// variables ------------------------------------------------------------------------------
let totalPrice = 0;
let totacalorie = 0;

// functions ------------------------------------------------------------------------------

// creating pizza items handler --------------------------------------------------
function itemsCreator(pizzaData) {
    pizzaData.forEach(item => {
        const imdBoxElem = document.createElement('div');
        imdBoxElem.className = 'img-box';

        for (let i = 0; i < item.qty ; i++) {
            const imgElem = document.createElement('img');
            imgElem.className = 'img-item';
            imgElem.setAttribute('id', item.id + i);
            imgElem.setAttribute('src', item.image);
            imgElem.setAttribute('draggable', 'true');
            imgElem.setAttribute('ondragstart', 'onDragStart(event)');

            imgElem.dataset.name = item.name;
            imgElem.dataset.price = item.price;
            imgElem.dataset.calorie = item.calorie;

            imdBoxElem.appendChild(imgElem);
        }
        itemsBoxElem.appendChild(imdBoxElem);
    });    
}

// allow element for dropping -------------------------------------------------------
function allowDrop(event) {
    event.preventDefault();
}

// drag start handler - on drag element ---------------------------------------------
function onDragStart(event){
    event.dataTransfer.setData('id', event.target.id)
    event.dataTransfer.setData('offsetX', event.offsetX)
    event.dataTransfer.setData('offsetY', event.offsetY)
    event.dataTransfer.setData('price', event.target.dataset.price)
    event.dataTransfer.setData('calorie', event.target.dataset.calorie)
}

// drop handler - on drop element --------------------------------------------------
function onDrop(event){
    let elemID = event.dataTransfer.getData('id')
    let offsetX = event.dataTransfer.getData('offsetX')
    let offsetY = event.dataTransfer.getData('offsetY')
    let price = event.dataTransfer.getData('price')
    let calorie = event.dataTransfer.getData('calorie')

    const dragElem = document.getElementById(elemID);
    dragElem.style.cssText = ` position: absolute; top: ${event.clientY - offsetY}px; left: ${event.clientX - offsetX}px`;

    totalPrice += Number(price);
    priceElem.innerHTML = totalPrice;

    totacalorie += Number(calorie);
    calorieElem.innerHTML = totacalorie;
}

// cart button handler  -----------------------------------------------------------
btnElem.addEventListener('click', function(){
    let cart = JSON.parse(localStorage.getItem('shopCart')) || [];
    let cartItem = {
        id : cart.length + '0',
        name:  'پیتزای سفارشی',
        image: '../images/pizza-items/custom-pizza.png',
        type: 'normal',
        price: totalPrice,
        qty: 1
    };
    cart.push(cartItem);
    cartNumberUpdate(cart);
    localStorage.setItem('shopCart',JSON.stringify(cart))
})

// refresh button handler  -----------------------------------------------------------
refreshElem.addEventListener('click', function(){
    location.reload();
})

// read json data -------------------------------------------------------------------------
window.onload = async function(){
    let apiURL = 'https://raw.githubusercontent.com/solmaz-mousavi/data-json-files/master/pizza-items.json'
    await fetch (apiURL)
        .then(res => res.json())
        .then(res => {
            let pizzaData = res.items;
            itemsCreator(pizzaData);
        })
        .catch(err => console.log(err))
}
