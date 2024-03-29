// https://juejin.cn/post/6844903902077272071
;(function (global, factory) {
  //  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document
      ? factory(global, true)
      : function (w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document")
          }
          return factory(w)
        }
  } else {
    factory(global)
  }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  var version = "3.4.1",
    // Define a local copy of jQuery
    jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context)
    }

  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    length: 0,
    // ...
  }

  jQuery.extend = jQuery.fn.extend = function () {}

  jQuery.extend({
    // ...
    isPlainObject: function (obj) {},
    // ...
  })

  init = jQuery.fn.init = function (selector, context, root) {}

  init.prototype = jQuery.fn

  if (typeof define === "function" && define.amd) {
    define("jquery", [], function () {
      return jQuery
    })
  }
  jQuery.noConflict = function (deep) {}

  if (!noGlobal) {
    window.jQuery = window.$ = jQuery
  }

  return jQuery
})
