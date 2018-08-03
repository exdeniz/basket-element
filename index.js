'use strict';
class BasketElement extends HTMLElement {
    constructor() {
        super();
        this.counter = null;
    }
    static get observedAttributes() {
        return ['value'];
    }
    get value() {
        return this.counter.toString();
    }
    set value(value) {
        this.counter = parseFloat(value);
        this.setAttribute('value', this.counter.toString());
    }
    increment() {
        this.counter++;
        this.setAttribute('value', this.counter.toString());
    }
    decrement() {
        if (this.counter > 0) {
            this.counter--;
            this.setAttribute('value', this.counter.toString());
        }
    }
    _setSpanAria(alert = false) {
        this.querySelector('span').setAttribute('role', alert ? 'alert' : 'status');
        this.querySelector('span').setAttribute('aria-label', `количество в корзине ${this.getAttribute('value')}`);
    }
    _setAria() {
        this.setAttribute('tabindex', '0');
        this.setAttribute('role', 'link');
        this.setAttribute('aria-label', 'корзина');
    }
    connectedCallback() {
        this.counter = this.getAttribute('value') ? parseFloat(this.getAttribute('value')) : 0;
        this._setSpanAria();
        this._setAria();
        if (this.counter === null)
            this.querySelector('span').hidden = true;
    }
    disconnectedCallback() { }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(newValue);
        if (name === 'value') {
            if (oldValue !== newValue) {
                this._setSpanAria(true);
                if (newValue !== '0') {
                    this.querySelector('span').innerHTML = newValue;
                    this.querySelector('span').hidden = false;
                }
                else {
                    this.querySelector('span').innerHTML = newValue;
                    this.querySelector('span').hidden = true;
                }
            }
        }
    }
}
export default BasketElement;
if (!window.customElements.get('basket-element')) {
    window.BasketElement = BasketElement;
    window.customElements.define('basket-element', BasketElement);
}
