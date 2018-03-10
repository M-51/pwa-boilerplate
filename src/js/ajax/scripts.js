const main = document.getElementById('main');
const title = document.getElementById('title');

async function handleAjaxResponse(response, addToHistory = true) {
    if (response.status === 200) {
        const json = await response.json();
        main.innerHTML = json.content;
        title.innerHTML = json.title;

        if (addToHistory) {
            window.history.pushState(json.path, json.title, json.path);
        }
    }
}

function fetchAjax(url, headers = { 'X-Requested-With': 'XMLHttpRequest' }) {
    return fetch(url, { headers: new Headers(headers) });
}

function intercept(e) {
    e.preventDefault();
    fetchAjax(e.target.href).then(handleAjaxResponse);
}

[...document.links].forEach((link) => { link.addEventListener('click', intercept); });

/* history API */

// save initial page url
const initialHistoryState = window.location.pathname;

// handle history events
window.addEventListener('popstate', (event) => {
    // fetch requested page, do not add to history
    fetchAjax(event.state || initialHistoryState).then((response) => {
        handleAjaxResponse(response, false);
    });
}, false);
