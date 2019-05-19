'use strict'

const roundWithPrecision = require('lodash/round')
const sortBy = require('lodash/sortBy')
const fromPairs = require('lodash/fromPairs')
const range = require('lodash/range')
const flatMap = require('lodash/flatMap')
const sampleSize = require('lodash/sampleSize')

// we round all numbers to the same precision to catch floating point rounding errors
// which is especially relevant if two parties should have exactly the same quotient for a seat
const precision = x => roundWithPrecision(x, 14)

const sum = (partyValues) => Object.values(partyValues).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

const distribute = (votes, seats, opt = {}) => {
	const options = Object.assign({ draw: false }, opt)

	if (Object.values(votes).length < 1) throw new Error('vote distribution must contain at least one party')
	if (!Object.values(votes).every(voteCount => typeof voteCount === 'number' && voteCount >= 0)) throw new Error('party vote counts must be non-negative integers')
	if (!Number.isInteger(seats) || seats <= 0) throw new Error('seats must be a positive integer')
	if (typeof options.draw !== 'boolean') throw new Error('opt.draw must be a boolean')

	const totalVotes = sum(votes)

	// minimum seat count per party
	// smallest divisor: original seat count - number of parties
	const minimumSeatsPerParty = fromPairs(Object.entries(votes).map(([party, voteCount]) => {
		const minimumTotalSeatsForDivisor = Math.max(seats - Object.keys(votes).length, 0)
		const seatCount = Math.round(minimumTotalSeatsForDivisor * voteCount / totalVotes)
		return [party, seatCount]
	}))

	// maximum seat count per party
	// largest divisor: original seat count + number of parties
	const maximumSeatsPerParty = fromPairs(Object.entries(votes).map(([party, voteCount]) => {
		const maximumTotalSeatsForDivisor = seats + Object.keys(votes).length
		const seatCount = Math.min(Math.round(maximumTotalSeatsForDivisor * voteCount / totalVotes), seats)
		return [party, seatCount]
	}))

	const undeterminedQuotients = flatMap(Object.entries(votes).map(([party, voteCount]) => {
		const minimumSeats = minimumSeatsPerParty[party]
		const maximumSeats = maximumSeatsPerParty[party]
		return range(minimumSeats, maximumSeats).map(seatNumber => {
			const quotient = precision(voteCount / (seatNumber + 0.5))
			return { party, quotient }
		})
	}))

	const seatsAllocatedSoFar = sum(minimumSeatsPerParty)
	const seatsLeft = seats - seatsAllocatedSoFar
	const sortedUndeterminedQuotients = sortBy(undeterminedQuotients, ({ quotient }) => -quotient)

	const smallestWinningQuotient = sortedUndeterminedQuotients[seatsLeft - 1].quotient
	const guaranteedWinners = sortedUndeterminedQuotients.filter(({ quotient }) => quotient > smallestWinningQuotient)
	const nonGuaranteedWinners = sortedUndeterminedQuotients.filter(({ quotient }) => quotient === smallestWinningQuotient)

	if (guaranteedWinners.length + nonGuaranteedWinners.length === seatsLeft) guaranteedWinners.push(...nonGuaranteedWinners)
	else {
		if (!options.draw) throw new Error('result is ambiguous, a draw would need to be made, but opt.draw is disabled')
		// draw the  missing seats from non-guaranteed winners
		guaranteedWinners.push(...sampleSize(nonGuaranteedWinners, seatsLeft - guaranteedWinners.length))
	}

	return guaranteedWinners.reduce(
		// accumulator function
		(accumulator, { party }) => {
			accumulator[party] += 1
			return accumulator
		},
		// starting value: minumum seats per party
		minimumSeatsPerParty
	)
}

module.exports = distribute
