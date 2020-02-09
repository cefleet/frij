import { loadComponents as lc, createComponent as cc} from "./frij.components.js";
import l from "./frij.listeners.js";
import p from "./frij.pageManager.js";
import s from "./frij.store.js";

export const listeners = l;
export const pageManager = p;
export const store = s;
export const loadComponents = lc;
export const createComponent = cc;

/*
export const uuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
*/