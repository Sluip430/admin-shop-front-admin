import '../css/style.css';
import axios from 'axios';
import FormData from 'form-data';

let characteristicCount = 1;
const inputName = document.querySelector('.add_input_name');
const inputCount = document.querySelector('.add_input_count');
const inputDiscount = document.querySelector('.add_input_discount');
const inputPrice = document.querySelector('.add_input_price');
const inputCurrency = document.querySelector('.add_input_currency');
const inputDescription = document.querySelector('.add_input_discription');
const inputImage = document.querySelector('.add_input_image');
const selectCategory = document.querySelector('.add_select_category');
const selectSubCategory = document.querySelector('.add_select_sub_category');
const createProductBtn = document.querySelector('.add_product_button');
const addSubCategoryBtn = document.querySelector('.add_sub_category_button');
const addCategoryBtn = document.querySelector('.add_category_button');
const addInputSubCategory = document.querySelector('.add_input_sub_category');
const addInputCategory = document.querySelector('.add_input_category');
const addSubCategorySubmitButton = document.querySelector('.add_sub_category_submit_button');
const addCategorySubmitButton = document.querySelector('.add_category_submit_button');
const characteristicAddButton = document.querySelector('.characteristic_add_button');
const characteristicAndValue = document.querySelector('.characteristic_and_value');
const link = 'http://localhost:3000';

async function getCategory(){
    try{
        const response = await axios.get(`${link}/category`)
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

async function getSubCategoryByCategoryId(id){
    try{
        const response = await axios.get(`${link}/sub-category?categoryId=${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

async function createOprionsForSelect(select, item){
    const option = document.createElement('option');
    select.appendChild(option);
    option.setAttribute('id', item.id);
    option.setAttribute('class', item.name);
    option.innerHTML = item.name;
}

async function fillCategory() {
    const category = await getCategory();
    selectCategory.innerHTML = '<option>Choose category</option>';
    category.forEach(item => createOprionsForSelect(selectCategory, item));
}

async function fillSubCategory() {
    const value = selectCategory.value;
    if (value === 'Choose category'){
        return
    } else {
        const element = document.querySelector(`.${value}`);
        const subCategory = await getSubCategoryByCategoryId(element.id);
        selectSubCategory.innerHTML = '<option>Choose subCategory</option>';
        subCategory.forEach(item => createOprionsForSelect(selectSubCategory, item));
        selectSubCategory.disabled = false;
        addInputSubCategory.disabled = false;
        addSubCategorySubmitButton.disabled = false;
    }
}

async function showSubCategoryCharact() {
    const div = document.querySelector('.characteristic_and_value');
    div.innerHTML = '<div id = 1 class="characteristic_and_value_inputs"><input class="characteristic_input" type="text" placeholder="Characteristic name"><input class="value_input" type="text" placeholder="Characteristic value"></div>'
    const subCategoryId = document.querySelector(`.${selectSubCategory.value}`).id;
    const { characteristics } = await getSubCategoryById(subCategoryId);
    if (characteristics.length === 0){
        return
    }
    const input = document.querySelector('.characteristic_and_value').children[0].firstChild;
    input.value = characteristics[0].name;
    input.disabled = true;
    for (let i = 1; i < characteristics.length; i++){
        createNewCharacteristicINput();
        const input = document.querySelector('.characteristic_and_value').children[i].firstChild;
        input.value = characteristics[i].name;
        input.disabled = true;
    }
}

async function getSubCategoryById (id) {
    try{
        const response = await axios.get(`${link}/sub-category?id=${id}`);
        return response.data.data[0];
    } catch (error) {
        console.log(error);
    }
}

async function createProduct () {
    try {
        const categoryId = document.querySelector(`.${selectCategory.value}`).id;
        const subCategoryId = document.querySelector(`.${selectSubCategory.value}`).id;
        const data = new FormData();
        data.append('name', `${inputName.value}`);
        data.append('price', `${inputPrice.value}`);
        data.append('currency', `${inputCurrency.value}`);
        data.append('description', `${inputDescription.value}`);
        data.append('count', `${inputCount.value}`);
        data.append('discount', `${inputDiscount.value}`);
        data.append('categoryId', `${categoryId}`);
        data.append('subCategoryId', `${subCategoryId}`);
        data.append('image', inputImage.files[0]);
        const response = await axios({
            method: "post",
            url: 'https://admin-shop-back.herokuapp.com/product',
            data,
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 201) {
            //window.location.href = 'https://sluip430.github.io/admin-shop-front-admin/dist/productManagment.html';
        }
        await addCaracteristicToProduct(response.data.id);
    } catch (error) {
        console.log(error);
    }
}

function showAddSubCategory(){
    addInputSubCategory.style.visibility = 'visible';
    addSubCategorySubmitButton.style.visibility = 'visible';
}

function showAddCategory(){
    addInputCategory.style.visibility = 'visible';
    addCategorySubmitButton.style.visibility = 'visible';
}

async function createCategory () {
    try{
        const response = await axios.post(`${link}/category`, {
            name: addInputCategory.value,
        });
        fillCategory();
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

async function createSubCategory () {
    try{
        const categoryId = document.querySelector(`.${selectCategory.value}`).id;
        console.log(categoryId);
        const response = await axios.post(`${link}/sub-category`, {
            categoryId: Number(categoryId),
            name: addInputSubCategory.value,
        });
        fillSubCategory();
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

function createNewCharacteristicINput () {
    const div = document.createElement('div');
    characteristicAndValue.appendChild(div);
    characteristicCount++;
    div.setAttribute('id', characteristicCount);
    div.setAttribute('class', 'characteristic_and_value_inputs');
    const inputCharact = document.createElement('input');
    const inputValue = document.createElement('input');
    div.appendChild(inputCharact);
    div.appendChild(inputValue);
    inputCharact.setAttribute('class', 'characteristic_input');
    inputValue.setAttribute('class', 'value_input');
}

async function addCaracteristicToProduct (productId) {
    const elements = document.querySelector('.characteristic_and_value').children;
    for (let i = 0; i < elements.length; i++){
        addCharValue(elements[i], productId);
    }
}

async function createValueForCharacteristic (productId, characteristicId, value) {
    try{
        const response = await axios.post(`${link}/charact-value`, {
            productId: Number(productId),
            characteristicId: Number(characteristicId),
            value
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function addCharValue (div, productId) {
    const subCategoryId = document.querySelector(`.${selectSubCategory.value}`).id;
    const result = await createCharacteristic(div.firstChild.value, subCategoryId);
    await createValueForCharacteristic(productId, result.id,div.lastChild.value);
}

async function createCharacteristic (name, subCategoryId) {
    try{
        const response = await axios.post(`${link}/characteristics`, {
            name,
            subCategoryId: Number(subCategoryId),
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function initProject() {
    await fillCategory();
    characteristicCount = 1;
}

initProject();

selectCategory.addEventListener('change', fillSubCategory);
selectSubCategory.addEventListener('change', showSubCategoryCharact);
createProductBtn.addEventListener('click', createProduct);
addSubCategoryBtn.addEventListener('click', showAddSubCategory);
addCategoryBtn.addEventListener('click', showAddCategory);
addCategorySubmitButton.addEventListener('click', createCategory);
addSubCategorySubmitButton.addEventListener('click', createSubCategory);
characteristicAddButton.addEventListener('click', createNewCharacteristicINput);

