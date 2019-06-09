"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var nsel =
/*#__PURE__*/
function () {
  function nsel() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, nsel);

    _defaultOptions.set(this, {
      writable: true,
      value: {
        'separator': '.'
      }
    });

    _ee.set(this, {
      writable: true,
      value: void 0
    });

    _listeners.set(this, {
      writable: true,
      value: {}
    });

    _aoListeners.set(this, {
      writable: true,
      value: new WeakMap()
    });

    _options.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _ee, new _vue["default"]());

    _classPrivateFieldSet(this, _options, _objectSpread({}, _classPrivateFieldGet(this, _defaultOptions), {
      options: options
    }));
  }
  /* nsEvents: a string or an array of strings, which may be namespaced.
   * returns the array of un-namespaced events
   */


  _createClass(nsel, [{
    key: "_namespace",
    value: function _namespace(nsEvents, listener) {
      var _this = this;

      if (_typeof(nsEvents) !== 'object') {
        nsEvents = [nsEvents];
      }

      var events = [];
      nsEvents.forEach(function (nsEvent) {
        var namespaces = nsEvent.split(_classPrivateFieldGet(_this, _options).separator),
            event = namespaces.shift();
        events.push(event); // if there are no namespaces, we make an internal one up, to be able
        // store a reference anyway just like for the other listeners

        if (!namespaces.length) {
          namespaces.push('__no-ns__');
        }

        namespaces.forEach(function (ns) {
          if (!_classPrivateFieldGet(_this, _listeners)[event]) {
            _classPrivateFieldGet(_this, _listeners)[event] = {};
          }

          if (!_classPrivateFieldGet(_this, _listeners)[event][ns]) {
            _classPrivateFieldGet(_this, _listeners)[event][ns] = [];
          }

          _classPrivateFieldGet(_this, _listeners)[event][ns].push(listener);
        });
      });
      return events;
    }
    /* same signature as vm.$on */

  }, {
    key: "emit",
    value: function emit() {
      _classPrivateFieldGet(this, _ee).$emit.apply(_classPrivateFieldGet(this, _ee), Array.prototype.slice.call(arguments));
    }
    /* same signature as vm.$off, but events may include a namespace suffix */

  }, {
    key: "off",
    value: function off() {
      var _this2 = this;

      var nsEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var callback = arguments.length > 1 ? arguments[1] : undefined;

      if (!Array.isArray(nsEvents)) {
        nsEvents = [nsEvents];
      } // when calling '.off()', we must have even an empty string in the array to
      // trigger a loop in the forEach below


      if (!nsEvents.length) {
        nsEvents.push('');
      }

      nsEvents.forEach(function (nsEvent) {
        var namespaces = nsEvent.split(_classPrivateFieldGet(_this2, _options).separator),
            event = namespaces.shift(),
            partialMatchListeners = [],
            // the number of times a listener matches one of the namespaces
        partialMatchListenersCount = new WeakMap();
        Object.keys(_classPrivateFieldGet(_this2, _listeners)).forEach(function (ev) {
          if (!event || ev === event) {
            for (var _i = 0, _Object$entries = Object.entries(_classPrivateFieldGet(_this2, _listeners)[ev]); _i < _Object$entries.length; _i++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                  namespace = _Object$entries$_i[0],
                  listeners = _Object$entries$_i[1];

              // if no namespaces were provided, all listeners are affected
              if (!namespaces.length || namespaces.indexOf(namespace) >= 0) {
                listeners.forEach(function (listener) {
                  if (!callback || callback === listener) {
                    // we need to keep the count of matches because for example, when calling
                    // .off('.ns1.ns2.ns3'), a listener must match the 3 namespaces to be
                    // unbound
                    var countPerEvent = partialMatchListenersCount.get(listener);

                    if (!countPerEvent) {
                      countPerEvent = {};
                    }

                    if (!countPerEvent[ev]) {
                      countPerEvent[ev] = 0;
                    }

                    countPerEvent[ev]++;
                    partialMatchListenersCount.set(listener, countPerEvent);
                    partialMatchListeners.push(listener);
                  }
                });
              }
            }
          }
        });
        partialMatchListeners.forEach(function (listener) {
          var countPerEvent = partialMatchListenersCount.get(listener);

          for (var _i2 = 0, _Object$entries2 = Object.entries(countPerEvent); _i2 < _Object$entries2.length; _i2++) {
            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                _event = _Object$entries2$_i[0],
                count = _Object$entries2$_i[1];

            // if no namespaces were provided or if the listener matches all
            if (!namespaces.length || count === namespaces.length) {
              _classPrivateFieldGet(_this2, _ee).$off(_event, listener); // remove references
              // .off('.ns1') will remove a listner bound with .on('.ns1.ns2') so
              // 'ns1' is not always the only namespace affected here


              for (var _i3 = 0, _Object$entries3 = Object.entries(_classPrivateFieldGet(_this2, _listeners)[_event]); _i3 < _Object$entries3.length; _i3++) {
                var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                    namespace = _Object$entries3$_i[0],
                    listeners = _Object$entries3$_i[1];

                var index = listeners.indexOf(listener);

                if (index >= 0) {
                  listeners.splice(listeners.indexOf(listener), 1); // clean empty arrays

                  if (!listeners.length) {
                    delete _classPrivateFieldGet(_this2, _listeners)[_event][namespace];

                    if (!Object.keys(_classPrivateFieldGet(_this2, _listeners)[_event]).length) {
                      delete _classPrivateFieldGet(_this2, _listeners)[_event];
                    }
                  }
                }
              } // if the user manually removed listener was a .once listener, we need to remove our
              // autoOff listener too


              var aoListeners = _classPrivateFieldGet(_this2, _aoListeners).get(listener);

              if (aoListeners && aoListeners[_event]) {
                _classPrivateFieldGet(_this2, _ee).$off(_event, aoListeners[_event]);
              }
            }
          }
        });
      });
    }
    /* same signature as vm.$on */

  }, {
    key: "on",
    value: function on(nsEvents, listener) {
      var events = this._namespace(nsEvents, listener);

      _classPrivateFieldGet(this, _ee).$on(events, listener);
    }
    /* same signature as vm.$once */

  }, {
    key: "once",
    value: function once(nsEvent, listener) {
      var _this3 = this;

      var events = this._namespace(nsEvent, listener);

      _classPrivateFieldGet(this, _ee).$on(events, listener); // unbind after one event


      var autoOff = function autoOff() {
        _this3.off(nsEvent, listener);
      };

      _classPrivateFieldGet(this, _ee).$once(events[0], autoOff); // if the user unbinds before the first event, we need to reference
      // our autoOff listener to unbind it ourselves if need be. A
      // weakmap is used to refer to the initial listener


      var aoListeners = _classPrivateFieldGet(this, _aoListeners).get(listener);

      if (!aoListeners) {
        aoListeners = {};
      }

      aoListeners[events[0]] = autoOff;

      _classPrivateFieldGet(this, _aoListeners).set(listener, aoListeners);
    }
  }]);

  return nsel;
}();

var _defaultOptions = new WeakMap();

var _ee = new WeakMap();

var _listeners = new WeakMap();

var _aoListeners = new WeakMap();

var _options = new WeakMap();

var _default = nsel;
exports["default"] = _default;