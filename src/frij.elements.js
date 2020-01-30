export const createElement = (element, attributes, innerHTML) => {
    let e = document.createElement(element);
    attributes = attributes || {};
    Object.keys(attributes).forEach(a => {
        if (typeof attributes[a] === "object") {
            e.setAttribute(a, JSON.stringify(attributes[a]))
        } else {
            e.setAttribute(a, attributes[a])
        }
    })
    if(innerHTML) e.innerHTML = innerHTML;
    return e;
};

export const htmlToTemplate = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;   
    return template;
}

export const htmlToElement = (html) =>{
    let span = document.createElement('span');
    html = html.trim();
    span.innerHTML = html;
    return span.children[0];
}

export const getElement = (selector, parent) => {
    parent = parent || document;
    return parent.querySelector(selector);
};

export const addChildTo = (child, parent) => {
    if (typeof parent === "string") {
        parent = getElement(parent);
    }

    return parent.appendChild(child);
}

export const addChildrenTo = (children, parent) => {
    if (typeof parent === "string") {
        parent = getElement(parent);
    }
    children.forEach(child => addChildTo(child, parent));
}

export const cloneElement = (object) => {
    return object.content.cloneNode(true);
}