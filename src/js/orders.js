import '../css/style.css';
import axios from 'axios';

const orderInProgress = document.querySelector('.order_in_progress');
const orderFinished = document.querySelector('.order_finished');
const orderClosed = document.querySelector('.order_closed');
const orderTable = document.querySelector('.order_main_table');
const CLOSED = 'Closed'

async function getOrders(status) {
    try {
        const response = await axios.get(`http://localhost:3000/order?status=${status}`);
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

async function fillOrdersBy() {
    const status = 'Closed';
    const orders = await getOrders(status);
    clearTable();
    orders.forEach(item => createRow(item));
}

orderInProgress.addEventListener('click', fillOrdersInProgress);
orderFinished.addEventListener('click', fillOrdersFinished);
orderClosed.addEventListener('click', fillOrdersClosed);