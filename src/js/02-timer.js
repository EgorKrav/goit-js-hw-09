import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      document.querySelector('[data-start]').disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
});

const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownIntervalId;

startButton.addEventListener('click', () => {
  const targetDate = datePicker.selectedDates[0];

  startButton.disabled = true;

  countdownIntervalId = setInterval(() => {
    const timeDifference = targetDate.getTime() - new Date().getTime();

    if (timeDifference <= 0) {
      clearInterval(countdownIntervalId);
      daysValue.textContent = addLeadingZero(0);
      hoursValue.textContent = addLeadingZero(0);
      minutesValue.textContent = addLeadingZero(0);
      secondsValue.textContent = addLeadingZero(0);
      startButton.disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
