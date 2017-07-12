'use strict';

var calculateSeats = function calculateSeats(votes, divisor) {
	var distribution = {};
	var seats = 0;
	for (var party in votes) {
		distribution[party] = Math.round(votes[party] / divisor);
		seats += distribution[party];
	}
	return { distribution: distribution, seats: seats };
};

var sum = function sum(votes) {
	var sum = 0;
	for (var party in votes) {
		sum += votes[party];
	}
	return sum;
};

var distribute = function distribute(votes, seats) {
	// initial settings for divisor finding
	var voteSum = sum(votes);
	var low = voteSum / (seats - 2);
	var high = voteSum / (seats + 2);
	var divisor = voteSum / seats;

	// initial / trivial parliament
	var parliament = calculateSeats(votes, divisor);

	// find divisor
	while (parliament.seats != seats) {
		if (parliament.seats < seats) low = divisor;
		if (parliament.seats > seats) high = divisor;
		divisor = (low + high) / 2;
		parliament = calculateSeats(votes, divisor);
	}

	return parliament.distribution;
};

module.exports = distribute;