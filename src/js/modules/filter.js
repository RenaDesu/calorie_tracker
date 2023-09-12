const filterInput = document.querySelector('[data-filter]');
const table = document.querySelector('[data-current-table]');
const trs = table.querySelectorAll('tr');

filterInput.addEventListener('keyup', filterProducts);

function filterProducts() {
    const filter = filterInput.value.toUpperCase();

    for (let i = 0; i < trs.length; i++) {
      const td = trs[i].querySelectorAll('td')[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          trs[i].style.display = '';
        } else {
          trs[i].style.display = 'none';
        }
      }
    }
  }