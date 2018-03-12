/* intercept clicks on links, and send request */
import handleAjaxResponse from './response';

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

export { prepareURL, startListening };
