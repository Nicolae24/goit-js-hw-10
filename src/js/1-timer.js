// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const dataPicker = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector(`[data-start]`);

startBtn.disabled = true;

let userSelectDate = null;


flatpickr(dataPicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const pickedDate = selectedDates[0];

        if (pickedDate <= new Date()) {
            // ❌ Минуле
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
            });
            startBtn.disabled = true;
        } else {
            // ✅ Майбутнє 
            userSelectDate = pickedDate;
            startBtn.disabled = false;
            iziToast.info({
                title: 'Оо, пішло',
                message: 'Галя берега на видит!',
            });
        }
    },
});

startBtn.addEventListener(`click`, () => {
    startBtn.disabled = true;
    dataPicker.disabled = true;
    const timerId = setInterval(() => {
        const now = new Date();
        const timeLeft = userSelectDate - now;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            updateTimerDis(0);
            dataPicker.disabled = false;
            document.querySelector('.timer').classList.add('blink'); // 💫 Додати анімацію
            showFlashAnimation();

            return;
        }
        updateTimerDis(timeLeft);
    }, 1000);

})

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addZero(value) {
    return String(value).padStart(2, "0");
}

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

function updateTimerDis(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);

    daysEl.textContent = addZero(days);
    hoursEl.textContent = addZero(hours);
    minutesEl.textContent = addZero(minutes);
    secondsEl.textContent = addZero(seconds);
}

function showFlashAnimation() {
    document.body.classList.add('flash');
    setTimeout(() => {
        document.body.classList.remove('flash');
    }, 600); // після 3 разів
}

