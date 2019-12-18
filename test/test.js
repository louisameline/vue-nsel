import nsel from '../dist/vue-nsel.js'
import { expect } from 'chai'

let results
const emitter = new nsel(),
	emitEvents = () => {
		emitter
			.emit('e1', 'X', 'Y', 'Z')
			.emit('e2')
			.emit('e3')
			.emit('e4')
	},
	reset = () => {
		results = []
		emitter
			.off()
			.on('e1', () => results.push('A'))
			.on('e1.ns1.ns2', (x, y, z) => results.push('B', x, y, z))
			.on('e1.ns2', () => results.push('C'))
			.on('e1.ns3', () => results.push('D'))
			.on('e2.ns2', () => results.push('E'))
			.on('e2.ns3', () => results.push('F'))
			.on('e2.ns4', () => results.push('G'))
			.once('e3', () => results.push('H'))
			.on(['e4', 'e3.ns1'], () => results.push('I'))
	}

describe("Namespaced listeners for Vue", function() {
	
	it("calls all listeners", function() {
		reset()
		emitEvents()
		expect(results).to.deep.equal(['A', 'B', 'X', 'Y', 'Z', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'I'])
	})
	
	it("doesn't unbind with no matched namespace and once works as expected", function() {
		results = []
		emitter.off('e2.ns1')
		emitEvents()
		expect(results).to.deep.equal(['A', 'B', 'X', 'Y', 'Z', 'C', 'D', 'E', 'F', 'G', 'I', 'I'])
	})

	it("unbinds with one namespace", function() {
		reset()
		emitter.off('e2.ns4')
		emitEvents()
		expect(results).to.deep.equal(['A', 'B', 'X', 'Y', 'Z', 'C', 'D', 'E', 'F', 'H', 'I', 'I'])
	})

	it("unbinds with two namespaces", function() {
		reset()
		emitter.off('e1.ns1.ns2')
		emitEvents()
		expect(results).to.deep.equal(['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'I'])
	})

	it("unbinds when there is one of two namespaces", function() {
		reset()
		emitter.off('.ns2')
		emitEvents()
		expect(results).to.deep.equal(['A', 'D', 'F', 'G', 'H', 'I', 'I'])
	})

	it("unbinds without namespace", function() {
		reset()
		emitter.off('e1')
		emitEvents()
		expect(results).to.deep.equal(['E', 'F', 'G', 'H', 'I', 'I'])
	})

	it("unbinds as expected with arrays", function() {
		reset()
		emitter.off('e3')
		emitEvents()
		expect(results).to.deep.equal(['A', 'B', 'X', 'Y', 'Z', 'C', 'D', 'E', 'F', 'G', 'I'])
	})

	it("unbinds all listeners", function() {
		reset()
		emitter.off()
		emitEvents()
		expect(results).to.deep.equal([])
	})
})
