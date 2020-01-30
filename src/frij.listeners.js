import store from "./frij.store.js";

const Listeners = () =>{
    let globalListeners = [];
    let pageListeners = [];

    const getListeners = (type="all")=>{
        if(type === "page") return pageListeners;

        if(type === "global") return globalListeners;
       
        return {page:pageListeners,global:globalListeners};
    }

    const getListener = (listenerId)=>{
        let listener = pageListeners.find(({id})=>id === listenerId);
        let arr = "page";

        if(!listener){
            listener = globalListeners.find(({id})=>id === listenerId);
            arr = "global";
        }

        return {listener:listener, type:arr}
    }

    const removeAllPageListeners = () =>{
        pageListeners.forEach(({id})=>removeListener(id));
        return true;//maybe a promise here ?
    }

    const removeListener = (listenerId) =>{

        let listener = pageListeners.find(({id})=>id === listenerId);
        let arr = "page";

        if(!listener){
            listener = globalListeners.find(({id})=>id === listenerId);
            arr = "global";
        }

        if(listener.selector === "store"){
            store.removeListener(listenerId);
        } else {
            listener.element.removeEventListener(listener.event, listener.callback);
        }
        
        if(arr === "page"){
            pageListeners = pageListeners.filter(({id})=>id !== listenerId);
        } else {
            globalListeners = globalListeners.filter(({id})=>id !== listenerId);
        }

    }

    const addListener = (selector, listener, type="page")=>{

        if(!listener.id){
            listener.id = `${new Date().getTime()}${Math.random()}`;
        }
            
        if(selector === "store"){
            store.addListener({id:listener.id, type:listener.type, callback:listener.callback});
            listener.selector = "store";
        } else {
            let item = selector;
            if(typeof selector === "string") item = document.querySelector(selector);

            item.addEventListener(listener.event, listener.callback);
            listener.selector=selector;
            listener.element = item;
        }


        if(type==="global"){
            globalListeners.push(listener);
        } else {
            pageListeners.push(listener);
        }

        return listener;
    };

    const addGlobalListener = (selector,listener) =>{
        return addListener(selector,listener,"global");
    }

    return {addListener, addGlobalListener,removeListener,removeAllPageListeners, getListeners, getListener}
};

export default Listeners();

