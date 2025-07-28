const form = document.querySelector(".form");
const delayElement = document.querySelector("#delay");

const fulfilled = document.querySelector("#fulfilled");
const rejected = document.querySelector("#rejected");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delay = Number(delayElement.value);

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {

            if (fulfilled.checked) {
                resolve(delay);
            } else if (rejected.checked) {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then((delay) => {
        iziToast.success({
              title: 'Success',
              message: `✅ Fulfilled promise in ${delay}ms`,
              position: "topRight",
          });
        })
        .catch((delay) => {
            iziToast.error({
              title: 'Error',
              message: `❌ Rejected promise in ${delay}ms`,
              position: "topRight",
          });
        });

});

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

