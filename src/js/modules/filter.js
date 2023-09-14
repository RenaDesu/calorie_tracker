export function filterProducts(el) {
  const filter = el.value.toUpperCase();
  const table = document.querySelector('[data-current-table]');
  const trs = table.querySelectorAll('tr');

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