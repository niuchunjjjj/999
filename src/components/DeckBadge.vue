<script setup>
defineProps({
  deckCount: { type: Number, required: true },
  handCount: { type: Number, required: true },
})
</script>

<template>
  <div class="deck-badge">
    <!-- 牌堆图示 -->
    <div class="deck-stack">
      <div class="deck-card deck-card--3" />
      <div class="deck-card deck-card--2" />
      <div class="deck-card deck-card--1" />
    </div>

    <!-- 剩余张数 -->
    <div class="deck-count">{{ deckCount }}</div>
    <div class="deck-label">剩余</div>

    <div class="deck-divider" />

    <!-- 手牌张数 -->
    <div class="hand-count">{{ handCount }}</div>
    <div class="deck-label">手牌</div>
  </div>
</template>

<style scoped>
.deck-badge {
  width: 80px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: rgba(0, 0, 0, .3);
  border-left: 1px solid rgba(255, 255, 255, .07);
  padding: 16px 8px;
}

/* ── 牌堆叠加图示 ── */
.deck-stack {
  position: relative;
  width: 48px;
  height: 68px;
  margin-bottom: 6px;
}
.deck-card {
  position: absolute;
  width: 44px;
  height: 62px;
  border-radius: 6px;
  border: 1.5px solid rgba(255, 255, 255, .15);
}
.deck-card--3 {
  bottom: 0; left: 2px;
  background: linear-gradient(135deg, #1a3a2a 0%, #0d2218 100%);
  transform: rotate(-4deg);
}
.deck-card--2 {
  bottom: 2px; left: 1px;
  background: linear-gradient(135deg, #1f4432 0%, #102a1f 100%);
  transform: rotate(-2deg);
}
.deck-card--1 {
  bottom: 4px; left: 0;
  background: linear-gradient(135deg, #245239 0%, #142e23 100%);
  background-image:
    linear-gradient(135deg, #245239 0%, #142e23 100%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(255,255,255,.04) 4px,
      rgba(255,255,255,.04) 5px
    );
  background-blend-mode: normal;
}

/* ── 计数 ── */
.deck-count, .hand-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}
.hand-count {
  font-size: 18px;
  color: var(--color-accent);
}
.deck-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, .35);
}
.deck-divider {
  width: 32px;
  height: 1px;
  background: rgba(255, 255, 255, .1);
  margin: 4px 0;
}
</style>
