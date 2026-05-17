<script setup>
import PokerCard from './PokerCard.vue'

defineProps({
  hand:     { type: Array, required: true },
  selected: { type: Set,   required: true },
})

defineEmits(['toggle'])
</script>

<template>
  <div class="hand-zone">
    <div class="hand-zone-label">手牌 · {{ hand.length }} 张</div>
    <TransitionGroup name="card" appear tag="div" class="hand-cards">
      <PokerCard
        v-for="(card, i) in hand"
        :key="card.id"
        :card="card"
        :selected="selected.has(i)"
        :style="{ '--deal-delay': `${i * 60}ms` }"
        size="normal"
        @click="$emit('toggle', i)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.hand-zone {
  padding: 12px 20px 14px;
  background: rgba(0, 0, 0, .28);
  border-top: 1px solid rgba(255, 255, 255, .07);
  flex-shrink: 0;
  overflow: visible;
}
.hand-zone-label {
  font-size: 9px;
  font-weight: 700;
  color: rgba(255, 255, 255, .3);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 10px;
  text-align: center;
}
.hand-cards {
  display: flex;
  gap: 8px;
  justify-content: center;
  position: relative;
}

/* ── 发牌：从下方错落滑入 ── */
:deep(.card-enter-active) {
  animation: cardDealIn 500ms cubic-bezier(0.34, 1.4, 0.64, 1) both;
  animation-delay: var(--deal-delay, 0ms);
}

/* ── 出牌：向上飞出 ── */
:deep(.card-leave-active) {
  animation: cardFlyOut 420ms ease-in both;
  position: absolute;
  z-index: 10;
}

/* ── 剩余牌平移补位 ── */
:deep(.card-move) {
  transition: transform 420ms ease;
}

@keyframes cardDealIn {
  from { opacity: 0; transform: translateY(72px) scale(0.78) rotate(-4deg); }
  to   { opacity: 1; transform: translateY(0)    scale(1)    rotate(0deg);  }
}

@keyframes cardFlyOut {
  0%   { opacity: 1; transform: translateY(0)     scale(1)    rotate(0deg); }
  60%  { opacity: 1; transform: translateY(-48px) scale(0.9)  rotate(2deg); }
  100% { opacity: 0; transform: translateY(-88px) scale(0.75) rotate(4deg); }
}
</style>
