'use strict'

const calculateSeats = (votes, divisor) => {
	const distribution = {}
	for (let party in votes) distribution[party] = Math.round(votes[party] / divisor)
	return { distribution, seats: sum(distribution) }
}

const sum = (votes) => Object.values(votes).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

const distribute = (votes, seats) => {
	// initial settings for divisor finding
	const voteSum = sum(votes)
	let low = voteSum / (seats - 2)
	let high = voteSum / (seats + 2)
	let divisor = voteSum / seats

	// initial / trivial parliament
	let parliament = calculateSeats(votes, divisor)

	// find divisor
	while (parliament.seats !== seats) {
		if (parliament.seats < seats) low = divisor
		if (parliament.seats > seats) high = divisor
		divisor = (low + high) / 2
		parliament = calculateSeats(votes, divisor)
	}

	return parliament.distribution
}

module.exports = distribute
