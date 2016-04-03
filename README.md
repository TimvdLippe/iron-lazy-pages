# iron-lazy-pages

[`<iron-pages>`](https://github.com/PolymerElements/iron-pages) with lazy-loading functionality.


## Features

`iron-lazy-pages` uses a custom `iron-lazy-page` type extension element to show and hide the
correct elements according to the provided route. In contrast, `iron-pages`
uses CSS rules to enable this behavior, but the elements are still stamped
to the dom. Extending the `template` tag, its contents inert until needed, a performance increase can be obtained.

### Lazy-loading pages

Big applications have a lot of pages. On first load, loading all page elements
is undesirable. Most of the pages are unused for the current user. To solve
these performance issues, lazy-loading provides an easy-to-use solution.

Lazy-loading means that all elements of your page are loaded when the user
opens the respective page. E.g. when your user visits `domain.com/about`, all
elements on the about page are fetched and loaded.

Example:
```html
<iron-lazy-pages attr-for-selected="data-route" selected="{{route}}">
  <template is="iron-lazy-page" data-route="foo" path="foo/foo.html">
    Foo page
  </template>
</iron-lazy-pages>
```
In the above example, whenever the user routes to `domain.com/foo`, the elements defined
in `foo/foo.html` are fetched from the server and loaded by Polymer. Then the
content of the `template` is stamped to the parent `iron-lazy-pages`.

## Lazy-register elements

Since elements are defined inside a template, the elements are stamped when the
correct route matches. This means that if `lazyRegister` is enabled
(new feature in [Polymer 1.4.0](https://github.com/Polymer/polymer/releases/tag/v1.4.0))
the elements are registered and parsed when they are stamped to the dom.

Example
```html
<iron-lazy-pages attr-for-selected="data-route" selected="foo">
  <template is="iron-lazy-page" data-route="foo">
    Foo page
  </template>
  <template is="iron-lazy-page" data-route="bar">
    <bar-page></bar-page>
  </template>
</iron-lazy-pages>
```
In the above example, all dom-content of `<bar-page>` is not parsed as the route
does match `domain.com/bar`.

## Agnostic for HTTP version

`iron-lazy-pages` does not restrict a usage of a specific HTTP protocol with
accompanying build process. You can use [vulcanize-with-shards](https://github.com/PolymerLabs/web-component-shards) in
your build process to shard all pages into separate HTML imports. This build
process offers superior performance on users with HTTP1.1.

However, you can seemlessly transition to HTTP2 and utilize the same lazy
loading features. This enables for a smooth transition when the adoption rate
of HTTP2 is sufficient enough.
