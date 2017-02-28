// jshint ignore: start
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}
Number.isNaN = Number.isNaN || function(value) {
    return typeof value === 'number' && isNaN(value);
};

if (!document.documentElement.classList) {
    var prototype = Array.prototype;
    var indexOf   = prototype.indexOf;
    var slice     = prototype.slice;
    var push      = prototype.push;
    var splice    = prototype.splice;
    var join      = prototype.join;

    window.DOMTokenList = function(el) {
        this._element = el;
        if (el.className !== this._classCache) {
            this._classCache = el.className;
            if (!this._classCache) { return }
            var classes = this._classCache.replace(/^\s+|\s+$/g, '').split(/\s+/);
            console.log(classes);
            var i;
            for (i = 0; i < classes.length; i++) {
                push.call(this, classes[i]);
            }
        }
    };

    window.DOMTokenList.prototype = {
        add: function(token) {
            if (this.contains(token)) { return; }
            push.call(this, token);
            this._element.className = slice.call(this, 0).join(' ');
        },

        contains: function(token) {
            return indexOf.call(this, token) !== -1;
        },

        item: function(index) {
            return this[index] || null;
        },

        remove: function(token) {
            var i = indexOf.call(this, token);
            if (i === -1) {
                return;
            }
            splice.call(this, i, 1);
            this._element.className = slice.call(this, 0).join(' ');
        },

        toString: function() {
            return join.call(this, ' ');
        },

        toggle: function(token) {
            if (!this.contains(token)) {
                this.add(token);
            } else {
                this.remove(token);
            }
            return this.contains(token);
        }
    };

    Object.defineProperty(Element.prototype, 'classList', {
        get: function() {
            return new window.DOMTokenList(this);
        }
    });
}
