import _ from "lodash";

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textArea: document.querySelector('.feedback-form textarea'),
}
const LOCALSTORAGE_KEY = "feedback-form-state";

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', _.throttle(onEmailInput, 500));
refs.textArea.addEventListener('input', _.throttle(onTextAreaInput, 500));

populateTextArea();

function onFormSubmit(e) {
    e.preventDefault();
    refs.form.reset();
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    localStorage.removeItem(LOCALSTORAGE_KEY);
        
}

function onEmailInput(e) {
    // console.log(e.target.value)
    const valueFromStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
    const message = {
        email: e.target.value,
        message: valueFromStorage?valueFromStorage.message:``
    };

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(message));
    }

function onTextAreaInput(e) {
    // console.log(e.target.value)
    const valueFromStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY, ))
    const message = {
        email: valueFromStorage?valueFromStorage.email:``,
        message: e.target.value,
        
    };

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(message));
}

function populateTextArea() {
    try {
        const savedMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {
            message: '', email: ''
        };
            const getMessage = savedMessage.message;
            const getMail = savedMessage.email;
            refs.textArea.value = getMessage;
            refs.input.value = getMail;
    }
    catch {
        console.log('error');
    }
}

