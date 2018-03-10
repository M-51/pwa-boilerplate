/* intercept clicks on links, and send request */
import handleAjaxResponse from './response';

// if ajax, add header to request
function fetchAjax(url, headers = { 'X-Requested-With': 'XMLHttpRequest' }) {
    return fetch(url, { headers: new Headers(headers) });
}

// catch clicks
function intercept(e) {
    e.preventDefault();
    fetchAjax(e.target.href).then(handleAjaxResponse);
}

// start listening for clicks
function startListening() {
    [...document.links].forEach((link) => { link.addEventListener('click', intercept); });
}

export { fetchAjax, startListening };
