/* history API */
import handleAjaxResponse from './response';
import { prepareURL } from './request';

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
function startListening() {
    window.addEventListener('popstate', handleHistory);
}

export default startListening;
