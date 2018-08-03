# &lt;basket-element&gt; element

Custom element basket with counter.

## Installation

```
$ npm install @exdeniz/basket-element
```

## Usage

```js
import "@exdeniz/basket-element"
```

```html
<basket-element value=1>
  <span>0</span>
  <svg></svg>
</basket-element>
```

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
