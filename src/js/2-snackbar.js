// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


// const inputNumber = document.querySelector(`[name="delay"]`);
const formEl = document.querySelector(`.form`);

function handleFormSubmit(event) {
    event.preventDefault();

    const delay = Number(formEl.elements.delay.value);
    const state = formEl.elements.state.value;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
        .then((delay) => {
            iziToast.success({
                title: '✅ Success',
                message: `Fulfilled promise in ${delay}ms`,
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: '❌ Error',
                message: `Rejected promise in ${delay}ms`,
            });
        });
}
formEl.addEventListener('submit', handleFormSubmit);