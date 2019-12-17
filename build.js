const words = require('an-array-of-english-words')
const { bigram } = require('n-gram')
const alphabet = require('alphabet').lower
const map = {}

// prepopulate all letter pairs in object
alphabet.forEach(firstLetter => {
  alphabet.forEach(secondLetter => {
    map[`${firstLetter}${secondLetter}`] = 0
  })
})

// collect bigram counts for all English words
words.forEach(word => {
  bigram(word).forEach(pair => {
    map[pair] += 1
  })
})

// create new object sorted by bigram count, descending
const result = Object.entries(map)
  .sort((a,b) => b[1] - a[1])
  .reduce((acc, curr) => {
    acc[curr[0]] = curr[1]
    return acc
  }, {})

process.stdout.write(JSON.stringify(result, null, 2))