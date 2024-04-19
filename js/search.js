// select DOM elements --------------------------------------------------------------------
const searchBtn = document.querySelector('.search-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const searchBox = document.querySelector('.search-box');
const inputBox = document.querySelector('#q');
const resultBox = document.querySelector('#search-result-box');

// variables ------------------------------------------------------------------------------
var mydata;
var searchItem;

// search box animation ------------------------------------------------------------------
searchBox.style.transition = 'all 500ms';
searchBox.style.transitionTimingFunction = 'cubic-bezier(0.7, -0.5, 0.3, 1.5)';

// functions
// read json data -------------------------------------------------------------------------
function loadData() {
    let requestURL = 'https://raw.githubusercontent.com/solmaz-mousavi/data-json-files/master/foodDelivery-productsData.json';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            mydata = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", requestURL);
    xhttp.send();
}

//search box open and close handler---------------------------------------------------------
function searchBoxopenHandler() {
    searchBox.classList.add('active');
}

function searchBoxcloseHandler() {
    searchBox.classList.remove('active')
}

//get search box value----------------------------------------------------------------------
function searchInputHandler(event){
    if (event.keyCode === 13) {
        searchItem = inputBox.value;
        inputBox.value = '';
        resultBox.innerHTML = '';
        searchHandler(searchItem)
    }
}

//create result box title -------------------------------------------------------------------
function createResultTitle(productList) {
    const titleElem = document.createElement('h1');
    if (productList.length === 0) {
        titleElem.innerHTML = 'غذایی یافت نشد'
    } else {
        titleElem.innerHTML = 'نتیجه جستجوی شما '
    }
    resultBox.appendChild(titleElem);
}

//create result box items -------------------------------------------------------------------
function createResultBox(productList) {
    let row = 1;
    productList.forEach(product => {
        const searchBoxProductElem = document.createElement('div');
        searchBoxProductElem.className = 'search-box-product';
        
        const searchBoxImgTitleElem = document.createElement('div');
        searchBoxImgTitleElem.className = 'search-box-img-title';
        
        const imageElem = document.createElement('img');
        imageElem.className = 'search-box-img';
        imageElem.setAttribute('src', product.product_image[0]);
        
        const nameElem = document.createElement('h3');
        nameElem.innerHTML = row + '. ' + product.product_name;

        searchBoxImgTitleElem.appendChild(imageElem);
        searchBoxImgTitleElem.appendChild(nameElem);

        const typeElem = document.createElement('strong');
        typeElem.innerHTML = product.product_type[0];

        const priceElem = document.createElement('strong');
        priceElem.innerHTML = product.product_price[0] + ' تومان';

        searchBoxProductElem.appendChild(searchBoxImgTitleElem);
        searchBoxProductElem.appendChild(typeElem);
        searchBoxProductElem.appendChild(priceElem);
        resultBox.appendChild(searchBoxProductElem);
        row ++
    });
}

//search products data ---------------------------------------------------------------
function searchHandler(searchItem) {
    let productList = [];
    mydata.product_group.forEach(pGroup => {
        pGroup.group_products.forEach(product => {
            if (product.product_name.includes(searchItem)) {
                productList.push(product);
                }
        });
    });
    createResultTitle(productList);
    createResultBox(productList);
}

//set events --------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", loadData);
searchBtn.addEventListener('click', searchBoxopenHandler);
cancelBtn.addEventListener('click', searchBoxcloseHandler);
inputBox.addEventListener('keydown', searchInputHandler);

//-------------------------------------------------------------------------------------------
