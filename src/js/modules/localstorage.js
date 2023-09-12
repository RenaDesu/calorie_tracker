import {
    setLimitText
} from "./set-limit";
import {
    addCurrentTable
} from "./add-current-table";
import {
    getRandomColor
} from "./utils";
import {
    Piechart
} from "./pie-chart";

const addProductBtn = document.querySelector('[data-add-product]');
const currentDate = document.querySelector('[data-current-date]');
const productTitle = document.querySelector('[data-product-title]');
const productKcal = document.querySelector('[data-product-kcal]');
const productWeight = document.querySelector('[data-product-weight]');
const form = document.querySelector('[data-form]');
const diagram = document.querySelector('#diagram');
const diagramLegend = document.querySelector('#diagram-legend');
const diagramContainer = document.querySelector('[data-diagram-container]');
const currentTableContainer = document.querySelector('[data-current-table-body]');
const kcalTableHead = document.querySelector('[data-head-kcal]');
const limit = localStorage.getItem('CaloriesLimit');

const todayDate = new Date().toISOString().slice(0, 10);
//Показ лимита калорий
function showLimit() {
    setLimitText.innerText = limit;
}
showLimit();

const random_id = `_${Math.random().toString(30).substring(2,17) + Math.random().toString(30).substring(2,17)}`;
//Добавление продукта
addProductBtn.addEventListener('click', () => {
    getCurrentData(currentDate.value, productTitle.value, productKcal.value, productWeight.value);
    form.reset();
    drawDiagram();
    alertLimit();
});
//Добавление продукта + запись данных в localStorage
function getCurrentData(date, title, kcal, weight) {
    let data;

    const currentDataArray = [{
        date: `${date}`,
        title: `${title}`,
        kcal: `${kcal}`,
        weight: `${weight}`,
        kcalTotal: `${(parseInt(weight) / 100) * parseInt(kcal)}`,
        id: `Product${random_id}`
    }, ];

    localStorage.setItem(`Product${random_id}`, JSON.stringify(currentDataArray[0]));

    data = JSON.parse(localStorage.getItem(`Product${random_id}`));

    addCurrentTable(data);
}
//вывод продуктов в таблицу на странице
for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key.indexOf('Product') !== -1) {
        let data;
        data = JSON.parse(localStorage.getItem(key));
        if (data.date == todayDate) {
            addCurrentTable(data);
        }
    }
}
//вывод продуктов в диаграмму на странице
function drawDiagram() {
    const colors = [];
    const productsArray = new Map();

    for (let key in localStorage) {

        if (localStorage.hasOwnProperty(key) && key.indexOf('Product') !== -1) {
            let data;
            data = JSON.parse(localStorage.getItem(key));

            if (data.date == todayDate) {

                const products = {
                    product: data.title,
                    totalCal: parseInt(data.kcalTotal),
                    color: getRandomColor(),
                }

                productsArray.set(`${products.product}`, `${products.totalCal}`);
                colors.push(products.color);

                if (diagramContainer.classList.contains('diagram--hidden')) {
                    diagramContainer.classList.remove('diagram--hidden');
                }
            }

            const myPiechart = new Piechart({
                canvas: diagram,
                data: productsArray,
                colors: colors,
                legend: diagramLegend
            });
            myPiechart.draw();
        }
    }
}

drawDiagram();

//Удаление продуктов
window.addEventListener('click', (e) => {
    const target = e.target;
    if (target.hasAttribute('data-delete-current')) {
        const parent = target.closest('.table__row');
        localStorage.removeItem(`${parent.id}`);
        currentTableContainer.removeChild(parent);
        drawDiagram();
        alertLimit();
    }
});

//Сортировка продуктов по калорийности
kcalTableHead.addEventListener('click', (e) => {
    const target = e.target;
    const order = target.dataset.order;
    let dataArr = [];
    let text = 'ккал/100гр';
    
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.indexOf('Product') !== -1) {
            let data;
            data = JSON.parse(localStorage.getItem(key));
            if (data.date == todayDate) {
                dataArr.push(data);
            }
        }
    }

    let data;
    if (order == 'desc') {
        target.dataset.order = 'asc';
        data = dataArr.sort((a, b) => parseInt(a.kcal) > parseInt(b.kcal) ? 1 : -1);  
        text += '&#9660';
    } else {
        target.dataset.order = 'desc';
        data = dataArr.sort((a, b) => parseInt(a.kcal) < parseInt(b.kcal) ? 1 : -1);
        text += '&#9650';
    }

    currentTableContainer.innerHTML = '';

    data.forEach((el) => {
        addCurrentTable(el);
    });

    target.innerHTML = text;
});

//Уведомление о превышении лимита калорий
function alertLimit() {
    const kcalTotalCols = document.querySelectorAll('[data-kcal-total]');
    const caloriesArr = [];
    kcalTotalCols.forEach((el) => {
    const calories = parseInt(el.innerText);
    caloriesArr.push(calories);
    });
    const calories = caloriesArr.reduce((a,b)=>a+b);
    if (parseInt(setLimitText.innerText) < calories) {
        setLimitText.innerText = `${limit} (лимит калорий превышен)`;
        setLimitText.style.color =  'red';
    } else {
        setLimitText.innerText = limit;
        setLimitText.style.color =  '#ad43eb';
    }
}
alertLimit();