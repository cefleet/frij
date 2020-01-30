//This is pretty rough and non-intuitive.
const Store = () =>{

    let store = {};
    let listeners = []; 

    const getStore = () =>{
        return store;
    }

    const updateItem = (type,data) => {        
        store[type] = data;
        listeners.forEach((l)=>{
            if(l.type === type){
                //since this is replacing data, it is all returned
                l.callback(JSON.parse(JSON.stringify(data)), "all",type);
            }
        });
    }

    const addManyItems = (type,data) =>{

        if(!store[type]) {
            store[type] = [];
        }else if(store[type] && !Array.isArray(store[type])){
            console.warn("The item could not be saved. The Stored item is not an array.");
            return;
        }

        data.forEach((d)=>{
            for (i = store[type].length - 1; i >= 0; --i) {
                if(store[type][i].id === d.id){
                    store[type].splice(i,1)
                }
            }
            store[type].push(d)
        });

    }

    const addToItem = (type,data) => {

        if(typeof data !== "string" && !Array.isArray(data)){
            /*
            if(!data.id){
                data.id = uuid();
            }
            */
        }
        if(!store[type]) {
            store[type] = [];
        }else if(store[type] && !Array.isArray(store[type])){
            console.warn("The item could not be saved. The Stored item is not an array.");
            return;
        }
        store[type].push(data);
        listeners.forEach((l)=>{
            if(l.type === type){
                if(l.returnValue === "single"){
                    l.callback(JSON.parse(JSON.stringify(data)), "new",type);
                } else {
                    l.callback(JSON.parse(JSON.stringify(store[type])), "all",type);
                }
            }
        });

    }

    const removeChildItem = (type, childIdentifier, attribute="id") =>{
        if(!store[type]) return [];
        store[type] = [...store[type].filter(ch=>ch[attribute] !== childIdentifier)];
        listeners.forEach((l)=>{
            if(l.type === type){
                if(l.returnValue === "single"){
                    l.callback(JSON.parse(JSON.stringify(result)), "updated",type);
                } else {
                    l.callback(JSON.parse(JSON.stringify(store[type])), "all",type);
                }
            }
        });
        return store[type];
    };

    ///requires item to be an arrray
    const updateChildItem = (type,data,childIdentifier, attribute="id") => {
        childIdentifier = childIdentifier || data[attribute];
        if(!childIdentifier){
            console.warn('Data could not be saved. There was no id.');
            return
        }
        if(!store[type]){
            store[type] = [];
        }
        let result = {...store[type].filter(item=>item[attribute] === childIdentifier)[0],...data}
        store[type] = [...store[type].filter(item=>item[attribute] !== childIdentifier),result];
        listeners.forEach((l)=>{
            if(l.type === type){
                if(l.returnValue === "single"){
                    l.callback(JSON.parse(JSON.stringify(result)), "updated",type);
                } else {
                    l.callback(JSON.parse(JSON.stringify(store[type])), "all",type);
                }
            }
        });
    }

    const getItem = (type) =>{
        if(!store[type]) return [];
        return JSON.parse(JSON.stringify(store[type]));
    }

    const getChildItem = (type, childIdentifier, attribute="id") => {
        if(!store[type]) return null
        
        let r = store[type].filter(t=>t[attribute] === childIdentifier)[0];
        r = r ? JSON.parse(JSON.stringify(r)):null

        return r;
    }   

    /*
        listener = {
            type:type of store item,
            callback:return function,
            returnValue: changed, new, all <-default
        }
    */
   
    const addListener = (listener) =>{     
        listeners.push(listener)       
    }

    const removeListener = (listenerId)=>{
        listeners = listeners.filter(l=>l.id !== listenerId);
    }

    return {getStore, getChildItem, updateItem, updateChildItem,removeChildItem, getItem, addListener,removeListener, addToItem, addManyItems}
}

export default Store();