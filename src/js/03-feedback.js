import _ from 'lodash'

const form = document.querySelector(".feedback-form");
const formStateItemName = "feedback-form-state";

form.addEventListener("input", _.throttle(saveToLocalStorage, 500));
form.addEventListener("submit", formSubmit);

function getFormAsObject(formElements) {
    [email, textArea] = formElements;
    return {
        'email': email.value,
        'textArea': textArea.value
    };
}

function fillFormData(formElements, data) {
    [email, textArea] = formElements;
    email.value = data.email || '';
    textArea.value = data.textArea || '';
}

function saveToLocalStorage(evt) {
    let formState = getFormAsObject(evt.currentTarget.elements);
    localStorage.setItem(formStateItemName, JSON.stringify(formState));
}

function formSubmit(evt) {
    evt.preventDefault();
    let formState = getFormAsObject(evt.currentTarget.elements);
    console.log(formState);
    localStorage.removeItem(formStateItemName);
    fillFormData(evt.currentTarget.elements, {});
}

let storedFormData = JSON.parse(localStorage.getItem(formStateItemName) || '{}');
fillFormData(form.elements, storedFormData);