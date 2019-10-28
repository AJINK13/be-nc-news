const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

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
  it('does not mutate the input array', () => {
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

describe('makeRefObj', () => {
  it('returns an empty object when passed an empty object', () => {
    const input = []
    const actual = makeRefObj(input)
    const expected = {}
    expect(actual).to.deep.equal(expected)
  })
  it('returns an object with one key-value pair with the key being the article title and value being the article id when passed an array containing a single article object', () => {
    const input = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100
    }]
    const actual = makeRefObj(input)
    const expected = {'Living in the shadow of a great man': 1}
    expect(actual).to.deep.equal(expected)
  })
  it('returns an object with two key-value pairs with the keys being the article title and values being the article id when passed an array containing two article objects', () => {
    const input = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100
    },
    {
      article_id: 2,
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: 1289996514171
    }]
    const actual = makeRefObj(input)
    const expected = {'Living in the shadow of a great man': 1, 'Eight pug gifs that remind me of mitch': 2}
    expect(actual).to.deep.equal(expected)
  })
})
describe('formatComments', () => {
  it('returns an empty array when passed an empty comment array and an empty reference object', () => {
    const inputComment = []
    const inputRef = {}
    const actual = formatComments(inputComment, inputRef)
    const expected = []
    expect(actual).to.deep.equal(expected)
  })
  it('returns an array containing one object with the created by property renamed to an author key, belongs to property renamed to article id which corresponds to the original title value provided and created at property converted into a JS date object with votes and body unchanged', () => {
    const inputComment = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }]
    const inputRef = {"They're not exactly dogs, are they?": 1}
    const actual = formatComments(inputComment, inputRef)
    const expected = [{ 
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: 1,
      author: 'butter_bridge',
      votes: 16,
      created_at: new Date(1511354163389)
    }]
    expect(actual).to.deep.equal(expected)
  })
  it('returns an array containing two objects with the created by property renamed to an author key, belongs to property renamed to article id which corresponds to the original title value provided and created at property converted into a JS date object with votes and body unchanged', () => {
    const inputComment = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389
    }]
    const inputRef = {"They're not exactly dogs, are they?": 1, "Living in the shadow of a great man": 2}
    const actual = formatComments(inputComment, inputRef)
    const expected = [{ 
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: 1,
      author: 'butter_bridge',
      votes: 16,
      created_at: new Date(1511354163389)
    },
    {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      article_id: 2,
      author: 'butter_bridge',
      votes: 14,
      created_at: new Date(1479818163389)
    }]
    expect(actual).to.deep.equal(expected)
  })
  it('does not mutate the input array and reference object', () => {
    const inputComment = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }]
    const copyInputComment = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }]
    const inputRef = {"They're not exactly dogs, are they?": 1}
    const copyInputRef = {"They're not exactly dogs, are they?": 1}
    formatComments(inputComment, inputRef)
    expect(inputComment).to.deep.equal(copyInputComment)
    expect(inputRef).to.deep.equal(copyInputRef)
  })
});
