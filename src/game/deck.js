const RANKS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
const SUITS = ['♥','♦','♣','♠']

function cardValue(rank) {
  if (rank === 'A') return 11
  if (rank === 'K' || rank === 'Q' || rank === 'J') return 10
  return parseInt(rank)
}

export function createDeck() {
  const deck = []
  for (const suit of SUITS)
    for (const rank of RANKS)
      deck.push({ suit, rank, value: cardValue(rank) })
  return deck
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
