<script setup>
defineProps({
  score:        { type: Number, required: true },
  target:       { type: Number, required: true },
  handsLeft:    { type: Number, required: true },
  discardsLeft: { type: Number, required: true },
})
</script>

<template>
  <div class="hud">
    <div class="hud-item">
      <div class="hud-label">目标分</div>
      <div class="hud-value target">{{ target }}</div>
    </div>
    <div class="hud-item">
      <div class="hud-label">当前分</div>
      <!-- :key 变化时 Vue 重建元素，CSS animation 自动重播 -->
      <div class="hud-value score score-pop" :key="score">{{ score }}</div>
    </div>
    <div class="hud-item">
      <div class="hud-label">剩余出牌</div>
      <div class="hud-value plays" :key="handsLeft">{{ handsLeft }}</div>
    </div>
    <div class="hud-item">
      <div class="hud-label">剩余弃牌</div>
      <div class="hud-value discards">{{ discardsLeft }}</div>
    </div>
  </div>
</template>

<style scoped>
.hud {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: rgba(0,0,0,.38);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid rgba(255,255,255,.08);
  flex-shrink: 0;
}
.hud-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255,255,255,.1);
  padding: 0 8px;
}
.hud-item:last-child { border-right: none; }
.hud-label {
  font-size: 10px;
  color: rgba(255,255,255,.5);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
}
.hud-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}
.hud-value.target   { color: var(--color-gold); }
.hud-value.score    { color: var(--color-score); }
.hud-value.plays    { color: var(--color-accent); }
.hud-value.discards { color: #e06060; }

/* 得分弹跳：key 变化时自动触发 */
.score-pop {
  animation: scorePop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes scorePop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.5); color: #fff; text-shadow: 0 0 12px rgba(93,214,122,.8); }
  100% { transform: scale(1); }
}

/* 剩余出牌减少时轻微抖动 */
.hud-value.plays {
  animation: playsShake 500ms ease both;
}
@keyframes playsShake {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.25) rotate(-3deg); }
  60%  { transform: scale(1.1)  rotate(2deg); }
  100% { transform: scale(1)    rotate(0deg); }
}
</style>
