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
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
