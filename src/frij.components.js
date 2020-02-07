import {addChildTo,htmlToTemplate, cloneElement,createElement} from "./frij.elements.js";

export const loadComponents = (components,location,prefix) =>{
    if(!location){
        throw new Error('A Location for the loading components is required.');
    }
    return new Promise((res,rej)=>{
        let items = [];
        const itemAdded = (item)=>{
            items.push(item);
            if(items.length === components.length){
                res(items);
            }
        };
        components.forEach(async c=>{
            let comp = await import(`${location}/${c}.js`);
            createComponent(comp.default(),prefix);
            itemAdded(c);
        });
    });
};

export const createComponent = ({
    name,
    html,
    onPropsChange,
    preLoad,
    onLoaded,
    onUnloaded,
    observedProps,
    onStateChanges,
    onCreate
}, prefix, customStylesheet) => {
    if(window.customElements.get(`${prefix ? prefix+"-":""}${name}`)) return true; //its already created

    class baseComponent extends HTMLElement {
        constructor() {
            super();
            this._state = {};
            preLoad ? preLoad(this) :"";
            this._shadowRoot = this.attachShadow({ 'mode': 'open' });
            let template = htmlToTemplate(html);
            addChildTo(cloneElement(template), this._shadowRoot);
            if(customStylesheet){
                let l = createElement("link", {type:"text/css", rel:"stylesheet", href:customStylesheet});
                addChildTo(l,this._shadowRoot);  
                this._state.customStylesheet = customStylesheet;              
            }
            this._state.shadow = this._shadowRoot;
            onCreate ? onCreate(this, this._shadowRoot) : ""
        }

        static get observedAttributes() {
            return observedProps || [];
        }

        attributeChangedCallback(name,oldVal,newVal) {
            onPropsChange ? onPropsChange(this,this._shadowRoot, {name,oldVal,newVal}) : "";
        }

        connectedCallback() {
            onLoaded ? onLoaded(this, this._shadowRoot) : "";
        }
        
        disconnectedCallback(){
            onUnloaded ? onUnloaded(this, this._shadowRoot) : "";
        }

        //this maybe should be deprecated
        set state(content){
            let name = Object.keys(content)[0];
            this._state[name] = content[name];

            if(onStateChanges && typeof onStateChanges == "function"){
                onStateChanges(name,this, this._shadowRoot);
            }
        }

        _setState(name,value){
            this._state[name] = value;
            
            if(onStateChanges && typeof onStateChanges == "function"){
                onStateChanges(name,this, this._shadowRoot);
            }
        }

        get state(){
            return this._state;
        }

        get setState(){
            return this._setState;
        }
    }

    window.customElements.define(`${prefix ? prefix+"-":""}${name}`, baseComponent);

    return true;
};