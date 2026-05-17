<script setup>
import PokerCard from './PokerCard.vue'

defineProps({
  hand:     { type: Array,    required: true },
  selected: { type: Set,      required: true },
})

defineEmits(['toggle'])
</script>

<template>
  <div class="hand-zone">
    <div class="hand-zone-label">手牌 · {{ hand.length }} 张</div>
    <div class="hand-cards">
      <PokerCard
        v-for="(card, i) in hand"
        :key="i"
        :card="card"
        :selected="selected.has(i)"
        size="normal"
        @click="$emit('toggle', i)"
      />
    </div>
  </div>
</template>

<style scoped>
.hand-zone {
  padding: 16px 24px 8px;
  background: rgba(0,0,0,.22);
  border-top: 1px solid rgba(255,255,255,.06);
  flex-shrink: 0;
  overflow: visible;
}
.hand-zone-label {
  font-size: 10px;
  color: rgba(255,255,255,.38);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.hand-cards {
  display: flex;
  gap: 8px;
  justify-content: center;
}
</style>
