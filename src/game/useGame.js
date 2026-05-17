import { reactive, computed } from 'vue'
import { createDeck, shuffle } from './deck'
import { detectHand, calcScore } from './hands'

export function useGame() {
  const state = reactive({
    deck:         [],
    hand:         [],
    selected:     new Set(),
    score:        0,
    target:       300,
    handsLeft:    4,
    discardsLeft: 3,
    status:       'playing', // playing | win | lose
  })

  const selectedCards = computed(() =>
    [...state.selected].map(i => state.hand[i])
  )

  const currentHand = computed(() => detectHand(selectedCards.value))

  const scorePreview = computed(() =>
    currentHand.value ? calcScore(selectedCards.value) : 0
  )

  function initGame() {
    const deck = shuffle(createDeck())
    state.deck         = deck.slice(8)
    state.hand         = deck.slice(0, 8)
    state.selected     = new Set()
    state.score        = 0
    state.handsLeft    = 4
    state.discardsLeft = 3
    state.status       = 'playing'
  }

  function toggleCard(idx) {
    if (state.status !== 'playing') return
    if (state.selected.has(idx)) {
      state.selected.delete(idx)
    } else {
      if (state.selected.size >= 5) return
      state.selected.add(idx)
    }
  }

  function replenish() {
    const toDraw = Math.min(8 - state.hand.length, state.deck.length)
    state.hand     = [...state.hand, ...state.deck.slice(0, toDraw)]
    state.deck     = state.deck.slice(toDraw)
    state.selected = new Set()
  }

  // 返回本次得分，供外层触发动效
  function playHand() {
    if (state.selected.size === 0 || state.handsLeft === 0 || state.status !== 'playing') return null
    const gained = calcScore(selectedCards.value)
    state.score += gained
    state.handsLeft--
    state.hand = state.hand.filter((_, i) => !state.selected.has(i))
    replenish()
    if (state.score >= state.target)  state.status = 'win'
    else if (state.handsLeft === 0)   state.status = 'lose'
    return gained
  }

  function discardHand() {
    if (state.selected.size === 0 || state.discardsLeft === 0 || state.status !== 'playing') return
    state.discardsLeft--
    state.hand = state.hand.filter((_, i) => !state.selected.has(i))
    replenish()
  }

  return { state, selectedCards, currentHand, scorePreview, initGame, toggleCard, playHand, discardHand }
}
