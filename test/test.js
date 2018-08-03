describe('basket-element', function() {
  describe('element creation', function() {
    it('creates from document.createElement', function() {
      const el = document.createElement('basket-element')
      assert.equal('BASKET-ELEMENT', el.nodeName)
    })

    it('creates from constructor', function() {
      const el = new window.BasketElement()
      assert.equal('BASKET-ELEMENT', el.nodeName)
    })
  })

  describe('after tree insertion', function() {
    beforeEach(function() {
      document.body.innerHTML = `<basket-element value=0>
        <span>0</span>
        <svg></svg>
      </basket-element>`
    })

    afterEach(function() {
      document.body.innerHTML = ''
    })

    it('increment', function() {
      const ce = document.querySelector('basket-element')
      ce.increment()
      assert.equal(ce.value, '1')
    })
    it('decrement', function() {
      const ce = document.querySelector('basket-element')
      ce.value = 5
      ce.decrement()
      assert.equal(ce.value, '4')
    })
    it('set', function() {
      const ce = document.querySelector('basket-element')
      ce.value = 5
      assert.equal(ce.value, '5')
    })
    it('set null & hidden span', function() {
      const ce = document.querySelector('basket-element')
      ce.value = 0
      assert.isTrue(document.querySelector('basket-element span').hidden)
    })
  })
})
