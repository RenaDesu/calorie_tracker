import {
    setLimitText
} from "./set-limit";
import {
    addCurrentTable
} from "./add-current-table";

const addProductBtn = document.querySelector('[data-add-product]');
const currentDate = document.querySelector('[data-current-date]');
const productTitle = document.querySelector('[data-product-title]');
const productKcal = document.querySelector('[data-product-kcal]');
const productWeight = document.querySelector('[data-product-weight]');
const form = document.querySelector('[data-form]');

function showLimit() {
    const limit = localStorage.getItem('CaloriesLimit');
    setLimitText.innerText = limit;
}
showLimit();

const random_id = `_${Math.random().toString(30).substring(2,17) + Math.random().toString(30).substring(2,17)}`;

addProductBtn.addEventListener('click', () => {
    getCurrentData(currentDate.value, productTitle.value, productKcal.value, productWeight.value);
    form.reset();
});

function getCurrentData(date, title, kcal, weight) {
    let data;

    const currentDataArray = [{
        date: `${date}`,
        title: `${title}`,
        kcal: `${kcal}`,
        weight: `${weight}`,
        kcalTotal: `${(parseInt(weight) / 100) * parseInt(kcal)}`,
    }, ];

    localStorage.setItem(`Product${random_id}`, JSON.stringify(currentDataArray[0]));

    data = JSON.parse(localStorage.getItem(`Product${random_id}`));

    addCurrentTable(data);
}

for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key.indexOf('Product') !== -1) {
        let data;
        data = JSON.parse(localStorage.getItem(key));
        addCurrentTable(data);
    }
}