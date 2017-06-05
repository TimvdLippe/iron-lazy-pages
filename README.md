# iron-lazy-pages

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/timvdlippe/iron-lazy-pages)
[![Build Status](https://travis-ci.org/TimvdLippe/iron-lazy-pages.svg?branch=master)](https://travis-ci.org/TimvdLippe/iron-lazy-pages)

[`<iron-pages>`](https://github.com/PolymerElements/iron-pages) with lazy-loading functionality.

## Lazy-loading pages

Big applications have a lot of pages. On first load, loading all page elements
is undesirable. Most of the pages are unused for the current user. To solve
these performance issues, lazy-loading provides an easy-to-use solution.

Lazy-loading means that all elements of your page are loaded when the user
opens the respective page. E.g. when your user visits `domain.com/about`, all
elements on the about page are fetched and loaded.

Example:

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="iron-lazy-pages.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<iron-lazy-pages attr-for-selected="data-route" selected="{{route}}">
  <section data-route="foo" data-path="demo/x-foo.html">
    Foo page
  </section>
  <x-bar data-route="bar" data-path="demo/x-bar.html"></x-bar>
</iron-lazy-pages>
```

In the above example, whenever the user routes to `domain.com/foo`, the elements defined
in `foo/foo.html` are fetched from the server and loaded by Polymer.

Consequently whenever the selected value changes from `foo` to `bar`, the page `foo`
will be hidden.

Fetching is only performed once, e.g. switching from `foo` to `bar` to `foo` will fetch
`foo` once and show `foo` twice.
