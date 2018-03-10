const exportRender = {};

function render(page, error, loader) {
    exportRender.error = error;
    exportRender.page = page;
    exportRender.loader = loader;
}

export { exportRender, render };
