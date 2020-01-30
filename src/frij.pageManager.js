import { addChildTo,htmlToTemplate, cloneElement } from "./frij.elements.js";
import listeners from "./frij.listeners.js";

const PageManager = () => {
    let _Page = () => { };

    const loadPage = (Page, parent) => {
        listeners.removeAllPageListeners();
        unLoadPage();
        parent.innerHTML = "";
        _Page = Page();
        _Page.preLoad ? _Page.preLoad() : "";
        let sR = parent.shadowRoot;
        if(!sR) sR = parent.attachShadow({ 'mode': 'open' });
        sR.innerHTML = "";
        let template = htmlToTemplate(_Page.render());
        addChildTo(cloneElement(template), sR);
        if (_Page.onLoad && typeof _Page.onLoad === "function") {
            _Page.onLoad(sR);
        }
    };

    const unLoadPage = () => {
        if (_Page.onUnload && typeof _Page.onUnload === "function") {
            _Page.onUnload();
        }
    }

    return { loadPage, unLoadPage }
}

export default PageManager();