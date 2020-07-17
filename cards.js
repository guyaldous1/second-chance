
const dirtyVersion = process.env.VERSION === 'dirty'


let starterCards = [
  '1001001100011001001000000',
  '0000000110111100010000100',
  '0000000100011100101001010',
  '0111000100001000111000000',
  '0010001110011100010000000',
  '0000001110010100111000000',
  '0011000010000101111000000',
  '0011000100001100010000110',
  '0001000110011000011000010',
  '0110000110001100110000000',
  '0010001110001000111000000',
  '0001000110011001100010000',
  '0110000110011000011000000'
]

let gameCards = [
  '0000000000001000000000000',
  '0000000000001000000000000',
  '0000000000001000000000000',
  '0000000000001100000000000',
  '0000000000001100000000000',
  '0000000000001100000000000',
  '0000000100001100000000000',
  '0000000100001100000000000',
  '0000000100001100000000000',
  '0000000000011100000000000',
  '0000000000011100000000000',
  '0000000000011100000000000',
  '0000000100011000100000000',
  '0000000100001000010000100',
  '0000000100001000011000000',
  '0000000100001100010000000',
  '0000000110001100000000000',
  '0000001100010000110000000',
  '0000000100011100010000000',
  '0000001110001000010000000',
  '0000000110011100000000000',
  '0000000110011000100000000',
  '0000000000011110010000000',
  '0000001000010000111000000',
  '0000001110000110000000000',
  '0000000110001000110000000',
  '0000001110011000100000000',
  '0000001100011000110000000',
  '0000000100011100011000000',
  '0000000100011100010000100',
  '0000000100011100101000000',
  '0010001100011000010000000',
  '0000000100111110000000000',
  '0000010010111100000000000',
  '0000001100001110110000000',
  '0000001010010100111000000',
  '0000001000011000011000011',
  '0000000110011100110000000',
  '0000001010011100101000000',
  '0010000100011110010000000',
  '0000000100011100111000000',
  '0000000000111110101000000',
]


//https://github.com/Daplie/knuth-shuffle
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

module.exports = {
shuffleCards: function (){
  var clone = gameCards.slice(0);
  return shuffle(clone)
},
drawCards: function(d){
  return d.splice(0, 2)
},
shuffleStarters: function (){
  var clone = starterCards.slice(0);
  return shuffle(clone)
},
drawStarters: function(d){
  return d.splice(0, 1)
},
}
