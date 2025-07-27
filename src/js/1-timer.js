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
          window.alert("Please choose a date in the future");
          startBtn.disabled = true;
      } else {
          userSelectedDate = selectedDate;
          startBtn.disabled = false;
      }
  },
};


flatpickr("#datetime-picker", options);

let userSelectedDate = null;


const startBtn = document.querySelector("button[data-start]");
const input = document.querySelector("#datetime-picker");
startBtn.disabled = true;
input.disabled = false;

const timer = document.querySelector(".timer");



startBtn.addEventListener("click", () => {
     if (userSelectedDate !== null) {

        setInterval(() => {
            let userSelectedDateMs = userSelectedDate.getTime();
            const userDeltaTime = userSelectedDateMs - Date.now();

            console.log(convertMs(userDeltaTime));
            // const timeLeft = convertMs(userDeltaTime);
            
        }, 1000);
        
        startBtn.disabled = true;
        input.disabled = true;

        }
});


// ---------------------------------------------------------

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


// -------------------------------------

