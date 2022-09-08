import '../css/style.css';
import axios from 'axios';

const userTable = document.querySelector('.user_table');
let isVisibleUserPopup = false;
let isVisibleOrderPopup = false;
const closeBtn = document.querySelector('.user_popup_button_close');
const userEmailPopup = document.querySelector('.user_popup_email');
const userPhonePopup = document.querySelector('.user_popup_phone');
const userRolePopup = document.querySelector('.user_popup_role');
const userOrdersPopup = document.querySelector('.user_popup_orders');
const userCreatedAtPopup = document.querySelector('.user_popup_created_at');
const userPopup = document.querySelector('.user_popup');
const orderPopup = document.querySelector('.order_popup');
const orderTable = document.querySelector('.order_table');
const orderBtn = document.querySelector('.user_popup_button_orders');
const closeOrderBtn = document.querySelector('.order_popup_button_close');
const orderHeadCreate = document.querySelector('.order_table_header_created');
const orderHeadAddress = document.querySelector('.order_table_header_address');
const orderHeadStatus = document.querySelector('.order_table_header_status');
const orderHeadBonus = document.querySelector('.order_table_header_bonus');
const orderHeadComment = document.querySelector('.order_table_header_comment');
const orderHeadType = document.querySelector('.order_table_header_type_of_payment');
let currentUserIdOrders;

function createRowInTable (item) {
  console.log(item);
    const row = document.createElement('tr');
    userTable.appendChild(row);
    const tdEmail = document.createElement('td');
    const tdRole = document.createElement('td');
    const tdBan = document.createElement('td');
    row.appendChild(tdEmail);
    row.appendChild(tdRole);
    row.appendChild(tdBan);
    row.setAttribute('id', item.id);
    tdEmail.innerHTML = item.email;
    tdRole.innerHTML= item.roles;
    const button = document.createElement('button');
    tdBan.appendChild(button);
    button.setAttribute('class', 'ban_user_button');
    button.addEventListener('click', banUser);
    button.innerHTML = 'Ban';
}

async function banUser(event) {
  const id = event.target.parentNode.parentNode.id;
  await updateUser ({
    id: Number(id),
    isBanned: true
  })
  initProject ();
}

async function updateUser(data){
  try {
    const response = await axios.put('http://localhost:3000/user', data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getUsers() {
    try {
      const response = await axios.get('http://localhost:3000/user?isBanned=false');
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
}

async function getUserById(id) {
    try {
      const response = await axios.get(`http://localhost:3000/user?id=${id}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
}

async function showUserInfo (event) {
    const userId = event.target.parentNode.id;
    currentUserIdOrders = userId;
    const user = await getUserById(userId);
    showUserPopup(user[0]);
}

function showUserPopup (user) {
    if (isVisibleUserPopup) {
        userPopup.style.visibility = 'hidden';
        isVisibleUserPopup = false;
        return
    }
    userEmailPopup.innerHTML = user.email;
    userPhonePopup.innerHTML = user.phone;
    userRolePopup.innerHTML = user.role;
    userOrdersPopup.innerHTML = user.orders.length;
    userCreatedAtPopup.innerHTML = user.activated_at;
    clearOrderTable();
    user.orders.forEach(item => enterOrdersTable(item))
    userPopup.style.visibility = 'visible';
    isVisibleUserPopup = true;
}

function showOrdersPopup() {
  if(isVisibleOrderPopup) {
    orderPopup.style.visibility = 'hidden';
    userPopup.style.visibility = 'visible';
    isVisibleOrderPopup = false;
      return
  }
  orderPopup.style.visibility = 'visible';
  userPopup.style.visibility = 'hidden';
  isVisibleOrderPopup = true;
}

function clearOrderTable () {
  orderTable.innerHTML = '<tr><th class="order_table_header_created" style="width: 430px;">Created</th><th class="order_table_header_address" style="width: 200px;">Address</th><th class="order_table_header_status" style="width: 200px;">Status</th><th class="order_table_header_bonus" style="width: 200px;">Bonus</th><th class="order_table_header_comment" style="width: 200px;">Comment</th><th class="order_table_header_type_of_payment" style="width: 200px;">Type Of Payment</th></tr>'
}

function clearUserTable () {
  userTable.innerHTML = '<tr><th class="user_table_header_email" style="width: 430px;">Email</th><th class="user_table_header_role" style="width: 200px;">Role</th><th style="width: 200px;"> Ban </th></tr>'
}

function enterOrdersTable (item) {
  const row = document.createElement('tr');
  orderTable.appendChild(row);
  const tdCreated = document.createElement('td');
  const tdAddress = document.createElement('td');
  const tdStatus = document.createElement('td');
  const tdBonus = document.createElement('td');
  const tdComment = document.createElement('td');
  const tdTypeOfPayment = document.createElement('td');
  row.appendChild(tdCreated);
  row.appendChild(tdAddress);
  row.appendChild(tdStatus);
  row.appendChild(tdBonus);
  row.appendChild(tdComment);
  row.appendChild(tdTypeOfPayment);
  row.setAttribute('id', item.id);
  tdCreated.innerHTML = item.created_at;
  tdAddress.innerHTML= item.address;
  tdStatus.innerHTML = item.status;
  tdBonus.innerHTML = item.bonus;
  tdComment.innerHTML = item.comment;
  tdTypeOfPayment.innerHTML = item.type_of_payment;
}

async function initProject () {
  clearUserTable();
    const users = await getUsers();
    users.forEach(item => createRowInTable(item));
    userPopup.style.visibility = 'hidden';
    orderPopup.style.visibility = 'hidden';
}

// async function useSort() {
//   const user = await getUserById(currentUserIdOrders);
//   console.log(user);
// }

initProject ();

userTable.addEventListener('click', showUserInfo);
closeBtn.addEventListener('click', showUserPopup);
closeOrderBtn.addEventListener('click', showOrdersPopup);
orderBtn.addEventListener('click', showOrdersPopup);
// orderHeadCreate.addEventListener('click', useSort);
// orderHeadAddress.addEventListener('click', useSort);
// orderHeadStatus.addEventListener('click', useSort);
// orderHeadBonus.addEventListener('click', useSort);
// orderHeadComment.addEventListener('click', useSort);
// orderHeadType.addEventListener('click', useSort);
