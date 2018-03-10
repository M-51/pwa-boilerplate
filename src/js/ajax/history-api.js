/* history API */
import { fetchAjax } from './request';
import handleAjaxResponse from './response';

// save initial page url
const initialHistoryState = window.location.pathname;

// handle history events
function handleHistory(event) {
    fetchAjax(event.state || initialHistoryState).then((response) => {
        handleAjaxResponse(response, false);
    });
}

// listening on pop events
function startListening() {
    window.addEventListener('popstate', handleHistory);
}

export default startListening;
