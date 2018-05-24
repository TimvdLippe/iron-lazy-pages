import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  is: 'x-foo',
  _template: html`    <style>
  :host {
    display: block;
    height: 100%;
  }
</style>
<h3>Foo page</h3>
<span>from x-foo.html</span>`

});
