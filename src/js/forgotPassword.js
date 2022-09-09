import '../css/style.css';
import axios from 'axios';

const submitButton = document.querySelector('.submit_button');
const passwordInput = document.querySelector('.new_password_input');
const notificationText = document.querySelector('.notification_text');
const notificationPopup = document.querySelector('.notification_popup');
const link = 'https://admin-shop-back.herokuapp.com';


async function changePassword() {
    try {
        const paragraph = document.URL;
        const regex = 'token=';
        const found = paragraph.search(regex);
        const token = paragraph.slice(found + regex.length);
        const response = await axios.post(`${link}/authorization/change-password`, {
          password: passwordInput.value
        },
        {
            headers : {
                token
            }
        });
        notificationPopup.style.visibility = 'visible';
        notificationText.innerHTML = `${response.data}`;
        notificationPopup.style.background = 'green';
        window.location.href = `https://sluip430.github.io/admin-shop-front-admin/dist/index.html`;
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