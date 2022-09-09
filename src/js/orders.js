import '../css/style.css';
import axios from 'axios';

const orderInProgress = document.querySelector('.order_in_progress');
const orderFinished = document.querySelector('.order_finished');
const orderClosed = document.querySelector('.order_closed');
const orderTable = document.querySelector('.order_main_table');
const orderUpdateDiv = document.querySelector('.order_update');
const inputAddress = document.querySelector('.input_update_address');
const inputComment = document.querySelector('.input_update_comment');
const inputBonus = document.querySelector('.input_update_bonus');
const inputTypeOfPayment = document.querySelector('.input_update_type');
const inputStatus = document.querySelector('.input_update_status');
const updateButton = document.querySelector('.order_update_button');
const closeButton = document.querySelector('.order_update_close');
let currentOpenOrderId;
const link = 'https://admin-shop-back.herokuapp.com';

async function getOrders(status) {
    try {
        const response = await axios.get(`${link}/order?status=${status}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}

function clearTable() {
    orderTable.innerHTML = '<tr><th class="order_main_table_header_created" style="width: 430px;">Created</th><th class="order_main_table_header_address" style="width: 200px;">Address</th><th class="order_main_table_header_bonus" style="width: 200px;">Bonus</th><th class="order_main_table_header_comment" style="width: 200px;">Comment</th><th class="order_main_table_header_type_of_payment" style="width: 200px;">Type Of Payment</th><th class="order_main_table_header_user" style="width: 200px;">User</th></tr>'
}

function createRow(item) {
    const row = document.createElement('tr');
    orderTable.appendChild(row);
    const tdCreated = document.createElement('td');
    const tdAddress = document.createElement('td');
    const tdBonus = document.createElement('td');
    const tdComment = document.createElement('td');
    const tdTypeOfPayment = document.createElement('td');
    const tdUser = document.createElement('td');
    row.appendChild(tdCreated);
    row.appendChild(tdAddress);
    row.appendChild(tdBonus);
    row.appendChild(tdComment);
    row.appendChild(tdTypeOfPayment);
    row.appendChild(tdUser);
    row.setAttribute('id', item.id);
    tdCreated.innerHTML = item.created_at;
    tdAddress.innerHTML = item.address;
    tdUser.innerHTML = item.user.email;
    tdBonus.innerHTML = item.bonus;
    tdComment.innerHTML = item.comment;
    tdTypeOfPayment.innerHTML = item.type_of_payment;
}

async function fillOrdersInProgress() {
    const status = 'In Progress';
    const orders = await getOrders(status);
    clearTable();
    orders.forEach(item => createRow(item));
}

async function fillOrdersFinished() {
    const status = 'Finished';
    const orders = await getOrders(status);
    clearTable();
    orders.forEach(item => createRow(item));
}

async function fillOrdersClosed() {
    const status = 'Closed';
    const orders = await getOrders(status);
    clearTable();
    orders.forEach(item => createRow(item));
}

async function getOrderById(id) {
    try {
        const response = await axios.get(`${link}/order?id=${id}`);
        return response.data.data[0];
    } catch (error) {
        console.error(error);
    }
}
function fillOrderUpdate(data){
    inputAddress.value = data.address;
    inputComment.value = data.comment;
    inputBonus.value = data.bonus;
    inputTypeOfPayment.value = data.type_of_payment;
    inputStatus.value = data.status;
    orderUpdateDiv.style.visibility = 'visible';
}

async function showUpdateOrderMenu(e) {
const orderId = e.target.parentNode.id;
currentOpenOrderId = orderId;
const order = await getOrderById(orderId);
fillOrderUpdate(order)
}

function initProject () {
    closePopUp();
}

function closePopUp () {
    orderUpdateDiv.style.visibility = 'hidden';
}

async function updateOrder() {
    try {
        await axios.put(`${link}/order`, {
            id: Number(currentOpenOrderId),
            address: inputAddress.value,
            status: inputStatus.value,
            comment: inputComment.value,
            bonus: inputBonus.value,
            type_of_payment: inputTypeOfPayment.value,
        });
        closePopUp();
    } catch (error) {
        console.error(error);
    }
}

orderInProgress.addEventListener('click', fillOrdersInProgress);
orderFinished.addEventListener('click', fillOrdersFinished);
orderClosed.addEventListener('click', fillOrdersClosed);
orderTable.addEventListener('click', showUpdateOrderMenu);
updateButton.addEventListener('click', updateOrder);
closeButton.addEventListener('click', closePopUp);

initProject();