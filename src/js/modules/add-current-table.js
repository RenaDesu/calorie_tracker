const tableContainer = document.querySelector('[data-current-table-container]');
const tableBody = document.querySelector('[data-current-table-body]');
const trTemplate = document.querySelector('#tr-template').content
    .querySelector('[data-tr]');


export function addCurrentTable(data) {
    if (tableContainer.classList.contains('table--hidden')) {
        tableContainer.classList.remove('table--hidden');
    }
    const trElement = trTemplate.cloneNode(true);
    trElement.setAttribute('id', `${data.id}`)
    trElement.querySelector('[data-title]').innerText = data.title;
    trElement.querySelector('[data-kcal]').innerText = data.kcal;
    trElement.querySelector('[data-gr]').innerText = data.weight;
    trElement.querySelector('[data-kcal-total]').innerText = data.kcalTotal;
    tableBody.appendChild(trElement);
}