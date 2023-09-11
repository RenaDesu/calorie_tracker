const setLimitInput = document.querySelector('[data-setlimit]');
const setLimitBtn = document.querySelector('[data-setlimit-button]');
export const setLimitText = document.querySelector('[data-setlimit-text]');

setLimitBtn.addEventListener('click', setLimit);

function setLimit() {
    const inputValue = setLimitInput.value;
    const limit = `${inputValue} ккал`
    setLimitText.innerText = limit;
    localStorage.setItem('CaloriesLimit', `${limit}`);
    setLimitInput.value = '';
}


