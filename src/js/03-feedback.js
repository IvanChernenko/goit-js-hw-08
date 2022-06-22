import throttle from "lodash";

const refs = {
    form: document.querySelector('.feedback-form'),
}
const LOCALSTORAGE_KEY = "feedback-form-state";

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextAreaInput, 500));

populateTextArea();

function onFormSubmit(e) {
    e.preventDefault();
    refs.form.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log(localStorage.getItem(LOCALSTORAGE_KEY));
    
}

function onTextAreaInput(e) {
    const message = {
        email: e.target.value,
        message: e.target.value,
    };

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(message));
}

function populateTextArea() {
    try {
        const savedMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || ``;
        if (savedMessage) {
            const getMessage = savedMessage.message;
            const getMail = savedMessage.email;
            refs.textarea.value = getMessage;
            refs.input.value = getMail;
        }
    }
    catch {
        console.log('error');
    }
}
