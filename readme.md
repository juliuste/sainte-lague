# sainte-lague

An implementation of the **[Sainte-Laguë](https://en.wikipedia.org/wiki/Webster/Sainte-Lagu%C3%AB_method)** (also known as **Webster** or **Schepers**) method. Parliament seat allocation algorithm used in multiple countries such as Germany, Latvia, New Zealand etc…

*Attention: Since some countries (like Latvia or Norway) use a modification of the algorithm instead of this vanilla version, you should check your country's electoral legislature. Furthermore, I don't take any responsibility for the accuracy of the calculated numbers, even though I'm pretty confident with my implementation.*

[![npm version](https://img.shields.io/npm/v/sainte-lague.svg)](https://www.npmjs.com/package/sainte-lague)
[![License](https://img.shields.io/github/license/juliuste/sainte-lague.svg?style=flat)](license)
[![Contact me](https://img.shields.io/badge/contact-email-turquoise)](mailto:mail@juliustens.eu)

## Installation

```shell
npm install sainte-lague
```

## Usage

**This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).**

```js
import sainteLague from 'sainte-lague'

const electionResults = { // number of votes per party
	socialists: 130755,
	conservatives: 102068,
	liberals: 34012,
	greens: 31090,
	crazypeople: 11111
}
const seats = 420 // number of seats to be distributed
const opt = { // options, can be null
	draw: false // if a draw would be necessary to determine the seat count (e.g. 11 seats and two parties with 100 votes each), the library will throw an error, unless you set draw: true, in which case it will assert the ambiguous seat(s) randomly
}

const parliament = sainteLague(electionResults, seats, opt)
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

## Similar Projects

- [hare-niemeyer](https://github.com/juliuste/hare-niemeyer) - Hare-Niemeyer / Hamilton / largest remainder method
- [DHondt](https://github.com/economia/DHondt) – D'Hondt method

## Contributing

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/sainte-lague/issues).
