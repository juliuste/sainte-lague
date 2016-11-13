# sainte-lague

An implementation of the Sainte-Laguë (also known as **Webster** or **Schepers**) method. Parliament seat allocation algorithm used in multiple countries such as Germany, Latvia, New Zealand etc…

[![npm version](https://img.shields.io/npm/v/sainte-lague.svg)](https://www.npmjs.com/package/sainte-lague)
[![Build Status](https://travis-ci.org/juliuste/sainte-lague.svg?branch=master)](https://travis-ci.org/juliuste/sainte-lague)
[![dependency status](https://img.shields.io/david/juliuste/sainte-lague.svg)](https://david-dm.org/juliuste/sainte-lague)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/sainte-lague.svg)](https://david-dm.org/juliuste/sainte-lague#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/sainte-lague.svg?style=flat)](LICENSE)

## Installation

```shell
npm install --save sainte-lague
```

## Usage

```js
const sainteLague = require('sainte-lague')

const electionResults = { // number of votes per party
	socialists: 130755,
	conservatives: 102068,
	liberals: 34012,
	greens: 31090,
	crazypeople: 11111
}
const seats = 420 // number of seats to be distributed

const parliament = sainteLague(electionResults, seats)
```

The `parliament` variable will look like this:

```json
{
	"socialists": 178,
	"conservatives": 139,
	"liberals": 46,
	"greens": 42,
	"crazypeople": 15
}
```

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/sainte-lague/issues).