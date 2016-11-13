'use strict'

const assert = require('assert')
const sl = require('./index')

// German Bundestag
const bundestagVotes = {
	union: 415,
	spd: 257,
	linke: 86,
	gruene: 84
}
const bundestagSeats = 631
const bundestag = {
	union: 311,
	spd: 193,
	linke: 64,
	gruene: 63
}
assert.deepEqual(sl(bundestagVotes, bundestagSeats), bundestag, 'Testing: German Bundestag')

// Rhineland-Palatinate
const rpVotes = {
	spd: 362,
	cdu: 318,
	afd: 126,
	fdp: 62,
	gruene: 53
}
const rpSeats = 101
const rp = {
	spd: 39,
	cdu: 35,
	afd: 14,
	fdp: 7,
	gruene: 6
}
assert.deepEqual(sl(rpVotes, rpSeats), rp, 'Testing: Rhineland-Palatinate')

// Schleswig-Holstein
const shVotes = {
	cdu: 308,
	spd: 304,
	gruene: 132,
	fdp: 82,
	piraten: 82,
	ssw: 46
}
const shSeats = 69
const sh = {
	cdu: 22,
	spd: 22,
	gruene: 10,
	fdp: 6,
	piraten: 6,
	ssw: 3
}
assert.deepEqual(sl(shVotes, shSeats), sh, 'Testing: Schleswig-Holstein')