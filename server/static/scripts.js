const main = document.getElementById('main');
const title = document.getElementById('title');

function renderPage(json) {
    main.innerHTML = json.content;
    title.innerHTML = json.title;
}

function renderError(json) {
    return json;
}

function renderLoader(json) {
    return json;
}

ajax(renderPage, renderError, renderLoader);
