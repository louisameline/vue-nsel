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
import nsel from 'vue-nsel'

const eventEmitter = new nsel()

eventEmitter
	.on('aaa.foo', callback1)
	.on('bbb.bar', callback2)
	.on('ccc.bar', callback3)  
	.on('ddd', callback4)  
	.on('ddd.baz', callback5)  
	.on(['eee', 'eee.baz'], callback6)  
	.on('fff.foo.bar', callback7)  
	.on('ggg.foo.bar.baz', callback8)  

// calls `callback` as expected, passing x and y as arguments.
// note: namespaces are not meant to be used in `emit()`
eventEmitter.emit('aaa', x, y)

// unbinds nothing as no listeners were bound on `aaa` with the `baz` namespace
eventEmitter.off('aaa.baz')

// unbinds the 2 listeners on `bbb` and `ccc`
eventEmitter.off('.foo')

// unbinds the 2 listeners on `ddd`
eventEmitter.off('ddd')

// unbinds the listener on `eee.baz` only, not the one on `eee`
eventEmitter.off('eee.baz')

// unbinds the listeners on `fff` and `ggg`
eventEmitter.off('.foo.bar')
```

Methods
-----

Same as Vue's methods: `on`, `once`, `off`, `emit`.

Calls may be chained as above.

The event(s) passed to `off()` may be a just an event name, or an event name and a namespace (or several namespaces), or just a namespace (or several namespaces).

This library wraps Vue's methods, so `on` and `off` also accept a string or an array of strings as first parameter, whereas `once` does not. Check Vue's documentation for more information: https://vuejs.org/v2/api/#Instance-Methods-Events  

Options
-----

The only available option is the delimiter between the event name and the namespace(s). By default it's a dot, but you may choose otherwise:

`const eventEmitter = new nsel({ separator: ':' })`

License
-----
MIT