import '../css/style.css';
import axios from 'axios';

const submitButton = document.querySelector('.submit_button');
const passwordInput = document.querySelector('.new_password_input');
const notificationText = document.querySelector('.notification_text');
const notificationPopup = document.querySelector('.notification_popup');


async function changePassword() {
    try {
        const response = await axios.post('http://localhost:3000/authorization/change-password', {
          password: passwordInput.value
        },
        {
            headers : {
                token : document.URL.slice(48)
            }
        });
        notificationPopup.style.visibility = 'visible';
        notificationText.innerHTML = `${response.data}`;
        notificationPopup.style.background = 'green';
        window.location.href = 'http://localhost:4200';
      } catch (error) {
        console.log(error);
        notificationPopup.style.visibility = 'visible';
        notificationText.innerHTML = `${error.response.data.message}`;
        notificationPopup.style.background = 'red';
        setTimeout(function() {
          notificationPopup.style.visibility = 'hidden';
        }, 5000);
      }
}

submitButton.addEventListener('click', changePassword);