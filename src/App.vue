<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useGame } from './game/useGame'
import LeftPanel  from './components/LeftPanel.vue'
import PlayZone   from './components/PlayZone.vue'
import HandZone   from './components/HandZone.vue'
import DeckBadge  from './components/DeckBadge.vue'
import GameModal  from './components/GameModal.vue'

const { state, selectedCards, currentHand, scorePreview, initGame, toggleCard, playHand, discardHand } = useGame()

// ── Modal ────────────────────────────────────────────────────────────────────
const showModal = ref(false)
let modalTimer  = null

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

      <!-- 左侧面板：得分 + 手牌信息 + 操作按钮 -->
      <LeftPanel
        :score="state.score"
        :target="state.target"
        :hands-left="state.handsLeft"
        :discards-left="state.discardsLeft"
        :current-hand="currentHand"
        :selected-cards="selectedCards"
        :score-preview="scorePreview"
        :can-play="canPlay"
        :can-discard="canDiscard"
        @play="handlePlay"
        @discard="discardHand"
        @restart="handleRestart"
      />

      <!-- 中间主区：预览 + 手牌 -->
      <div class="main-area">
        <PlayZone
          :selected-cards="selectedCards"
          :flash-text="flashText"
          :flash-visible="flashVisible"
        />
        <HandZone
          :hand="state.hand"
          :selected="state.selected"
          @toggle="toggleCard"
        />
      </div>

      <!-- 右侧牌堆 -->
      <DeckBadge
        :deck-count="state.deck.length"
        :hand-count="state.hand.length"
      />

      <!-- 胜负弹窗 -->
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
  flex-direction: row;
  box-shadow: 0 12px 48px rgba(0, 0, 0, .5);
  position: relative;
  background-image:
    radial-gradient(ellipse at 60% 50%, rgba(0, 0, 0, .2) 0%, transparent 70%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(255, 255, 255, .012) 20px,
      rgba(255, 255, 255, .012) 21px
    );
}

/* 中间区域：纵向排列 PlayZone + HandZone */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
