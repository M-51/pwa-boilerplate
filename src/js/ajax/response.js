import { exportRender as render } from './render';

async function handleAjaxResponse(response, addToHistory = true) {
    if (response.status === 200) {
        const json = await response.json();
        render.page(json);

        if (addToHistory) window.history.pushState(json.path, json.title, json.path);
    }
}

export default handleAjaxResponse;
