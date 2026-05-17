const RANK_ORDER = { '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':14 }

export const HAND_TYPES = [
  { key:'ROYAL_FLUSH',     name:'皇家同花顺', base:100, mult:8 },
  { key:'STRAIGHT_FLUSH',  name:'同花顺',     base:100, mult:8 },
  { key:'FOUR_OF_A_KIND',  name:'四条',       base:60,  mult:7 },
  { key:'FULL_HOUSE',      name:'葫芦',       base:40,  mult:4 },
  { key:'FLUSH',           name:'同花',       base:35,  mult:4 },
  { key:'STRAIGHT',        name:'顺子',       base:30,  mult:4 },
  { key:'THREE_OF_A_KIND', name:'三条',       base:30,  mult:3 },
  { key:'TWO_PAIR',        name:'两对',       base:20,  mult:2 },
  { key:'PAIR',            name:'对子',       base:10,  mult:2 },
  { key:'HIGH_CARD',       name:'高牌',       base:5,   mult:1 },
]

const HAND_MAP = Object.fromEntries(HAND_TYPES.map(h => [h.key, h]))

export function detectHand(cards) {
  if (!cards || cards.length === 0) return null
  const n = cards.length
  const ranks = cards.map(c => RANK_ORDER[c.rank])
  const suits = cards.map(c => c.suit)

  const freq = {}
  for (const r of ranks) freq[r] = (freq[r] || 0) + 1
  const counts = Object.values(freq).sort((a, b) => b - a)

  const isFlush = n === 5 && new Set(suits).size === 1

  let isStraight = false
  if (n === 5) {
    const uniq = [...new Set(ranks)].sort((a, b) => a - b)
    if (uniq.length === 5) {
      if (uniq[4] - uniq[0] === 4) isStraight = true
      else if (JSON.stringify(uniq) === JSON.stringify([2,3,4,5,14])) isStraight = true
    }
  }

  if (isFlush && isStraight) {
    const sorted = ranks.slice().sort((a, b) => a - b)
    if (JSON.stringify(sorted) === JSON.stringify([10,11,12,13,14])) return HAND_MAP.ROYAL_FLUSH
    return HAND_MAP.STRAIGHT_FLUSH
  }
  if (counts[0] === 4)                        return HAND_MAP.FOUR_OF_A_KIND
  if (counts[0] === 3 && counts[1] === 2)     return HAND_MAP.FULL_HOUSE
  if (isFlush)                                return HAND_MAP.FLUSH
  if (isStraight)                             return HAND_MAP.STRAIGHT
  if (counts[0] === 3)                        return HAND_MAP.THREE_OF_A_KIND
  if (counts[0] === 2 && counts[1] === 2)     return HAND_MAP.TWO_PAIR
  if (counts[0] === 2)                        return HAND_MAP.PAIR
  return HAND_MAP.HIGH_CARD
}

export function calcScore(cards) {
  const hand = detectHand(cards)
  if (!hand) return 0
  const cardSum = cards.reduce((s, c) => s + c.value, 0)
  return (hand.base + cardSum) * hand.mult
}
