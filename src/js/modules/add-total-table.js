const tableContainer = document.querySelector('[data-total-table-container]');
const tableBody = document.querySelector('[data-total-table-body]');
const trTemplate = document.querySelector('#tr-total-template').content
    .querySelector('[data-total-tr]');


export function addTotalTable(data) {
    const trElement = trTemplate.cloneNode(true);
    trElement.setAttribute('id', `${data.masterID}`)
    trElement.querySelector('[data-total-date]').innerText = data.date;
    trElement.querySelector('[data-total-kcal]').innerText = data.kcalTotal;
    tableBody.appendChild(trElement);
}