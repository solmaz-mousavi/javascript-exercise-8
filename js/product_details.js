// select page elements and variables--------------------------------------------------------------
const titleElem = document.querySelector('.title-text h1');
const pathElem = document.querySelector('.title-text p');

const largeImageContainer = document.querySelector('.product-container-largeimage');
const smallImagesContainer = document.querySelector('.product-container-smallimages');

const productTitleElem = document.querySelector('.product-title h3');
const productContentElem = document.querySelector('.product-title p');

const productPriceContainer = document.querySelector('.product-price-container');

const energy = document.getElementById('energy');
const protein = document.getElementById('protein');

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const numberElem = document.querySelector('.number-value');

const groupIndex = new URLSearchParams(window.location.search).get('group');
const productIndex = new URLSearchParams(window.location.search).get('product');

// creating methods in productDetails object -------------------------------------------------------
let productDetails = {
    getGroupDiscount : function(){
        let result = this.Discounts[groupIndex].discount;
        return result;
    },
    createProductBox : function(){

        // page and product title -------------------------------------------
        const productTitle = this.product_name;
        titleElem.innerHTML = productTitle;
        pathElem.innerHTML = 'خانه &#8592; منو &#8592; ' + productTitle;

        productTitleElem.innerHTML = productTitle;
        productContentElem.innerHTML = [...this.product_content]

        // creating product images ------------------------------------------
        const productImages = this.product_image;
        for (let i = 0; i < productImages.length; i++) {
            const imageElem = document.createElement('img');
            imageElem.setAttribute('src',productImages[i]);
            largeImageContainer.appendChild(imageElem);

            const smlImageElem = document.createElement('img');
            smlImageElem.setAttribute('src',productImages[i]);
            smallImagesContainer.appendChild(smlImageElem);
        }

        // Creating product price ------------------------------------------
        const productDetail = this;
        const productPrices = this.product_price;
        for (let i = 0; i < productPrices.length; i++) {
            const liElem = document.createElement('li');

            const priceElem = document.createElement('del');
            priceElem.innerHTML = productPrices[i] + ' تومان';

            const discountElem = document.createElement('span');
            let productNewPrice = productPrices[i] * (100 - this.discount) / 100;
            discountElem.innerHTML = productNewPrice + ' تومان';
            discountElem.className = 'product-price';
            
            const typeElem = document.createElement('span');
            typeElem.innerHTML = this.product_type[i];
            typeElem.className = 'product-type';
            typeElem.addEventListener('click', (event) => updateShopCart(event ,productDetail));

            liElem.append(priceElem , discountElem , typeElem);
            productPriceContainer.appendChild(liElem);
        }

        // Product energy and protein bars -------------------------------
        energy.dataset.to = this.product_energy;
        let i = 0;
        let energytimer = setInterval ( () => {
            energy.innerHTML = i + '%';
            energy.style.width = i + '%';
            i++;
            if (i > this.product_energy) {    
                clearInterval (energytimer);
            }
        } , 10)
        
        protein.dataset.to = this.product_protein;
        i = 0;
        let proteintimer = setInterval ( () => {
            protein.innerHTML = i + '%';
            protein.style.width = i + '%';
            i++;
            if (i > this.product_protein) {    
                clearInterval (proteintimer);
            }
        } , 10)
    }
}

// plus and minus buttons Handlers -----------------------------------------------------------------
function plusHandler(){
    if (numberElem.value < 20) {
        numberElem.value++;
    }
}

function minusHandler(){
    if (numberElem.value > 1) {
        numberElem.value--;
    }
}

// cart update handler (by click on product price) -------------------------------------------------
function updateShopCart (event, productDetail){

    let cart = JSON.parse(localStorage.getItem('shopCart')) || [];
    let typeIndex = productDetail.product_type.findIndex(item => item === event.target.innerHTML)
    
    let cartItem = {
        id : groupIndex + productIndex + typeIndex,
        name:  productDetail.product_name,
        image: productDetail.product_image[0],
        type: event.target.innerHTML,
        price: productDetail.product_price[typeIndex] * (100 - productDetail.discount) /100,
        qty: 1
    };
    
    let itemIndex = cart.findIndex( item => item.id === cartItem.id );

    if (itemIndex === -1) {
        cart.push(cartItem);
    } else{
        cart[itemIndex].qty ++;
    }

    cartNumberUpdate(cart);
    localStorage.setItem('shopCart',JSON.stringify(cart))
}

// insert json product file data--------------------------------------------------------------------
// insert product data ------------------------------------------------------------
let productRequestURL = 'https://raw.githubusercontent.com/solmaz-mousavi/data-json-files/master/foodDelivery-productsData.json';
let productRequest = new XMLHttpRequest();
productRequest.open('GET', productRequestURL , true);
productRequest.responseType = 'json';
productRequest.send();

// insert discount data -----------------------------------------------------------
let discountRequestURL = 'https://raw.githubusercontent.com/solmaz-mousavi/data-json-files/master/foodDelivery-discountData.json';
let discountRequest = new XMLHttpRequest();
discountRequest.open('GET', discountRequestURL , true);
discountRequest.responseType = 'json';
discountRequest.send();

// page onload functions -------------------------------------------------------------------------------
discountRequest.onload = function(){
    const product = productRequest.response.product_group[groupIndex].group_products[productIndex];
    const discounts = discountRequest.response;

    const discountNumber = productDetails.getGroupDiscount.call(discounts);

    const productParent = {
        __proto__ : product,
        discount : discountNumber
    } 

    productDetails.createProductBox.call(productParent);

    // set event for plus and minus buttons ------------------------------------------
    plus.addEventListener('click', plusHandler);
    minus.addEventListener('click', minusHandler);

}
