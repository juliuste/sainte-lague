'use strict'

const calculateSeats = (votes, divisor) => {
	const distribution = {}
	let seats = 0
	for (let party in votes) {
		distribution[party] = Math.round(votes[party] / divisor)
		seats += distribution[party]
	}
	return { distribution, seats }
}

const sum = (votes) => {
	let sum = 0
	for (let party in votes) {
		sum += votes[party]
	}
	return sum
}

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
