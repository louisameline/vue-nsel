# NameSpaced Event Listeners for Vue

This is a wrapper around Vue's event emitter functions which adds the possibility to give a namespace to your listeners, to easily unbind them.  
Inspired by jQuery's namespaces.  
Less than 2kb gzipped.

Installation
------------

`npm install --save vue-nsel`

Usage
-----

```javascript
import { Emitter } from 'vue-nsel'

const eventEmitter = new Emitter()

eventEmitter
  .on('aaa.foo', callback1)
  .on('bbb.bar', callback2)
  .on('ccc.bar', callback3)
  .on('ddd', callback4)
  .on('ddd.baz', callback5)
  .on(['eee', 'eee.baz'], callback6)
  .on('fff.foo.bar', callback7)
  .on('ggg.foo.bar.baz', callback8)

// calls callback1 as expected, passing x and y as arguments.
// note: mind that it's the listeners which are namespaced, not the events.
eventEmitter.emit('aaa', x, y)

eventEmitter
  // unbinds nothing as no listeners were bound on `aaa` with the `baz` namespace
  .off('aaa.baz')
  // unbinds callback1, callback7 and callback8
  .off('.foo')
  // unbinds callback4 and callback5
  .off('ddd')
  // unbinds callback6 on 'eee.baz' only
  .off('eee.baz')
  // unbinds callback7 and callback8
  .off('.foo.bar')
```

Methods
-----

Same as Vue's methods: `on`, `once`, `off`, `emit`.

Calls may be chained as above.

The event(s) passed to `off()` may be just an event name, or an event name with a namespace (or several namespaces), or just a namespace (or several namespaces).

This library wraps Vue's methods, so `on` and `off` also accept a string or an array of strings as first parameter, whereas `once` does not. Check Vue's documentation for more information: https://vuejs.org/v2/api/#Instance-Methods-Events  

Options
-----

The only available option is the delimiter between the event name and the namespace(s). By default it's a dot, but you may choose otherwise:

`const eventEmitter = new nsel({ separator: ':' })`

License
-----
MIT
