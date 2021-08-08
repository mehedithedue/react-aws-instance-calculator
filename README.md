## AWS Instance Calculator
its a aws instance calclulator with price show by cpu and memory by API, made by REACT.JS

> Simple react loan calculator

![](https://img.shields.io/github/last-commit/GavBaros/react-tinder-cards.svg?style=flat)
![](https://img.shields.io/github/repo-size/GavBaros/react-tinder-cards.svg?style=flat)
![](https://img.shields.io/david/GavBaros/react-tinder-cards.svg?style=flat)

Drag sliders and get an accurate loan amount.

## Preview

![](calculator.gif)

## Demo

https://codepen.io/GavBarosee/pen/PVwMvG

## Installation

### Setup

```sh
git clone https://github.com/GavBaros/react-loan-calculator.git
cd react-loan-calculator
npm install
npm start
```

### Tests

```sh
npm run test
```

## Documentation

### Amount Range Slider

- A controlled component that can accept number values between 1000 and 20000
- Increases or decreases by a number value of 100 at a time ('step' prop)

### Years Range Slider

- A controlled component that can accept number values between 1 and 5
- The values indicate the amount of years rather than months
- Increases or decreases by a number value of 0.5 years at a time ('step' prop), to represent changes of 6 months at a time

### Display component

- Must have two props: 'years' and 'amount', both values are numbers.

### DisplayChild component

- Must have two props: 'func' and 'text'. 'Func' takes in a function as its value and 'text' a string.
