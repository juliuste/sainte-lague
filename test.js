'use strict'

const tape = require('tape')
const sl = require('.')

tape('german bundestag', t => {
	const votes = {
		union: 415,
		spd: 257,
		linke: 86,
		gruene: 84
	}
	const seats = 631
	const parliament = {
		union: 311,
		spd: 193,
		linke: 64,
		gruene: 63
	}
	t.deepEqual(sl(votes, seats), parliament)
	t.end()
})

tape('rhineland-palatinate', t => {
	const votes = {
		spd: 362,
		cdu: 318,
		afd: 126,
		fdp: 62,
		gruene: 53
	}
	const seats = 101
	const parliament = {
		spd: 39,
		cdu: 35,
		afd: 14,
		fdp: 7,
		gruene: 6
	}
	t.deepEqual(sl(votes, seats), parliament)
	t.end()
})

tape('schleswig-holstein', t => {
	const votes = {
		cdu: 308,
		spd: 304,
		gruene: 132,
		fdp: 82,
		piraten: 82,
		ssw: 46
	}
	const seats = 69
	const parliament = {
		cdu: 22,
		spd: 22,
		gruene: 10,
		fdp: 6,
		piraten: 6,
		ssw: 3
	}
	t.deepEqual(sl(votes, seats), parliament)
	t.end()
})

tape('equal vote count (non-ambiguous)', t => {
	const votes = {
		union: 415,
		spd: 257,
		linke: 85,
		gruene: 85
	}
	const seats = 631
	const parliament = {
		union: 311,
		spd: 192,
		linke: 64,
		gruene: 64
	}
	t.deepEqual(sl(votes, seats), parliament)
	t.end()
})

tape('equal vote count (ambiguous)', t => {
	const votes = {
		linke: 3,
		gruene: 3,
		fdp: 1
	}
	const seats = 8

	// throws without opt.draw = true
	t.throws(() => sl(votes, seats))

	const drawn = sl(votes, seats, { draw: true })
	t.ok(drawn.fdp = 1)
	t.ok([3, 4].includes(drawn.gruene))
	t.ok([3, 4].includes(drawn.linke))
	t.ok(drawn.gruene + drawn.linke + drawn.fdp === 8)
	t.end()
})

tape('small parliament (non-ambiguous)', t => {
	const votes = {
		a: 2,
		b: 2
	}
	const seats = 2
	const parliament = {
		a: 1,
		b: 1
	}
	t.deepEqual(sl(votes, seats), parliament)
	t.end()
})

tape('only one party', t => {
	const votes = {
		a: 2
	}
	const seats = 10
	const parliament = {
		a: 10
	}
	t.deepEqual(sl(votes, seats), parliament)
	t.end()
})
