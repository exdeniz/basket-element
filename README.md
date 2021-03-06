# &lt;basket-element&gt;

Custom element basket with counter.

## Installation

```
$ npm install basket-element
```

## Usage

```js
import "basket-element"
```

```html
<basket-element value="1" href="/cart">
  <span>0</span>
  <svg></svg>
</basket-element>
```

### Method

Method the `<basket-fragment>` element.

- `value` - Set or get counter.
- `increment` - Increment counter.
- `decrement` - Decrement counter.

```js
const loader = document.querySelector("basket-element")
const counter = loader.value // get current counter
loader.value = 5 // set counter
loader.increment() // Increment counter. loader.value return 6
loader.decrement() // Decrement counter. loader.value return 5
```

### Options

| Attribute    | Options                      | Description                                            |
| ------------ | ---------------------------- | ------------------------------------------------------ |
| `value`      | value counter                | default '0'                                            |
| `href`       | if element as link           | if element as link set role="link" add event to click  |
| `role`       | role for element             | Setup custom role element                              |
| `aria-label` | aria-label for element       | Default 'basket'                                       |
| `message`    | template for span aria-label | example: "In basket {{#}} items", default: "In basket" |

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Internet Explorer 11
- Microsoft Edge

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements

## Development

```
npm install
npm test
npm test-watch
```

## License

Distributed under the MIT license. See LICENSE for details.
