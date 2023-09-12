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

const todayDate = new Date().toISOString().slice(0, 10);
//Показ лимита калорий
function showLimit() {
    const limit = localStorage.getItem('CaloriesLimit');
    setLimitText.innerText = limit;
}
showLimit();

const random_id = `_${Math.random().toString(30).substring(2,17) + Math.random().toString(30).substring(2,17)}`;
//Добавление продукта
addProductBtn.addEventListener('click', () => {
    getCurrentData(currentDate.value, productTitle.value, productKcal.value, productWeight.value);
    form.reset();
    drawDiagram();
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
    }
});