import { Base } from '../../@polymer/polymer/polymer.js';
import { IronSelectableBehavior } from '../../@polymer/iron-selector/iron-selectable.js';
import { dom } from '../../@polymer/polymer/lib/legacy/polymer.dom.js';

/** @polymerBehavior */
export const IronLazyPagesBehaviorImpl = {
  properties: {
    // as the selected page is the only one visible, activateEvent
    // is both non-sensical and problematic; e.g. in cases where a user
    // handler attempts to change the page and the activateEvent
    // handler immediately changes it back
    // Disabled for this element.
    activateEvent: {
      type: String,
      value: null
    },

    /**
     * Indicates if the page is currently lazy-loading.
     */
    loading: {
      type: Boolean,
      value: false,
      notify: true,
      readOnly: true
    },

    /**
     * If set to true, the previous item will be removed immediately upon
     * switching. By default the item is hidden when the importHref resolves.
     */
    hideImmediately: {
      type: Boolean,
      value: false
    },

    /**
     * The set of excluded elements where the key is the `localName`
     * of the element that will be ignored from the item list.
     *
     * @default {template: 1}
     */
    _excludedLocalNames: {
      type: Object,
      value: function() {
        return {
          // 'template': 1,
          'dom-bind': 1,
          // Explicitly opt-in for `dom-if`
          // 'dom-if': 1,
          'dom-repeat': 1,
        };
      }
    }
  },

  attached: function() {
    this.addEventListener('dom-change', function(event) {
      // Do not listen to possible sub-selectors if these fired and iron-deselect
      if (event.target.parentNode !== this) {
        return;
      }
      var target = event.target;
      if (target['if']) {
        var sibling = target;
        while ((sibling = sibling.previousElementSibling) != this.__previousSibling) {
          sibling.classList.add('iron-lazy-selected');
        }
      }
    }.bind(this));
  },

  listeners: {
    'iron-deselect': '_itemDeselected',
    'iron-select': '_itemSelected'
  },

  _itemDeselected: function(event) {
    // Do not listen to possible sub-selectors if these fired and iron-deselect
    if (dom(event).rootTarget !== this) {
      return;
    }
    if (this.hideImmediately) {
      event.detail.item['if'] = false;
      event.detail.item.classList.remove('iron-lazy-selected');
    } else {
      this._lastSelected = event.detail.item;
    }
  },

  _itemSelected: function(event) {
    // Do not listen to possible sub-selectors if these fired and iron-select
    if (dom(event).rootTarget !== this) {
      return;
    }
    var self = this;
    this._setLoading(true);
    var page = event.detail.item;
    var onFinished = function() {
      self._setLoading(false);
      if (self.selectedItem === page) {
        self._show(page);
      }
    };

    if (!page.classList.contains('iron-lazy-loaded') && page.dataset.path) {
      this._loadPage(page, onFinished);
    } else {
      onFinished();
    }
  },

  /**
   * Provide extension point for tests, to make the element actually testable.
   */
  _loadPage: function(page, onFinished) {
    // When not loaded in shadow dom, `this.parentNode.host` is undefined. Resort back to the parentNode
    var parentHost = this.parentNode;
    while (parentHost && parentHost.nodeName !== '#document-fragment') {
      parentHost = parentHost.parentNode;
    }
    var url;
    if (parentHost && parentHost.host &&  parentHost.host.resolveUrl) {
      url = parentHost.host.resolveUrl(page.dataset.path);
    } else {
      url = page.dataset.path;
    }
    Base.importHref(url, function() {
      page.classList.add('iron-lazy-loaded');
      onFinished();
    }, onFinished);
  },

  _show: function(page) {
    if (this._lastSelected) {
      this._lastSelected['if'] = false;
      this._lastSelected.classList.remove('iron-lazy-selected');
    }

    page.classList.add('iron-lazy-selected');
    page['if'] = true;
    this.__previousSibling = page.previousElementSibling;
  }
};

/** @polymerBehavior */
export const IronLazyPagesBehavior = [
  IronSelectableBehavior,
  IronLazyPagesBehaviorImpl
];
