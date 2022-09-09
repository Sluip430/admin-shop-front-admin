import '../css/style.css';
import axios from 'axios';

const headerSignUp = document.querySelector('.header_sign_up');
const headerSignIn = document.querySelector('.header_sign_in');
const signUp = document.querySelector('.sign_up');
const signIn = document.querySelector('.sign_in');
const signUpBtn = document.querySelector('.sign_up_button');
const signInBtn = document.querySelector('.sign_in_button');
const emailInputSignUp = document.querySelector('.email_input_sign_up');
const passwordInputSignUp = document.querySelector('.password_input_sign_up');
const phoneInput = document.querySelector('.phone_input');
const emailInputSignIn = document.querySelector('.email_input_sign_in');
const passwordInputSignIn = document.querySelector('.password_input_sign_in');
const notificationText = document.querySelector('.notification_text');
const notificationPopup = document.querySelector('.notification_popup');
const forgotPassTitle = document.querySelector('.forgot_pass_title');
const forgotPassEmail = document.querySelector('.forgot_password_email');
const restorePasswordButton = document.querySelector('.restore_password_button');
const emailInputForgotPassMail = document.querySelector('.email_input_forgot_password_mail');
const link = 'https://admin-shop-back.herokuapp.com';

function showSignUp () {
  if (signUp.style.visibility === 'hidden'){
    signIn.style.visibility = 'hidden';
    forgotPassEmail.style.visibility = 'hidden';
    signUp.style.visibility = 'visible';
  } else {
    signUp.style.visibility = 'hidden';
  }
}

function showSignIn () {
  if (signIn.style.visibility === 'hidden'){
    signUp.style.visibility = 'hidden';
    forgotPassEmail.style.visibility = 'hidden';
    signIn.style.visibility = 'visible';
  } else {
    signIn.style.visibility = 'hidden';
  }
}

function showForgotPasswordEmail () {
  signIn.style.visibility = 'hidden';
  forgotPassEmail.style.visibility = 'visible';
}

async function signUpReq () {
  try {
    const response = await axios.post(`${link}/authorization/sign-up`, {
      email : emailInputSignUp.value,
      password : passwordInputSignUp.value,
      phone : phoneInput.value,
    })
    notificationPopup.style.visibility = 'visible';
    notificationText.innerHTML = 'Please check your mail';
    notificationPopup.style.background = 'green';
    setTimeout(function() {
      notificationPopup.style.visibility = 'hidden';
    }, 5000);
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

async function signInReq () {
  try {
    const response = await axios.post(`${link}/authorization/sign-in`, {
      email : emailInputSignIn.value,
      password : passwordInputSignIn.value,
    })
    notificationPopup.style.visibility = 'visible';
    notificationText.innerHTML = `${response.data}`;
    notificationPopup.style.background = 'green';
    setTimeout(function() {
      notificationPopup.style.visibility = 'hidden';
    }, 5000);
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

async function restorePasswordMail () {
  try {
    const response = await axios.post(`${link}/authorization/forgot-password`, {
      email: emailInputForgotPassMail.value
    });
    notificationPopup.style.visibility = 'visible';
    notificationText.innerHTML = `${response.data}`;
    notificationPopup.style.background = 'green';
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

function initProject () {
  signIn.style.visibility = 'hidden';
  signUp.style.visibility = 'hidden';
  forgotPassEmail.style.visibility = 'hidden';
}

initProject();

signUpBtn.addEventListener('click' , signUpReq);
signInBtn.addEventListener('click' , signInReq);
headerSignUp.addEventListener('click' , showSignUp);
headerSignIn.addEventListener('click' , showSignIn);
forgotPassTitle.addEventListener('click' , showForgotPasswordEmail);
restorePasswordButton.addEventListener('click' , restorePasswordMail);
