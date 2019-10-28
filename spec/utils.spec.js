const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

// last test for each is to test for mutation

describe('formatDates', () => {
  it('returns an empty array when passed an empty array', () => {
    const input = []
    const actual = formatDates(input)
    const expected = []
    expect(actual).to.deep.equal(expected)
})
  it('returns an array with one object which has a key-value pair of "created_at:timestamp" with this timestamp being converted to a JS date object', () => {
    const input = [{created_at: 1542284514171}]
    const actual = formatDates(input)
    const expected = [{created_at: new Date(1542284514171)}]
    expect(actual).to.deep.equal(expected)
})
  it('returns an array with one object which has a number of key-value pairs with one key-value pair being "created_at:timestamp" with this timestamp being converted to a JS date object', () => {
  const input = [{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: 1542284514171,
    votes: 100,
  }]
  const actual = formatDates(input)
  const expected = [{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: new Date(1542284514171),
    votes: 100,
  }]
  expect(actual).to.deep.equal(expected)
})
  it('returns an array with multiple objects which have a number of key-value pairs with one key-value pair being "created_at:timestamp" with this timestamp being converted to a JS date object', () => {
  const input = [{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: 1542284514171,
    votes: 100,
  },
  {
    title: 'Sony Vaio; or, The Laptop',
    topic: 'mitch',
    author: 'icellusedkars',
    body:
      'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
    created_at: 1416140514171,
  }]
  const actual = formatDates(input)
  const expected = [{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: new Date(1542284514171),
    votes: 100,
  },
  {
    title: 'Sony Vaio; or, The Laptop',
    topic: 'mitch',
    author: 'icellusedkars',
    body:
      'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
    created_at: new Date(1416140514171),
  }]
  expect(actual).to.deep.equal(expected) 
})
  it('does mutate the input array', () => {
    const input = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }]
    inputCopy = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }]
    formatDates(input)
    expect(input).to.deep.equal(inputCopy)
  })
})

describe('makeRefObj', () => {});

describe('formatComments', () => {});
