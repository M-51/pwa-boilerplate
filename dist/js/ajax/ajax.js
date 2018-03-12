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

function prepareURL(url) {
    const newURL = new URL(url);
    newURL.pathname = newURL.pathname === '/' ? '/api' : `/api${newURL.pathname}`;
    return newURL;
}

// catch clicks
function intercept(e) {
    const url = prepareURL(e.target.href);
    if (url) {
        e.preventDefault();
        fetch(url).then(handleAjaxResponse);
    }
}

// start listening for clicks
function startListening() {
    [...document.links].forEach((link) => { link.addEventListener('click', intercept); });
}

/* history API */

// save initial page url
const initialHistoryState = window.location;

// handle history events
function handleHistory(event) {
    let url;
    if (event.state) {
        url = prepareURL(new URL(event.state, window.location.origin));
    } else {
        url = prepareURL(initialHistoryState);
    }
    fetch(url).then((response) => {
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
