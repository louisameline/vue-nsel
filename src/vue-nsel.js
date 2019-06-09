import Vue from 'vue'

class nsel {
	
	#defaultOptions = {
		'separator': '.'
	}
	#ee
	#listeners = {}
	#aoListeners = new WeakMap()
	#options
	
	constructor (options = {}) {
		
		this.#ee = new Vue()
		
		this.#options = {
			...this.#defaultOptions,
			...options
		}
	}
	
	/* nsEvents: a string or an array of strings, which may be namespaced.
	 * returns the array of un-namespaced events
	 */
	_namespace (nsEvents, listener) {
		
		if (typeof nsEvents !== 'object') {
			nsEvents = [nsEvents]
		}
		
		const events = []
		
		nsEvents.forEach(nsEvent => {
			
			const namespaces = nsEvent.split(this.#options.separator),
				event = namespaces.shift()
			
			events.push(event)
			
			// if there are no namespaces, we make an internal one up, to be able
			// store a reference anyway just like for the other listeners
			if (!namespaces.length) {
				namespaces.push('__no-ns__')
			}
			
			namespaces.forEach((ns) => {
				
				if (!this.#listeners[event]) {
					this.#listeners[event] = {}
				}
				
				if (!this.#listeners[event][ns]) {
					this.#listeners[event][ns] = []
				}
				
				this.#listeners[event][ns].push(listener)
			})
		})
		
		return events
	}
	
	/* same signature as vm.$on */
	emit () {
		this.#ee.$emit.apply(this.#ee, Array.prototype.slice.call(arguments))
	}
	
	/* same signature as vm.$off, but events may include a namespace suffix */
	off (nsEvents = [], callback) {
		
		if (!Array.isArray(nsEvents)) {
			nsEvents = [nsEvents]
		}
		
		// when calling '.off()', we must have even an empty string in the array to
		// trigger a loop in the forEach below
		if (!nsEvents.length) {
			nsEvents.push('')
		}
		
		nsEvents.forEach(nsEvent => {
			
			const namespaces = nsEvent.split(this.#options.separator),
				event = namespaces.shift(),
				partialMatchListeners = [],
				// the number of times a listener matches one of the namespaces
				partialMatchListenersCount = new WeakMap()
			
			Object.keys(this.#listeners).forEach(ev => {
				
				if (!event || ev === event) {
					
					for (let [namespace, listeners] of Object.entries(this.#listeners[ev])) {
						
						// if no namespaces were provided, all listeners are affected
						if (!namespaces.length || namespaces.indexOf(namespace) >= 0) {
							
							listeners.forEach(listener => {
								
								if (!callback || callback === listener) {
									
									// we need to keep the count of matches because for example, when calling
									// .off('.ns1.ns2.ns3'), a listener must match the 3 namespaces to be
									// unbound
									let countPerEvent = partialMatchListenersCount.get(listener)
									
									if (!countPerEvent) {
										countPerEvent = {}
									}
									if (!countPerEvent[ev]) {
										countPerEvent[ev] = 0
									}
									
									countPerEvent[ev]++
									
									partialMatchListenersCount.set(listener, countPerEvent)
									
									partialMatchListeners.push(listener)
								}
							})
						}
					}
				}
			})
			
			partialMatchListeners.forEach(listener => {
				
				const countPerEvent = partialMatchListenersCount.get(listener)
				
				for (let [event, count] of Object.entries(countPerEvent)) {
					
					// if no namespaces were provided or if the listener matches all
					if (!namespaces.length || count === namespaces.length) {
						
						this.#ee.$off(event, listener)
						
						// remove references
						// .off('.ns1') will remove a listner bound with .on('.ns1.ns2') so
						// 'ns1' is not always the only namespace affected here
						for(let [namespace, listeners] of Object.entries(this.#listeners[event])) {
							
							const index = listeners.indexOf(listener)
							
							if (index >= 0) {
								
								listeners.splice(listeners.indexOf(listener), 1)
								
								// clean empty arrays
								if (!listeners.length) {
									
									delete this.#listeners[event][namespace]
									
									if (!Object.keys(this.#listeners[event]).length) {
										delete this.#listeners[event]
									}
								}
							}
						}
						
						// if the user manually removed listener was a .once listener, we need to remove our
						// autoOff listener too
						const aoListeners = this.#aoListeners.get(listener)
						
						if (aoListeners && aoListeners[event]) {
							this.#ee.$off(event, aoListeners[event])
						}
					}
				}
			})
		})
	}
	
	/* same signature as vm.$on */
	on (nsEvents, listener) {
		const events = this._namespace(nsEvents, listener)
		this.#ee.$on(events, listener)
	}
	
	/* same signature as vm.$once */
	once (nsEvent, listener) {
		
		const events = this._namespace(nsEvent, listener)
		this.#ee.$on(events, listener)
		
		// unbind after one event
		const autoOff = () => {
			this.off(nsEvent, listener)
		}
		this.#ee.$once(events[0], autoOff)
		
		// if the user unbinds before the first event, we need to reference
		// our autoOff listener to unbind it ourselves if need be. A
		// weakmap is used to refer to the initial listener
		let aoListeners = this.#aoListeners.get(listener)
		
		if (!aoListeners) {
			aoListeners = {}
		}
		aoListeners[events[0]] = autoOff
		
		this.#aoListeners.set(listener, aoListeners)
	}
}

export default nsel
