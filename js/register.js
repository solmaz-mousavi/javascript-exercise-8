// select DOM elements--------------------------------------------------------------
const formElem = document.getElementById('register-form');
const inputElems = document.querySelectorAll('input');
const errorElem = document.querySelector('.summery-validation');
const popupBtn = document.querySelector('.btn-popup');
const popupElem = document.querySelector('#popup-form');

// popup animation style ------------------------------------------------------------
popupElem.style.transition = 'all 500ms';
popupElem.style.transitionTimingFunction = 'cubic-bezier(0.7, -0.5, 0.3, 1.5)';

// validation class ----------------------------------------------------------------
class FormValidation{
    constructor(form){
        this.__form = form;
        this.submitHandler();
    }

    submitHandler(){
        this.__form.addEventListener('submit', (event)=>{
            event.preventDefault();
            errorElem.innerHTML='';
            this.validationHandler();
        })
    }

    validationHandler(){
        inputElems.forEach((input)=>{
            let datasetValidation = input.dataset.validation.split(" ");
            let datasetLabel = input.dataset.label;

            for (let i = 0; i < datasetValidation.length; i++) {
                const validationMethod = datasetValidation[i];
                let message = eval(`this.${validationMethod}(input, datasetLabel)`);
                if (message) {
                    const liElem = document.createElement('li');
                    liElem.innerHTML = message;
                    errorElem.appendChild(liElem);
                }
            };
        })
    }

    notEmpty(element, label){
        if(element.value ===""){
            return "فیلد " + label + " نباید خالی باشد."
        }
        return "";
    }

    isMobile(element, label){
        const regexCode = /09[0139]\d{8}/;
        if(!regexCode.test(element.value)){
            return "قالب موبایل نادرست است";
        };
        return ""
    }
}

new FormValidation(formElem)

// set event on popup button--------------------------------------------------------------
popupBtn.addEventListener('click', ()=>{
    formElem.classList.toggle('active');
    popupBtn.classList.toggle('active');
    popupElem.classList.toggle('active');
})
