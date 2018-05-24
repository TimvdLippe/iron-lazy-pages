import '../../iron-lazy-pages.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
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
