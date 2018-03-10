var ajax = (function () {
'use strict';

const exportRender = {};

function render(page, error, loader) {
    exportRender.error = error;
    exportRender.page = page;
    exportRender.loader = loader;
}

async function handleAjaxResponse(response, addToHistory = true) {
    if (response.status === 200) {
        const json = await response.json();
        exportRender.page(json);

        if (addToHistory) window.history.pushState(json.path, json.title, json.path);
    }
}

/* intercept clicks on links, and send request */

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

/* history API */

// save initial page url
const initialHistoryState = window.location.pathname;

// handle history events
function handleHistory(event) {
    fetchAjax(event.state || initialHistoryState).then((response) => {
        handleAjaxResponse(response, false);
    });
}

// listening on pop events
function startListening$1() {
    window.addEventListener('popstate', handleHistory);
}

startListening$1();
startListening();

return render;

}());
