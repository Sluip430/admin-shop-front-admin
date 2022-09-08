import '../css/style.css';
import axios from 'axios';

const productTable = document.querySelector('.product_table');
const addProductBtn = document.querySelector('.add_product');
const link = 'http://localhost:3000'

async function getProducts() {
    try {
      const response = await axios.get(`${link}/product`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
}

function createRowInTable (item) {
    const row = document.createElement('tr');
    productTable.appendChild(row);
    const tdId = document.createElement('td');
    const tdName = document.createElement('td');
    const tdCategory = document.createElement('td');
    const tdSubCategory = document.createElement('td');
    const tdCount = document.createElement('td');
    const tdStatus = document.createElement('td');
    row.appendChild(tdId);
    row.appendChild(tdName);
    row.appendChild(tdCategory);
    row.appendChild(tdSubCategory);
    row.appendChild(tdCount);
    row.appendChild(tdStatus);
    tdId.innerHTML = item.id;
    tdId.setAttribute('id', item.id);
    tdName.innerHTML = item.name;
    tdCategory.innerHTML = item.category.name;
    tdCategory.setAttribute('id', item.category.id);
    tdSubCategory.innerHTML = item.subCategory.name;
    tdSubCategory.setAttribute('id', item.subCategory.id);
    tdCount.innerHTML = item.count;
    if (item.count === 0){
        tdStatus.innerHTML = 'none';
    }else {
        tdStatus.innerHTML = 'in stock';
    }
    
}

function showAddProduct () {
    window.location.href = 'https://sluip430.github.io/admin-shop-front-admin/dist/addProduct.html';
}

async function initProject () {
    const products = await getProducts();
    products.forEach(item => createRowInTable(item));
}

initProject()

addProductBtn.addEventListener('click', showAddProduct);