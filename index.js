"use strict";
var Action;
(function (Action) {
    Action[Action["Alert"] = 0] = "Alert";
    Action[Action["Status"] = 1] = "Status";
    Action[Action["Hidden"] = 2] = "Hidden";
})(Action || (Action = {}));
class BasketElement extends HTMLElement {
    constructor() {
        super();
        this.counter = 0;
    }
    static get observedAttributes() {
        return ["value"];
    }
    get value() {
        return this.counter.toString();
    }
    set value(value) {
        this.counter = parseFloat(value);
        this.setAttribute("value", this.counter.toString());
    }
    increment() {
        this.counter++;
        this.setAttribute("value", this.counter.toString());
    }
    decrement() {
        if (this.counter > 0) {
            this.counter--;
            this.setAttribute("value", this.counter.toString());
        }
    }
    _setSpanAria(alert = false) {
        this.querySelector("span").setAttribute("role", alert ? "alert" : "status");
        this.querySelector("span").setAttribute("aria-label", `количествоd в корзине ${this.getAttribute("value")}`);
    }
    //
    _setLabelElement() {
        this.setAttribute("aria-label", this.getAttribute("aria-label") || "basket");
    }
    // Setup role for element
    _setTypeElement() {
        if (this.getAttribute("role"))
            return;
        if (this.getAttribute("href")) {
            this.setAttribute("role", "link");
            this.addEventListener("click", () => {
                window.location.href = this.getAttribute("href");
            });
        }
        else {
            this.setAttribute("role", "button");
        }
    }
    // Check template
    _messageTemplate() {
        const template = this.getAttribute("message");
        if (!template) {
            return `In basket ${this.counter}`;
        }
        const templateMatch = template.match(`{{#}}`);
        if (templateMatch) {
            return template.replace(`{{#}}`, `${this.counter}`);
        }
        else {
            return template;
        }
    }
    // Control
    _controlSpan(action) {
        const el = this.querySelector("span");
        switch (action) {
            case Action.Status:
                el.hidden = false;
                el.setAttribute("aria-hidden", "false");
                el.setAttribute("role", "status");
                el.setAttribute("aria-label", this._messageTemplate());
                el.innerHTML = `${this.counter}`;
                break;
            case Action.Alert:
                el.hidden = false;
                el.setAttribute("aria-hidden", "false");
                el.setAttribute("role", "alert");
                el.setAttribute("aria-label", this._messageTemplate());
                el.innerHTML = `${this.counter}`;
                break;
            case Action.Hidden:
                el.setAttribute("role", "status");
                el.setAttribute("aria-label", this._messageTemplate());
                el.setAttribute("aria-hidden", "true");
                el.innerHTML = `${this.counter}`;
                el.hidden = true;
                break;
            default:
                el.hidden = true;
                break;
        }
    }
    connectedCallback() {
        this.counter = this.getAttribute("value") ? parseFloat(this.getAttribute("value")) : 0;
        if (this.counter !== 0)
            this._controlSpan(Action.Status);
        this._setTypeElement();
        this._setLabelElement();
        this.setAttribute("tabindex", "0");
        if (this.counter === null)
            this.querySelector("span").hidden = true;
    }
    disconnectedCallback() { }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "value") {
            if (oldValue !== newValue) {
                if (newValue !== "0") {
                    this._controlSpan(Action.Alert);
                }
                else {
                    this._controlSpan(Action.Hidden);
                }
            }
        }
    }
}
if (!window.customElements.get("basket-element")) {
    window.BasketElement = BasketElement;
    window.customElements.define("basket-element", BasketElement);
}
export default BasketElement;
