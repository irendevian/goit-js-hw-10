import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      //   console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      const timeNow = Date.now();
      
      if (selectedDate <= timeNow) {
          //   window.alert("Please choose a date in the future");
          iziToast.warning({
              title: 'Warning',
              message: 'Please choose a date in the future',
          });
          startBtn.disabled = true;
      } else {
          userSelectedDate = selectedDate;
          startBtn.disabled = false;
      }
  },
};


flatpickr("#datetime-picker", options);

let userSelectedDate = null;
let timerId = null;


const startBtn = document.querySelector("button[data-start]");
const input = document.querySelector("#datetime-picker");
const daysElement = document.querySelector("span[data-days]");
const hoursElement = document.querySelector("span[data-hours]");
const minutesElement = document.querySelector("span[data-minutes]");
const secondsElement = document.querySelector("span[data-seconds]");

startBtn.disabled = true;
input.disabled = false;


startBtn.addEventListener("click", () => {
    if (!userSelectedDate) {
        return;
    }
    
    timerId = setInterval(() => {
            let userSelectedDateMs = userSelectedDate.getTime();
            const userDeltaTime = userSelectedDateMs - Date.now();

            console.log(convertMs(userDeltaTime));
        
            if (userDeltaTime <= 0) {
                clearInterval(timerId);
                timerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                input.disabled = false;
                startBtn.disabled = true;
                return;
        }

        const time = convertMs(userDeltaTime);
        timerDisplay(time);

        startBtn.disabled = true;
        input.disabled = true;
            
    }, 1000);
    

});


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


function timerDisplay({ days, hours, minutes, seconds }) {
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
}


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


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


