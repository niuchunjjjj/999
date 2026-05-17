<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useGame } from './game/useGame'
import GameHUD    from './components/GameHUD.vue'
import PlayZone   from './components/PlayZone.vue'
import HandZone   from './components/HandZone.vue'
import ActionBar  from './components/ActionBar.vue'
import GameModal  from './components/GameModal.vue'

const { state, selectedCards, currentHand, scorePreview, initGame, toggleCard, playHand, discardHand } = useGame()

// ── Modal ────────────────────────────────────────────────────────────────────
const showModal  = ref(false)
let modalTimer   = null

function handlePlay() {
  const gained = playHand()
  if (gained === null) return
  triggerFlash(`+${gained}`)
  if (state.status !== 'playing') {
    clearTimeout(modalTimer)
    modalTimer = setTimeout(() => { showModal.value = true }, 900)
  }
}

function handleRestart() {
  clearTimeout(modalTimer)
  showModal.value = false
  initGame()
}

// ── Score flash ──────────────────────────────────────────────────────────────
const flashText    = ref('')
const flashVisible = ref(false)
let flashTimer     = null

function triggerFlash(text) {
  flashVisible.value = false
  nextTick(() => {
    flashText.value    = text
    flashVisible.value = true
    clearTimeout(flashTimer)
    flashTimer = setTimeout(() => { flashVisible.value = false }, 1300)
  })
}

// ── Button state ─────────────────────────────────────────────────────────────
const canPlay    = computed(() =>
  state.selected.size > 0 && state.handsLeft > 0 && state.status === 'playing'
)
const canDiscard = computed(() =>
  state.selected.size > 0 && state.discardsLeft > 0 && state.status === 'playing'
)

// ── Responsive scale ─────────────────────────────────────────────────────────
const scale = ref(1)

function rescale() {
  scale.value = Math.min(window.innerWidth / 1080, window.innerHeight / 640, 1)
}

onMounted(() => {
  rescale()
  window.addEventListener('resize', rescale)
  initGame()
})
onUnmounted(() => window.removeEventListener('resize', rescale))
</script>

<template>
  <div class="game-wrapper" :style="{ transform: `scale(${scale})` }">
    <div class="game-viewport">

      <GameHUD
        :score="state.score"
        :target="state.target"
        :hands-left="state.handsLeft"
        :discards-left="state.discardsLeft"
      />

      <PlayZone
        :selected-cards="selectedCards"
        :current-hand="currentHand"
        :score-preview="scorePreview"
        :flash-text="flashText"
        :flash-visible="flashVisible"
      />

      <HandZone
        :hand="state.hand"
        :selected="state.selected"
        @toggle="toggleCard"
      />

      <ActionBar
        :can-play="canPlay"
        :can-discard="canDiscard"
        @play="handlePlay"
        @discard="discardHand"
        @restart="handleRestart"
      />

      <GameModal
        :show="showModal"
        :status="state.status"
        :score="state.score"
        :target="state.target"
        @restart="handleRestart"
      />

    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  width: 1080px;
  height: 640px;
  transform-origin: center center;
}

.game-viewport {
  width: 1080px;
  height: 640px;
  background: var(--color-table);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 48px rgba(0,0,0,.5);
  position: relative;
  background-image:
    radial-gradient(ellipse at 50% 100%, rgba(0,0,0,.28) 0%, transparent 68%),
    repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.012) 20px, rgba(255,255,255,.012) 21px);
}
</style>
