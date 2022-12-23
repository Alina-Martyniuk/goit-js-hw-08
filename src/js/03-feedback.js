import _ from 'lodash'

const form = document.querySelector(".feedback-form");
const formStateItemName = "feedback-form-state";

form.addEventListener("input", _.throttle(saveToLocalStorage, 500));
form.addEventListener("submit", formSubmit);

function getFormAsObject(formElements) {
    let formData = {};
    for (let i = 0; i < formElements.length; i++) {
        let element = formElements[i];
        if (element.name) {
            formData[element.name] = element.value;
        }
    }
    return formData;
}

function fillFormData(formElements, data) {
    for (let i = 0; i < formElements.length; i++) {
        let element = formElements[i];
        if (element.name) {
            element.value = data[element.name] || '';
        }
    }
}

function saveToLocalStorage(event) {
    if (event.currentTarget) {
        let formState = getFormAsObject(event.currentTarget.elements);
        localStorage.setItem(formStateItemName, JSON.stringify(formState));
    }
}

function formSubmit(event) {
    event.preventDefault();
    let formState = getFormAsObject(form.elements);
    console.log(formState);
    localStorage.removeItem(formStateItemName);
    fillFormData(event.currentTarget.elements, {});
}

try {
    let storedFormData = JSON.parse(localStorage.getItem(formStateItemName) || '{}');
    fillFormData(form.elements, storedFormData);
} catch (error) {
    console.log(`Can't restore form data. Error: ${error}`);
}
