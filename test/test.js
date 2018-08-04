describe("basket-element", function() {
  describe("element creation", function() {
    it("creates from document.createElement", function() {
      const el = document.createElement("basket-element")
      assert.equal("BASKET-ELEMENT", el.nodeName)
    })

    it("creates from constructor", function() {
      const el = new window.BasketElement()
      assert.equal("BASKET-ELEMENT", el.nodeName)
    })
  })

  describe("custom element as button", function() {
    beforeEach(function() {
      document.body.innerHTML = `<basket-element>
        <span>0</span>
        <svg></svg>
      </basket-element>`
    })

    afterEach(function() {
      document.body.innerHTML = ""
    })
    it("set attribute to button", function() {
      const ce = document.querySelector("basket-element")
      assert.equal(ce.getAttribute("role"), "button")
    })

    it("set default aria-label", function() {
      const ce = document.querySelector("basket-element")
      assert.equal(ce.getAttribute("aria-label"), "basket")
    })

    it("increment", function() {
      const ce = document.querySelector("basket-element")
      ce.increment()
      assert.equal(ce.value, "1")
    })

    it("decrement", function() {
      const ce = document.querySelector("basket-element")
      ce.value = 5
      ce.decrement()
      assert.equal(ce.value, "4")
    })

    it("set", function() {
      const ce = document.querySelector("basket-element")
      ce.value = 5
      assert.equal(ce.value, "5")
    })
    it("set null & hidden span", function() {
      const ce = document.querySelector("basket-element")
      ce.value = 0
      assert.isTrue(document.querySelector("basket-element span").hidden)
    })

    it("set attribute after update", function() {
      const ce = document.querySelector("basket-element")
      ce.value = 5
      assert.equal(ce.querySelector("span").getAttribute("role"), "alert")
    })

    it("check span on 0", function() {
      const ce = document.querySelector("basket-element")
      ce.value = 0
      ce.increment()
      ce.decrement()
      assert.isTrue(ce.querySelector("span").hidden)
      assert.equal(ce.querySelector("span").innerHTML, "0")
      assert.equal(ce.querySelector("span").getAttribute("role"), "status")
    })
    it("check span on change to 1", function() {
      const ce = document.querySelector("basket-element")
      ce.value = 0
      ce.increment()
      ce.increment()
      ce.decrement()
      assert.isFalse(ce.querySelector("span").hidden)
      assert.equal(ce.querySelector("span").innerHTML, "1")
      assert.equal(ce.querySelector("span").getAttribute("role"), "alert")
    })
  })

  describe("custom element as link", function() {
    beforeEach(function() {
      document.body.innerHTML = `<basket-element value=0 href="/cart" aria-label="goto basket">
      <span>0</span>
      <svg></svg>
    </basket-element>`
    })

    afterEach(function() {
      document.body.innerHTML = ""
    })
    it("set attribute as link", function() {
      const ce = document.querySelector("basket-element")
      assert.equal(ce.getAttribute("role"), "link")
    })
    it("set custom aria-label", function() {
      const ce = document.querySelector("basket-element")
      assert.equal(ce.getAttribute("aria-label"), "goto basket")
    })
  })

  describe("custom element as custom role, custom message", function() {
    beforeEach(function() {
      document.body.innerHTML = `<basket-element value=0 href="/cart" role="modal" message="In basket {{#}} items">
      <span>0</span>
      <svg></svg>
    </basket-element>`
    })

    afterEach(function() {
      document.body.innerHTML = ""
    })
    it("set attribute as link", function() {
      const ce = document.querySelector("basket-element")
      assert.equal(ce.getAttribute("role"), "modal")
    })
    it("check aria label is 0", function() {
      const ce = document.querySelector("basket-element")
      assert.equal(ce.querySelector("span").getAttribute("aria-label"), "In basket 0 items")
    })
    it("check aria label is 1", function() {
      const ce = document.querySelector("basket-element")
      ce.value = 1
      assert.equal(ce.querySelector("span").getAttribute("aria-label"), "In basket 1 items")
    })
  })
})
