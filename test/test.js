import nsel from 'v-nsel'

const test = new nsel(),
	c = () => { console.log('C')},
	emit = () => {
		test.emit('e1', 'X', 'Y', 'Z')
			.emit('e2')
			.emit('e3')
	}

test.on('e1.ns1.ns2', (x, y, z) => { console.log('A', x, y, z) })
	.on('e1.ns2', () => { console.log('B') })
	.on('e1.ns3', c)
	.on('e1', () => { console.log('D') })
	.on('e2.ns2', () => { console.log('E') })
	.on('e2.ns3', () => { console.log('F') })
	.on('e2.ns4', c)
	.once('e3', () => { console.log('G') })

// will log A X Y Z B C D E F C G
// G will be logged only here
emit()
console.log('')

test.off('e2.ns1') // doesn't match any listener
// will log A X Y Z B C D E F C
emit()
console.log('')

test.off('e2.ns4') // matches 1 listener
// will log A X Y Z B C D E F
emit()
console.log('')

test.off('e1', () => {}) // doesn't match any listener
// will log A X Y Z B C D E F
emit()
console.log('')

test.off('e1.ns1.ns2') // matches the first listener
// will log B C D E F
emit()
console.log('')

test.off('.ns2') // matches 2 listeners
// will log C D F
emit()
console.log('')

test.off('e1') // matches 2 listeners
// will log F
emit()
console.log('The end')

test.off() // matches the remaining listener
// will log nothing
emit()
console.log('The real end')
