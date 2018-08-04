interface Window {
  BasketElement: any
  customElements: any
  location: any
}
enum Action {
  Alert,
  Status,
  Hidden
}
declare var window: Window

class BasketElement extends HTMLElement {
  counter: number
  constructor() {
    super()
    this.counter = 0
  }

  static get observedAttributes() {
    return ["value"]
  }

  get value() {
    return this.counter.toString()
  }

  set value(value: string) {
    this.counter = parseFloat(value)
    this.setAttribute("value", this.counter.toString())
  }

  increment() {
    this.counter++
    this.setAttribute("value", this.counter.toString())
  }

  decrement() {
    if (this.counter > 0) {
      this.counter--
      this.setAttribute("value", this.counter.toString())
    }
  }

  //
  _setLabelElement() {
    this.setAttribute("aria-label", this.getAttribute("aria-label") || "basket")
  }

  // Setup role for element
  _setTypeElement() {
    if (this.getAttribute("role")) return

    if (this.getAttribute("href")) {
      this.setAttribute("role", "link")
      this.addEventListener("click", () => {
        window.location.href = this.getAttribute("href")
      })
    } else {
      this.setAttribute("role", "button")
    }
  }
  // Check template
  _messageTemplate() {
    const template = this.getAttribute("message")
    if (!template) {
      return `In basket ${this.counter}`
    }
    const templateMatch = template.match(`{{#}}`)
    if (templateMatch) {
      return template.replace(`{{#}}`, `${this.counter}`)
    } else {
      return template
    }
  }

  // Control
  _controlSpan(action: Action) {
    const el = this.querySelector("span")

    if (!el) {
      console.log("not span")
      return
    }

    switch (action) {
      case Action.Status:
        el.hidden = false
        el.setAttribute("aria-hidden", "false")
        el.setAttribute("role", "status")
        el.setAttribute("aria-label", this._messageTemplate())
        el.innerHTML = `${this.counter}`
        break
      case Action.Alert:
        el.hidden = false
        el.setAttribute("aria-hidden", "false")
        el.setAttribute("role", "alert")
        el.setAttribute("aria-label", this._messageTemplate())
        el.innerHTML = `${this.counter}`
        break
      case Action.Hidden:
        el.setAttribute("role", "status")
        el.setAttribute("aria-label", this._messageTemplate())
        el.setAttribute("aria-hidden", "true")
        el.innerHTML = `${this.counter}`
        el.hidden = true
        break

      default:
        el.hidden = true
        break
    }
  }
  connectedCallback() {
    const value = this.getAttribute("value") || "0"
    this.counter = parseFloat(value)
    if (this.counter !== 0) this._controlSpan(Action.Status)
    this._setTypeElement()
    this._setLabelElement()
    this.setAttribute("tabindex", "0")
    if (this.counter === null) {
      const span = this.querySelector("span") || null
      if (span !== null) span.hidden = true
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "value") {
      if (oldValue !== newValue) {
        if (newValue !== "0") {
          this._controlSpan(Action.Alert)
        } else {
          this._controlSpan(Action.Hidden)
        }
      }
    }
  }
}

if (!window.customElements.get("basket-element")) {
  window.BasketElement = BasketElement
  window.customElements.define("basket-element", BasketElement)
}

export default BasketElement
