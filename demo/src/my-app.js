import '../../iron-lazy-pages.js';
import { Polymer as Polymer$0 } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
Polymer$0({
  _template: Polymer.html`
    <section>
      <iron-lazy-pages>
        <section data-path="my-demo.html">
          <my-demo></my-demo>
        </section>
      </iron-lazy-pages>
    </section>
`,

  is: 'my-app'
})
